// File: src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css'; // Importing the global stylesheet
import App from './App'; // Importing the main App component
import { BrowserRouter } from 'react-router-dom'; // React Router for handling routes
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // Render the App into the root div in index.html
);

// Optional: Report web vitals (performance measurement)
reportWebVitals();
