// File: src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: Report web vitals (performance measurement)
reportWebVitals();
