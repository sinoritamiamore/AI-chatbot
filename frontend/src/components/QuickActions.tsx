// Path: frontend/src/components/QuickActions.tsx
import React from 'react';

export default function QuickActions({ onClick }: any) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => onClick('FAQ')} style={{ padding: '6px 8px' }}>Ask FAQ</button>
      <button onClick={() => onClick('Calendar')} style={{ padding: '6px 8px' }}>Academic Calendar</button>
      <button onClick={() => onClick('Resources')} style={{ padding: '6px 8px' }}>Resources</button>
      <button onClick={() => onClick('Study')} style={{ padding: '6px 8px' }}>Study Plan</button>
    </div>
  );
}

