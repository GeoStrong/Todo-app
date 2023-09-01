import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import './media.css';
import App from './App';
import { ModeContextProvider } from './components/mode/mode-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ModeContextProvider>
    <App />
  </ModeContextProvider>
);
