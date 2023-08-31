import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { css } from '@emotion/css';


const data = ['China', 'India', 'United States', 'Canada', 'Mexico'];

const options = data.map(i => ({value: i, label: i}));

function Select({ value, handleId, nodeId }) {

  return (
    <div className={css`
        position: relative;
        margin-bottom: 10px;
    `}>
      <Handle
        className={css`top: -56px;
width: 11px;
  height: 11px;
  border-radius: 2px;
  background-color: #778899;
`}
        type="target"
        position={Position.Top}
        id={handleId}
      />
      <div>Countries</div>
      <select
        className="nodrag"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Handle
        className={css`
bottom: -25px;
  right: -15px;
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background-color: #778899;
`}
        type="source"
        position={Position.Bottom}
        id={handleId}
      />
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
        <strong>Country Split</strong>
      </div>
      <div className={bodyStyle}>
        <Select
          nodeId={id}
          value={data.input}
        />
      </div>
    </>
  );
}

export default memo(CustomNode);
