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

import { useSelector, useDispatch } from 'react-redux';
import { decrementNodeCount, incrementNodeCount,
         selectNode,
         unselectNodes,
         setSelectedNodeLabel,
         setSelectedNodeInput
       } from './dagSlice';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';

import LoadNode from './LoadNode';
import SaveNode from './SaveNode';
import MultiplyNode from './MultiplyNode';
import ThresholdNode from './ThresholdNode';
import CountrySplitNode from './CountrySplitNode';
import SumNode from './SumNode';

import DragBar from './DragBar';
import NodePropertyEditor from './NodePropertyEditor';

import './overview.css';

import { data, operations, scenarios } from './constants';

const nodeTypes = {
  load: LoadNode,
  save: SaveNode,
  multiply: MultiplyNode,
  threshold: ThresholdNode,
  country_split: CountrySplitNode,
  sum: SumNode,
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

const nodeTypeLabels = {
  input: 'Load',
  default: 'Operation',
  output: 'Save',
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
  const typeLabel = nodeTypeLabels[type];
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
    selectedNodeLabel, selectedNodeInput,
    edgeType
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

  const onConnect = useCallback((params) => {
    return setEdges((eds) => {
      return addEdge(params, eds);
    });
  }, []);

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

      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = genNode(type, position);

      setNodes((nds) => nds.concat(newNode));
      dispatch(incrementNodeCount());
      dispatch(selectNode(newNode));
    },
    [reactFlowInstance]
  );

  // TODO likely remove this...
  // const onConnectEnd = useCallback(
  //   (event) => {
  //     const targetIsPane = event.target.classList.contains('react-flow__pane');

  //     if (targetIsPane) {
  //       // we need to remove the wrapper bounds, in order to get the correct position
  //       const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
  //       const position = reactFlowInstance.project({ x: event.clientX - left - 75, y: event.clientY - top });
  //       const newNode = genNode('default', position);
  //       const { id } = newNode;

  //       setNodes((nds) => nds.concat(newNode));
  //       setEdges((eds) => eds.concat({
  //         id: genEdgeId(),
  //         source: connectingNodeId.current,
  //         target: id
  //       }));
  //       dispatch(incrementNodeCount());
  //       dispatch(selectNode(newNode));
  //     }
  //   },
  //   [reactFlowInstance]
  // );

  const edgesWithUpdatedTypes = edges.map((edge) => {
    edge.type = edgeType;
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
