import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { css } from '@emotion/css';

const headerStyle = css`
         padding: 8px 10px;
         border-bottom: 1px solid #e2e8f0;
      `;

// const bodyStyle = css`
//          padding: 0.5rem;
//          select {
//            width: 100%;
//            margin-top: 5px;
//            font-size: 10px;
//          }
//       `;

function CustomNode({ id, data }) {
  return (
      <div className={headerStyle}>
        <strong>Multiply</strong>
        <div className="custom-node__multiply">
          <Handle
            className={css`
  left: 50px;
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background-color: #778899;
`}
            type="target"
            position={Position.Top}
            id="multiply-handle-1"
          />
          <Handle
            className={css`
  left: 135px;
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background-color: #778899;
`}
            type="target"
            id="multiply-handle-2"
            position={Position.Top}
          />
          <Handle
            className={css`
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background-color: #778899;
`}
            type="source"
            position={Position.Bottom}
          />
        </div>
      </div>
  );
}

export default memo(CustomNode);
