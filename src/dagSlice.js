import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodeCount: 0,
  edgeCount: 0,
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
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});


// Action creators are generated for each case reducer function
export const {
  incrementNodeCount,
  incrementEdgeCount,
  decrementNodeCount,
  decrementEdgeCount
} = dagSlice.actions;

export default dagSlice.reducer;
