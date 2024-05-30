import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const API_KEY = process.env.REACT_APP_API_KEY;

console.log("API Key (just for demonstration, remove in production):", API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);