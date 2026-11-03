import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production build ships the page pre-rendered (scripts/prerender.js), so React attaches to
// that HTML. The dev server serves an empty root and renders from scratch.
if (container.hasChildNodes()) ReactDOM.hydrateRoot(container, app);
else ReactDOM.createRoot(container).render(app);
