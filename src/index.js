import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /**
   * When StrictMode is present(ON) it automatically unmounts and then mounts again every element.
   * This leads leads useEffect(for example) to fetch data twice
   * To avoid it just remove strict mode in dev mode
   * This happens only in development-only mode!!!
   */
  // <React.StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
