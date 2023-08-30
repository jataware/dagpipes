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

        <p>Drag:</p>

        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, 'input')}
          draggable
        >
          Input
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'default')}
          draggable
        >
          Operation
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, 'output')}
          draggable
        >
          Output
        </div>
      </section>

    </div>
  );
};
