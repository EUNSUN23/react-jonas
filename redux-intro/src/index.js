import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';

import store from './store-v2'; // storeV1.js파일을 실행함

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={storeV1}>
          <App />
      </Provider>
  </React.StrictMode>
);

