import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// The build renders the page to HTML once (scripts/prerender.js), so it shows before the script
// runs, and without it.
export const render = () => renderToString(<StrictMode><App /></StrictMode>);
