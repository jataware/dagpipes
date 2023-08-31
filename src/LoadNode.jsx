import React, { memo } from 'react';
import { css } from '@emotion/css';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';

import { data } from './constants';
// import identity from 'lodash/identity';

const options = data.map(i => ({value: i, label: i}));


function Select({ value, nodeId }) {

  return (
    <div className={css`
        position: relative;
        margin-bottom: 10px;
    `}>
      <div>Data Source</div>
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
        type="source"
        position={Position.Bottom}
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
        <strong>Load</strong>
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
