// Path: frontend/src/components/ChatBubble.tsx
import React from 'react';

export default function ChatBubble({ open, onToggle, children }: any) {
  return (
    <div>
      <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 9999 }}>
        {open && (
          <div style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.2)', borderRadius: 12, overflow: 'hidden' }}>
            {children}
          </div>
        )}
        <button aria-label="Open chat" onClick={onToggle} style={{ width: 56, height: 56, borderRadius: 28, background: '#0b5fff', color: '#fff', border: 'none', marginTop: 8 }}>
          {open ? '×' : '💬'}
        </button>
      </div>
    </div>
  );
}

