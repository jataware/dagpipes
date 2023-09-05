import React, { memo } from 'react';
import { css } from '@emotion/css';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import TextField from '@mui/material/TextField';

import { data } from './constants';


const options = [
  ...data,
  'dojo:Weekly Fire Alerts by Country',
  'dojo:CRU Observed Monthly Precipitation',
  'dojo:UN - Internet Usage Percentage',
].map(i => ({
  label: i,
  value: i
    .split('(')[0]
    .trim()
}));


function Select({ input, nodeId, onChange }) {

  return (
    <div className={css`
        position: relative;
        margin-bottom: 10px;
    `}>
      <TextField
        select
        label="Data Source"
        value={input}
        onChange={onChange.bind(this, nodeId)}
        SelectProps={{
          native: true
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </TextField>
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
         padding: 1rem 0.75rem 0.25rem 0.75rem;
         select {
           padding-top: 0.5rem;
           padding-bottom: 0.5rem;
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
          onChange={data.onChange}
          input={data.input}
        />
      </div>
    </>
  );
}

export default memo(CustomNode);
