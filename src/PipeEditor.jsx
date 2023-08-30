import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';
import DragBar from './DragBar';

import './overview.css';
import './updatenode.scss';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

// Shared among OverviewFlow instances,
// 1 in our app, but needs to be a ref if OverviewFlow is reused
let id = 1;
const getId = () => `n_${id++}`;


const typeStyles = {
  input: {
      borderColor: 'green'
  },
  output: {
    borderColor: 'blue'
  },
  default: {
  }
};

const OverviewFlow = () => {

  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeInput, setNodeInput] = useState('');

  const setCurrentNode = (event, nodeEl) => {
		const node = nodes.find((n) => n.id === nodeEl.id);
    setNodeLabel(node.data.label);
    setNodeInput(node.data.input);
		setSelectedNodeId(node.id);
	};

  function clearCurrentNode(event) {
    setNodeLabel('');
    setNodeInput('');
    setSelectedNodeId(null);
  };

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onInit = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    setReactFlowInstance(reactFlowInstance);
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        console.log(node.id, selectedNodeId);
        if (node.id === selectedNodeId) {
          console.log('found node id selected to update, updating');
          node.data = {
            ...node.data,
            label: nodeLabel,
          };
        }

        return node;
      })
    );
  }, [nodeLabel, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = {
            ...node.data,
            input: nodeInput,
          };
        }

        return node;
      })
    );
  }, [nodeInput, setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const style = typeStyles[type];
      const id = getId();
      const label = `${type} node #${id.replace('n_', '')}`;
      const input = '';

      const newNode = {
        id,
        type,
        style,
        position,
        data: { label, input },
      };

      setSelectedNodeId(id);
      setNodeLabel(label);
      setNodeInput(input);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <div className="wrap-full-size">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={setCurrentNode}
            onPaneClick={clearCurrentNode}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            snapToGrid
            nodeTypes={nodeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <MiniMap
              style={minimapStyle}
              zoomable
              pannable
            />
            <Controls />
            <Background
              color="#aaa"
              gap={16}
            />

            {selectedNodeId && (
              <div className="updatenode__controls">
                <label>
                  Label:
                </label>
                <input
                  value={nodeLabel}
                  onChange={(evt) => setNodeLabel(evt.target.value)}
                />

                <label className="updatenode__input">
                  Input:
                </label>
                <input
                  value={nodeInput}
                  onChange={(evt) => setNodeInput(evt.target.value)}
                />
              </div>
            )}

          </ReactFlow>
        </div>
        <DragBar />
      </ReactFlowProvider>
    </div>
  );
};

export default OverviewFlow;
