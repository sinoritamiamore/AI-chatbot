// Path: frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import ChatBubble from './components/ChatBubble';
import QuickActions from './components/QuickActions';
import axios from 'axios';

type Message = { id: string; role: 'user' | 'assistant'; text: string; ts: string };

const defaultConfig = {
  apiBase: 'http://localhost:4000',
  schoolName: 'Mekelle University'
};

function App() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    // read config file if site provided it
    (async () => {
      try {
        if ((window as any).SCHOOL_WIDGET_CONFIG) {
          setConfig((prev) => ({ ...prev, ...(window as any).SCHOOL_WIDGET_CONFIG }));
        } else {
          // try loading runtime config
          const res = await fetch('/config/site.config.json').then(r => r.json()).catch(()=>null);
          if (res) setConfig((prev) => ({ ...prev, ...res }));
        }
      } catch (e) {
        console.warn('Could not load config', e);
      }
    })();
  }, []);

  useEffect(() => {
    // welcome message
    const welcome: Message = { id: 'm1', role: 'assistant', ts: new Date().toISOString(),
      text: `Hello — I'm the ${config.schoolName} Guide. Ask me about admissions, resources, the academic calendar, or request study plans.` };
    setMessages([welcome]);
  }, [config.schoolName]);

  const send = async (text: string) => {
    if (!text) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: 'user', ts: new Date().toISOString(), text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    try {
      const res = await axios.post(`${config.apiBase}/api/chat`, { message: text });
      const assistant: Message = { id: `a${Date.now()}`, role: 'assistant', ts: new Date().toISOString(), text: res.data.answer || 'No answer' };
      setMessages(prev => [...prev, assistant]);
    } catch (e:any) {
      const assistant: Message = { id: `a${Date.now()}`, role: 'assistant', ts: new Date().toISOString(), text: `Error: ${e.message}` };
      setMessages(prev => [...prev, assistant]);
    }
  };

  const onQuick = async (type: string) => {
    if (type === 'FAQ') {
      try {
        const res = await axios.get(`${config.apiBase}/api/info`);
        const faqs = res.data.faqs.slice(0,5).map((f:any)=> `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
        await send(`Show me top FAQs:\n\n${faqs}`);
      } catch (e) {
        await send('Show me top FAQs');
      }
    } else if (type === 'Calendar') {
      try {
        const res = await axios.get(`${config.apiBase}/api/calendar`);
        const ev = res.data.events.map((e:any)=> `${e.title} — ${e.date} ${e.time}`).join('\n');
        await send(`Academic events:\n${ev}`);
      } catch (e) {
        await send('Show academic calendar');
      }
    } else if (type === 'Resources') {
      try {
        const res = await axios.get(`${config.apiBase}/api/resources`);
        const list = res.data.resources.map((r:any)=> `${r.name} — ${config.apiBase}${r.url}`).join('\n');
        await send(`Resources list:\n${list}`);
      } catch (e) {
        await send('Show resources');
      }
    } else {
      await send('I need a study plan');
    }
  };

  return (
    <>
      <ChatBubble open={open} onToggle={() => setOpen(!open)}>
        <div style={{ width: 360, maxWidth: '90vw', padding: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <img src={config.logoUrl} alt="logo" style={{ width: 40, height: 40, borderRadius: 6 }} onError={(e)=> (e.currentTarget.src='https://via.placeholder.com/40')} />
            <div><strong>{config.schoolName} Guide</strong><div style={{ fontSize: 12, color: '#666' }}>Professional • Friendly</div></div>
          </div>

          <QuickActions onClick={onQuick} />

          <div role="log" aria-live="polite" style={{ maxHeight: 300, overflowY: 'auto', marginTop: 8 }}>
            {messages.map(m => <div key={m.id} style={{ margin: '8px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
              <div style={{ display: 'inline-block', padding: '8px 12px', borderRadius: 12, background: m.role === 'user' ? '#0b5fff' : '#eee', color: m.role === 'user' ? '#fff' : '#000' }}>
                {m.text}
              </div>
            </div>)}
          </div>

          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <input aria-label="Type your message" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> { if (e.key === 'Enter') send(input); }} style={{ flex: 1, padding: 8 }} />
            <button onClick={()=>send(input)} style={{ padding: '8px 12px' }}>Send</button>
          </div>
        </div>
      </ChatBubble>
    </>
  );
}

export default App;

