'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you choose packages, understand add-ons, and guide you through booking.',
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setIsSending(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });
      if (!res.ok) throw new Error('Unable to reach assistant');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I could not reach the assistant right now. Please email studio@dhayjosh.com and we will respond quickly.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="mb-4 w-80 rounded-3xl border border-neutral-200 bg-white shadow-subtle dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-600 dark:text-neutral-300">Studio Assistant</p>
            <button type="button" onClick={() => setOpen(false)} className="text-xs uppercase tracking-[0.3em]">
              Close
            </button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-2xl px-4 py-3 ${
                  message.role === 'assistant'
                    ? 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100'
                    : 'ml-auto bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                }`}
              >
                {message.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about rates, rescheduling..."
                className="flex-1 rounded-full border border-neutral-300 bg-transparent px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
              />
              <button
                type="button"
                disabled={isSending}
                onClick={handleSend}
                className="rounded-full border border-neutral-900 px-3 py-2 text-xs uppercase tracking-[0.3em] transition hover:bg-neutral-900 hover:text-white disabled:opacity-50 dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-subtle transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {open ? 'Hide Chat' : 'Chat'}
      </button>
    </div>
  );
}
