import React, { useCallback } from 'react';
import { css } from '@emotion/css';
import './layout.scss';
import clsx from 'clsx';
import random from 'lodash/random';

import PngLogo from "./assets/DAG|PIPES.png";

import { useSelector } from 'react-redux';

const Link = ({children}) => {
  return (
    <a href="/"
       className={css`
         color: #ac46a9;
         text-decoration: none;
         font-weight: bold;
         padding: 0.5rem;
         border-radius: 6px;

        &:hover {
           opacity: 0.8;
           background: #EEE;
           border-bottom: 1px solid #ac46a950;
        }
       `
       }>
      {children}
    </a>
  );
};

const GridLayout = ({children}) => {

  const nodeCount = useSelector((state) => state.dag.nodeCount);

  const size = random(200, 440),
        x = random(-50, 0),
        y = random(-50, 0);

  return (
    <div className="container">

      <header>

        <div style={{
             }}
             className={clsx([css`
               background-image: url(${PngLogo});
               cursor: pointer;
               background-position-x: ${x}px;
               background-position-y: ${y}px;
               background-size: ${size}px;
             `, "logo"])}
        >
        </div>

        <nav>
          <ul>
            <li><Link>Home</Link></li>
            &nbsp;
            &nbsp;
            <li><Link>Github</Link></li>
            &nbsp;
            &nbsp;
            <li><Link>Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {children}
      </main>

      <aside>
        <h3>Settings</h3>
        <p>...</p>
      </aside>

      <footer>
        {nodeCount} nodes.
      </footer>

    </div>
  );
};


export default GridLayout;
