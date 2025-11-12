// Path: frontend/src/api.ts
import axios from 'axios';

export function getApiBase() {
  if ((window as any).SCHOOL_WIDGET_CONFIG?.apiBase) {
    return (window as any).SCHOOL_WIDGET_CONFIG.apiBase;
  }
  return '/api';
}

export async function fetchInfo() {
  const base = getApiBase();
  const res = await axios.get(`${base}/info`);
  return res.data;
}

