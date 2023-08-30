import React, { useCallback } from 'react';
import { css } from '@emotion/css';
// import styled from '@emotion/styled';
import './layout.scss';

import PngLogo from "./assets/DAG|PIPES.png";

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

  return (
    <div className="container">

      <header>

        <div className="logo"
             style={{
               cursor: 'pointer',
               backgroundImage: `url(${PngLogo})`
             }}
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
        Loading...
      </footer>

    </div>
  );
};


export default GridLayout;
