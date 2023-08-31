import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { css } from '@emotion/css';

/**
 *
 **/
function FileSelect({ value, handleId, nodeId }) {
  return (
    <div className="custom-node__save">
      <Handle
        type="target"
        position={Position.Top}
        id={handleId}
      />
      <label htmlFor="filename">Filename</label>
      <input
        className="nodrag"
        placeholder="output.nc"
        id="filename" />
    </div>
  );
}

const headerStyle = css`
         padding: 8px 10px;
         border-bottom: 1px solid #e2e8f0;
      `;

const bodyStyle = css`
         padding: 0.5rem;
         select {
           width: 100%;
           margin-top: 5px;
           font-size: 10px;
         }
      `;

function CustomNode({ id, data }) {
  return (
    <>
      <div className={headerStyle}>
        <strong>Save</strong>
      </div>
      <div className={bodyStyle}>
        <FileSelect
          nodeId={id}
          value={data.input}
        />
      </div>
    </>
  );
}

export default memo(CustomNode);
