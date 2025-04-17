'use client';
import { useState, useEffect } from 'react';
import { SpeakerWaveIcon, BellAlertIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function RuralAssistFeatures() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineForm, setShowOfflineForm] = useState(false);
  const [alerts, setAlerts] = useState<{ id: number; type: string; message: string }[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [orderMessage, setOrderMessage] = useState('');

  // Check internet connection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch emergency alerts (mock API call)
  useEffect(() => {
    const fetchAlerts = async () => {
      const mockAlerts = [
        { id: 1, type: 'weather', message: 'Heavy rains predicted in Maharashtra - Harvest suggestions for farmers' },
        { id: 2, type: 'market', message: 'Cotton prices expected to rise 15% next week' }
      ];
      setAlerts(mockAlerts);
    };

    fetchAlerts();
  }, []);

  // Text-to-speech functionality
const speakAlert = (message: string): void => {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(speech);
    }
};

  // Handle offline order submission
interface OfflineOrder {
    message: string;
    timestamp: string;
}

const handleOfflineOrder = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const orders: OfflineOrder[] = JSON.parse(localStorage.getItem('offlineOrders') || '[]');
    orders.push({
        message: orderMessage,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('offlineOrders', JSON.stringify(orders));
    setOrderMessage('');
    setShowOfflineForm(false);
};

  return (
    <>
      {/* Emergency Alert System */}
      {alerts.map(alert => !dismissedAlerts.has(alert.id) && (
        <div key={alert.id} className="bg-red-50 p-4 border-b border-red-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <BellAlertIcon className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-bold mb-1">Emergency Alert!</h3>
                <p>{alert.message}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => speakAlert(alert.message)}
                className="text-red-600 hover:text-red-700"
                aria-label="Listen"
              >
                <SpeakerWaveIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setDismissedAlerts(prev => new Set([...prev, alert.id]))}
                className="text-red-600 hover:text-red-700"
                aria-label="Dismiss"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Offline Support System */}
      {!isOnline && (
        <div className="bg-orange-100 p-4 fixed bottom-0 w-full shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-orange-800">
                No Internet? Call to order:
              </span>
              <a href="tel:+91-XXXXXX" className="font-semibold text-orange-900 hover:underline">
                +91-XXXXXX
              </a>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowOfflineForm(!showOfflineForm)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Offline Form
              </button>
              <button
                onClick={() => navigator.share?.({ 
                  title: 'GramCart Offline Number',
                  text: 'Save this number for offline orders: +91-XXXXXX'
                })}
                className="text-orange-900 hover:underline text-sm"
              >
                Share Number
              </button>
            </div>
          </div>

          {showOfflineForm && (
            <form onSubmit={handleOfflineOrder} className="mt-4 max-w-7xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={orderMessage}
                  onChange={(e) => setOrderMessage(e.target.value)}
                  placeholder="Type your order message..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-orange-700 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Accessibility Floating Control */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => speakAlert(document.querySelector('main')?.innerText || '')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
          aria-label="Read page aloud"
        >
          <SpeakerWaveIcon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}