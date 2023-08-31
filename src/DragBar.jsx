import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Button from '@mui/material/Button';

import './dragBar.scss';


export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">

      <section>

        <Button
          color="success"
          variant="outlined"
          startIcon={<DragIndicatorIcon />}
          className="dndnode input"
          disableRipple
          onDragStart={(event) => {return onDragStart(event, 'load');}}
          draggable
        >
          Load
        </Button>

        <Button
          variant="outlined"
          startIcon={<DragIndicatorIcon />}
          className="dndnode input"
          disableRipple
          onDragStart={(event) => {return onDragStart(event, 'threshold');}}
          draggable
        >
          Threshold
        </Button>

        <Button
          variant="outlined"
          startIcon={<DragIndicatorIcon />}
          className="dndnode input"
          disableRipple
          onDragStart={(event) => {return onDragStart(event, 'multiply');}}
          draggable
        >
          Multiply
        </Button>

        <Button
          variant="outlined"
          startIcon={<DragIndicatorIcon />}
          className="dndnode input"
          disableRipple
          onDragStart={(event) => {return onDragStart(event, 'country_split');}}
          draggable
        >
          Country Split
        </Button>

        <Button
          variant="outlined"
          startIcon={<DragIndicatorIcon />}
          className="dndnode input"
          disableRipple
          onDragStart={(event) => {return onDragStart(event, 'sum');}}
          draggable
        >
          Sum
        </Button>

        <Button
          color="success"
          variant="outlined"
          startIcon={<DragIndicatorIcon />}
          className="dndnode input"
          disableRipple
          onDragStart={(event) => {return onDragStart(event, 'save');}}
          draggable
        >
          Save
        </Button>

      </section>

    </div>
  );
};
