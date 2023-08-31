import React, { useCallback } from 'react';
import { css } from '@emotion/css';
import './layout.scss';
import clsx from 'clsx';
import random from 'lodash/random';

import PngLogo from "./assets/DAG|PIPES.png";

import { useSelector, useDispatch } from 'react-redux';

import { setEdgeType } from './dagSlice';

import { scenarios } from './constants';

const Link = ({children}) => {
  return (
    <a href="/"
       className={css`
         text-decoration: none;
         font-weight: bold;
         padding: 0.5rem;
         border-radius: 6px;

        &:hover {
           opacity: 0.8;
           background: #EEEEEE55;
           border-bottom: 1px solid #ac46a950;
        }
       `
       }>
      {children}
    </a>
  );
};

// TODO move edge type selector THINGS to separate file
const edgeTypeOptions = [
  {
    value: 'smoothstep',
    label: 'Smoothstep',
  },
  {
    value: 'step',
    label: 'Step',
  },
  {
    value: 'default',
    label: 'Bezier (default)',
  },
  {
    value: 'straight',
    label: 'Straight',
  },
];

const EdgeTypeSelector = (props) => {
  const dispatch = useDispatch();

  const { edgeType } = useSelector((state) => state.dag);

  return (
    <select
      value={edgeType}
      onChange={(e) => {dispatch(setEdgeType(e.target.value)); }}
    >
      {edgeTypeOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};


const GridLayout = ({children}) => {

  const nodeCount = useSelector((state) => state.dag.nodeCount);

  // For Logo:
  const size = random(200, 440),
        x = random(-50, 0),
        y = random(-50, 0);

  return (
    <div className="container">

      <header>

        <div
          className={clsx([
            css`
               background-image: url(${PngLogo});
               cursor: pointer;
               background-position-x: ${x}px;
               background-position-y: ${y}px;
               background-size: ${size}px;
             `,
            'logo'
          ])}
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
        <h3>Global</h3>
        <h4 className={css`color: gray;`}>
          Scenarios
        </h4>
        <ul>
          {scenarios.map((text) => (
            <div key={text}>
              <input
                type="checkbox"
                id={text}
                name={text}
              />
              <label htmlFor={text}>
                {text}
              </label>
            </div>
          ))}
        </ul>
        <h4 className={css`color: gray;`}>
          Edge Type
        </h4>
        <EdgeTypeSelector />
      </aside>

      <footer>
        {nodeCount} nodes.
      </footer>

    </div>
  );
};


export default GridLayout;
