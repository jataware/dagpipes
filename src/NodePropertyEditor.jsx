
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  setSelectedNodeLabel,
  setSelectedNodeInput,
  setSelectedNodeOperation,
} from './dagSlice';

import './updatenode.scss';

export default (props) => {

  const {
    selectedNodeLabel, selectedNodeInput,
    selectedNodeType, selectedNodeOperation
  } = useSelector((state) => state.dag);

  const dispatch = useDispatch();

  return (
    <div className="updatenode__controls" style={{display: 'none'}}>

      {/* <label> */}
      {/*   Label: */}
      {/* </label> */}
      {/* <input */}
      {/*   value={selectedNodeLabel} */}
      {/*   onChange={(evt) => dispatch(setSelectedNodeLabel(evt.target.value))} */}
      {/* /> */}

      {selectedNodeType === 'input' && (
        <>
          <label className="updatenode__input">
            Input:
          </label>
          <input
            value={selectedNodeInput}
            onChange={(evt) => dispatch(setSelectedNodeInput(evt.target.value))}
          />
        </>
      )}

      {selectedNodeType === 'default' && (
        <>
          <label className="updatenode__default">
            Operation:
          </label>
          <input
            value={selectedNodeOperation}
            onChange={(evt) => dispatch(setSelectedNodeOperation(evt.target.value))}
          />
        </>
      )}

      {selectedNodeType === 'output' && (
        <>
          <label className="updatenode__output">
            Output:
          </label>
          <input />
        </>
      )}

    </div>
  );
}
