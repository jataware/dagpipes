import React, { useCallback } from 'react';
import { css } from '@emotion/css';
import clsx from 'clsx';
import random from 'lodash/random';

import PngLogo from "./assets/DAG|PIPES.png";
import DojoLogo from "./assets/dojo_logo.svg";
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/MailOutline';

import './layout.scss';

import { useSelector, useDispatch } from 'react-redux';

import ScenarioSelection from './ScenarioSelection';

import { setEdgeType } from './dagSlice';

const Link = ({children}) => {
  return (
    <a href="/"
       className={css`
         color: white;
         text-decoration: none;
         /* font-weight: bold; */
         padding: 0.5rem;
         border-radius: 4px;
display: flex;
align-items: center;
justify-content: center;

        &:hover {
           background: #DDDDDD30;
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

const Footer = (props) => {
  const { nodeCount, unsavedChanges } = useSelector((state) => state.dag);

  return (
    <footer className={css`background: white;`}>
      <div>
        {nodeCount} nodes. {unsavedChanges && (<span>Unsaved Changes.</span>)}
      </div>
    </footer>
  );
};

const GridLayout = ({children}) => {

  // For Logo:
  // const size = random(200, 440),
  //       x = random(-50, 0),
  //       y = random(-50, 0);

  return (
    <div className="container">

      <header>

        <div
          className={clsx([
            css`
               /* background-color: linear-gradient(60deg,#26c6da,#00acc1) */
               background-image: url(${DojoLogo});
               background-color: #26c6da;
               border-radius: 7px;
               /* background-image: url(PngLogo); */
               cursor: pointer;
               background-position-x: -3px;
               background-position-y: -1px;
               /* background-size: sizepx; */
               background-size: cover;
             `,
            'logo'
          ])}
        >
        </div>

        <nav>
          <ul>
            <li><Link>
                  <HomeIcon />&nbsp;&nbsp;Home
                </Link>
            </li>
            &nbsp;
            &nbsp;
            &nbsp;
            <li><Link>
                  <GitHubIcon />&nbsp;&nbsp;Github
                </Link></li>
            &nbsp;
            &nbsp;
            &nbsp;
            <li><Link>
                  <MailIcon />&nbsp;&nbsp;Contact
                </Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {children}
      </main>

      <aside className={css`background: white; padding-bottom: 1.5rem;`}>
       <h3 className={css`
             background: linear-gradient(60deg,#26c6da,#00acc1);
             padding: 1.33rem 0;
             border-top-left-radius: 5px;
             border-top-right-radius: 5px;
             margin-top: -1px;
             width: 100%;
             color: white;`}
          >Settings</h3>
        <h4 className={css`color: gray;`}>
          Scenarios
        </h4>

        <div className={css`display:flex; flex-direction: column; align-items: center;`}>
          <ScenarioSelection />
        </div>

        <h4 className={css`color: gray;`}>
          Edge Type
        </h4>
        <EdgeTypeSelector />
      </aside>

      <Footer />

    </div>
  );
};


export default GridLayout;
