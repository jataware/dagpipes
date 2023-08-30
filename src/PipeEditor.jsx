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
import capitalize from 'lodash/capitalize';

import { useSelector, useDispatch } from 'react-redux';
import { decrementNodeCount, incrementNodeCount,
         selectNode,
         unselectNodes,
         setSelectedNodeLabel,
         setSelectedNodeInput
       } from './dagSlice';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';
import DragBar from './DragBar';
import NodePropertyEditor from './NodePropertyEditor';


import './overview.css';

import { data, operations, scenarios } from './constants';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const nodeTypeStyles = {
  input: {
    borderColor: 'green'
  },
  output: {
    borderColor: 'blue'
  },
  default: {}
};

// Shared among OverviewFlow instances,
// 1 in our app, but needs to be a ref if OverviewFlow is reused
let _idCounter = 1;
let _edgeIdCounter = 1;
const genId = () => `n_${_idCounter++}`;

const genEdgeId = () => `e_${_edgeIdCounter++}`;

const genNode = (type, position) => {
  const style = nodeTypeStyles[type];
  const id = genId();
  const typeLabel = type === 'default' ? 'Operation' : capitalize(type);
  const label = `${typeLabel}`;
  const input = '';

  return {
    id,
    type,
    style,
    position,
    data: { label, input },
  };
};


const OverviewFlow = () => {

  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const connectingNodeId = useRef(null);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const {
    selectedNodeId, selectedNodeOperation,
    selectedNodeLabel, selectedNodeInput
  } = useSelector((state) => state.dag);
  const dispatch = useDispatch();

  const setCurrentNode = (event, nodeEl) => {
		const node = nodes.find((n) => n.id === nodeEl.id);
    dispatch(selectNode(node));
	};

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onInit = (reactFlowInstance) => {
    console.log('Flow loaded:', reactFlowInstance);
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
        if (node.id === selectedNodeId) {
          node.data = {
            ...node.data,
            label: selectedNodeLabel,
          };
        }

        return node;
      })
    );
  }, [selectedNodeLabel, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = {
            ...node.data,
            input: selectedNodeInput,
          };
        }

        return node;
      })
    );
  }, [selectedNodeInput, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = {
            ...node.data,
            operation: selectedNodeOperation,
          };
        }

        return node;
      })
    );
  }, [selectedNodeOperation, setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = genNode(type, position);
      const { id } = newNode;

      setNodes((nds) => nds.concat(newNode));
      dispatch(incrementNodeCount());
      dispatch(selectNode(newNode));
    },
    [reactFlowInstance]
  );

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({ x: event.clientX - left - 75, y: event.clientY - top });
        const newNode = genNode('default', position);
        const { id } = newNode;

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({
          id: genEdgeId(),
          source: connectingNodeId.current,
          target: id
        }));
        dispatch(incrementNodeCount());
        dispatch(selectNode(newNode));
      }
    },
    [reactFlowInstance]
  );

  // NOTE This is used for custom node/edges. Not that important
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
            onNodesDelete={() => dispatch(decrementNodeCount())}
            onNodeClick={setCurrentNode}
            onPaneClick={() => dispatch(unselectNodes())}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
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
              <NodePropertyEditor />
            )}

          </ReactFlow>
        </div>
        <DragBar />
      </ReactFlowProvider>
    </div>
  );
};

export default OverviewFlow;
