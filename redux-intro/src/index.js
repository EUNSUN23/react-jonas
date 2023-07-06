import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './store'; // store.js파일을 실행함

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

