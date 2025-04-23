'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface AskaiProps {
  role: string;
}

export default function AskAIWidget({ role }: AskaiProps) {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor =window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };

      recognition.onend = () => {
        setListening(false);
        setMode('text');
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('SpeechRecognition API not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setListening(true);
      setMode('voice');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setHistory(prev => [...prev, { sender: 'user', text: message }]);
    setLoading(true);
    setMessage('');

    const sellerData = localStorage.getItem('sellerdetails');

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: message,
          task: 'chat',
          actor: role,
          sellerData,
          mode,
        }),
      });
      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      setHistory(prev => [...prev, { sender: 'ai', text: data.reply || 'No response' }]);
    } catch (err) {
      console.error('AI Error:', err);
      setHistory(prev => [...prev, { sender: 'ai', text: 'Error contacting AI' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showChat && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setShowChat(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center gap-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
              <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
            GramiAI
          </button>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-lg font-bold mb-4 text-center">GramiAI</h2>
            <span
              className="absolute bg-red-200 rounded-full py-1 px-3 top-5 right-2 cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => setHistory([])}
            >
              Clear Chat
            </span>
            <span
              className="absolute bg-gray-300 rounded-full py-1 px-2 top-5 left-2 cursor-pointer text-gray-700 hover:text-gray-900"
              onClick={() => setShowChat(false)}
            >
              ❌
            </span>

            <div className="max-h-64 overflow-y-auto mb-4 space-y-2">
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-100 text-right ml-auto max-w-[80%]'
                      : 'bg-gray-100 text-left mr-auto max-w-[80%]'
                  }`}
                >
                  <strong>{msg.sender === 'user' ? 'You' : 'GramiAI'}:</strong>{' '}
                  {msg.sender === 'ai' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        a: ({ href, children, ...props }) => {
                          const url = href || '';
                          if (url.startsWith('/')) {
                            return (
                              <Link href={url} className="text-blue-600 hover:underline">
                                {children}
                              </Link>
                            );
                          }
                          return (
                            <a
                              href={url}
                              {...props}
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          );
                        },
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                      }}
                    >{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
              {loading && <div className="text-gray-500 text-sm">GramiAI is thinking...</div>}
            </div>

            <form onSubmit={sendMessage} className="flex flex-col gap-2">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring overflow-hidden"
                  placeholder="Ask your question..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`absolute top-1 right-1 bg-gray-300 rounded-full p-1 ${listening ? 'animate-pulse' : ''}`}
                >
                  🎤
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}