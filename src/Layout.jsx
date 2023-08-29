import React, { useCallback } from 'react';
import './layout.scss';


const GridLayout = ({children}) => {

  return (
    <div className="container">

      <header>

        <div className="logo">
          Logo
        </div>

        <nav>
          <ul>
            <li>Home</li>
            &nbsp;
            <li>Github</li>
            &nbsp;
            <li>Contact</li>
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
