import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodeCount: 0,
  edgeCount: 0,
  selectedNodeId: null,
  selectedNodeType: null,
  selectedNodeLabel: null,
  selectedNodeInput: null,
  selectedNodeOperation: null,
};


export const dagSlice = createSlice({
  name: 'dag',
  initialState,
  reducers: {
    incrementNodeCount: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.nodeCount += 1;
    },
    decrementNodeCount: (state) => {
      state.nodeCount -= 1;
    },
    incrementEdgeCount: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.edgeCount += 1;
    },
    decrementEdgeCount: (state) => {
      state.edgeCount -= 1;
    },
    selectNode: (state, action) => {
      const { id, type, data: {label, input, operation} } = action.payload;
      state.selectedNodeId = id;
      state.selectedNodeType = type;
      state.selectedNodeLabel = label;
      state.selectedNodeInput = input;
      state.selectedNodeOperation = operation;
    },
    unselectNodes: (state) => {
      state.selectedNodeId = null;
      state.selectedNodeType = null;
      state.selectedNodeLabel = null;
      state.selectedNodeInput = null;
      state.selectedNodeOperation = null;
    },
    setSelectedNodeLabel: (state, action) => {
      state.selectedNodeLabel = action.payload;
    },
    setSelectedNodeInput: (state, action) => {
      state.selectedNodeInput = action.payload;
    },
    setSelectedNodeOperation: (state, action) => {
      state.selectedNodeOperation = action.payload;
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  incrementNodeCount,
  incrementEdgeCount,
  decrementNodeCount,
  decrementEdgeCount,
  selectNode,
  unselectNodes,
  setSelectedNodeInput,
  setSelectedNodeLabel,
  // setSelectedNodeType,
  setSelectedNodeOperation
} = dagSlice.actions;

export default dagSlice.reducer;
