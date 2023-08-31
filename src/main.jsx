import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </React.StrictMode>
    </Provider>
  );
