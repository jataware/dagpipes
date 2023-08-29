import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import 'reactflow/dist/style.css';

import Layout from './Layout';
import PipeEditor from './PipeEditor';

function App() {

  return (
    <Layout>
      <div>
        <PipeEditor />
      </div>
    </Layout>
  );

}

export default App;
