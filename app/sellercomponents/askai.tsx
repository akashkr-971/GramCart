'use client';
import { useState } from 'react';

export default function AskAIWidget() {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: 'user' as const, text: message };
    setHistory(prev => [...prev, userMessage]);
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const aiMessage = { sender: 'ai' as const, text: data?.reply || 'No response' };
      setHistory(prev => [...prev, aiMessage]);
    } catch (err) {
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
              <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
            </svg>
            GramiAI
          </button>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-lg font-bold mb-4 text-center">GramiAI</h2>
            <span className='absolute bg-red-200 rounded-full py-1 px-3 top-5 right-2 cursor-pointer text-red-500 hover:text-red-700'
                onClick={() => setHistory([])}
                >Clear Chat</span>
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
                  <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
                </div>
              ))}
              {loading && <div className="text-gray-500 text-sm">GramiAI is thinking...</div>}
            </div>

            <form onSubmit={sendMessage} className="flex flex-col gap-2">
              <textarea
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring"
                placeholder="Ask your question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowChat(false)}
                  className="text-red-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
