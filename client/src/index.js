// Import react utilities:
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';

// Import app component and store:
import App from './App';
import { store } from './Redux/store/index.js';

// Import style:
import './index.css';

// Deploy:
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3000';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
