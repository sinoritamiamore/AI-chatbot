// Path: frontend/src/widget.tsx
/**
 * This file is the embeddable wrapper. In production you would build to a single widget.js bundle and host it.
 * The host site can set window.SCHOOL_WIDGET_CONFIG = { apiBase: "...", schoolName: "..." }
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

declare global {
  interface Window { SCHOOL_WIDGET_CONFIG?: any; }
}

function mountWidget(mountPointId = 'school-chatbot-root') {
  const mount = document.getElementById(mountPointId);
  if (!mount) {
    const el = document.createElement('div');
    el.id = mountPointId;
    document.body.appendChild(el);
    const root = createRoot(el);
    root.render(<App />);
  } else {
    const root = createRoot(mount);
    root.render(<App />);
  }
}

// if used as module
if (typeof window !== 'undefined') {
  // auto-mount so when widget.js is included it appears
  document.addEventListener('DOMContentLoaded', () => {
    mountWidget();
  });
}

export { mountWidget };

