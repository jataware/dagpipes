import React from 'react';

import './dragBar.scss';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">

      <section>

        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, 'load')}
          draggable
        >
          Load
        </div>

        {/* <div */}
        {/*   className="dndnode" */}
        {/*   onDragStart={(event) => onDragStart(event, 'default')} */}
        {/*   draggable */}
        {/* > */}
        {/*   Operation */}
        {/* </div> */}

        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'threshold')}
          draggable
        >
          Threshold
        </div>

        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'multiply')}
          draggable
        >
          Multiply
        </div>

        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'country_split')}
          draggable
        >
          Country Split
        </div>

        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'sum')}
          draggable
        >
          Sum
        </div>

        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, 'save')}
          draggable
        >
          Save
        </div>
      </section>

    </div>
  );
};
