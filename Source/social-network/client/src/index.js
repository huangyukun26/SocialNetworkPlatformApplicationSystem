import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setupPortfolioDemo } from './demo/mockApi';

// Portfolio demo mode keeps the original React UI/components and replaces only
// the backend data layer so the application can run as a static GitHub Pages site.
setupPortfolioDemo();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
