import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { css } from '@emotion/css';

import AutoComplete from './Autocomplete';
import NodeTitles from './nodeLabels';

/**
 *
 **/
function Select({ input, handleId, nodeId, onChange }) {

  const handleChange = (_, newValue) => {
    onChange(nodeId, {target: {value: newValue }});
  };

  return (
    <div className={css`
        position: relative;
        margin-bottom: 10px;
    `}>
      <Handle
        className={css`
          top: -56px;
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
      <AutoComplete
        value={input}
        onChange={handleChange}
      />
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

// reduce by country => from re-gridded to country data
function CustomNode({ id, data }) {
  return (
    <>
      <div className={headerStyle}>
        <strong>{NodeTitles.COUNTRY_SPLIT}</strong>
      </div>
      <div className={bodyStyle}>
        <Select
          nodeId={id}
          input={data.input}
          onChange={data.onChange}
        />
      </div>
    </>
  );
}

export default memo(CustomNode);
