'use client';

import { useState, useEffect } from 'react';

type Booking = {
  id: string;
  service: string;
  customerName: string;
  date: string;
  status: 'upcoming' | 'completed';
};

const initialBookings: Booking[] = [
  { id: '1', service: 'Organic Vegetables', customerName: 'Aarav', date: '2025-04-25', status: 'upcoming' },
  { id: '2', service: 'Handmade Pots', customerName: 'Meera', date: '2025-04-24', status: 'completed' },
  { id: '3', service: 'Fresh Dairy', customerName: 'Rahul', date: '2025-04-26', status: 'upcoming' },
  { id: '4', service: 'Bamboo Baskets', customerName: 'Latha', date: '2025-04-21', status: 'completed' },
];

const translations = {
  en: {
    bookings: 'Bookings',
    upcoming: 'Upcoming Bookings',
    completed: 'Completed Bookings',
    service: 'Service',
    customer: 'Customer',
    date: 'Date',
    markCompleted: 'Mark as Completed',
    noUpcoming: 'No upcoming bookings.',
    noCompleted: 'No completed bookings.',
  },
  ta: {
    bookings: 'முன்பதிவுகள்',
    upcoming: 'வரவிருக்கும் முன்பதிவுகள்',
    completed: 'நிறைவு செய்யப்பட்ட முன்பதிவுகள்',
    service: 'சேவை',
    customer: 'வாடிக்கையாளர்',
    date: 'தேதி',
    markCompleted: 'நிறைவாக குறிக்கவும்',
    noUpcoming: 'வரவிருக்கும் முன்பதிவுகள் எதுவும் இல்லை.',
    noCompleted: 'நிறைவு செய்யப்பட்ட முன்பதிவுகள் எதுவும் இல்லை.',
  },
  hi: {
    bookings: 'बुकिंग्स',
    upcoming: 'आगामी बुकिंग्स',
    completed: 'पूर्ण बुकिंग्स',
    service: 'सेवा',
    customer: 'ग्राहक',
    date: 'तारीख',
    markCompleted: 'पूर्ण के रूप में चिह्नित करें',
    noUpcoming: 'कोई आगामी बुकिंग नहीं।',
    noCompleted: 'कोई पूर्ण बुकिंग नहीं।',
  },
  ml: {
    bookings: 'ബുക്കിംഗുകൾ',
    upcoming: 'വരാനിരിക്കുന്ന ബുക്കിംഗുകൾ',
    completed: 'പൂർത്തിയാക്കിയ ബുക്കിംഗുകൾ',
    service: 'സേവനം',
    customer: 'ഉപഭോക്താവ്',
    date: 'തീയതി',
    markCompleted: 'പൂർത്തിയായി അടയാളപ്പെടുത്തുക',
    noUpcoming: 'വരാനിരിക്കുന്ന ബുക്കിംഗുകളൊന്നുമില്ല.',
    noCompleted: 'പൂർത്തിയാക്കിയ ബുക്കിംഗുകളൊന്നുമില്ല.',
  }
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    const lang = localStorage.getItem('lang') || 'en';
    setT(translations[lang as keyof typeof translations] || translations.en);
  }, []);

  const handleMarkAsCompleted = (id: string) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: 'completed' } as Booking : b
    );
    setBookings(updated);
  };

  const upcoming = bookings.filter(b => b.status === 'upcoming');
  const completed = bookings.filter(b => b.status === 'completed');

  return (
    <div className="p-6 mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-6 mt-20">📅 {t.bookings}</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-700">{t.upcoming}</h2>
        <div className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map(b => (
              <div key={b.id} className="p-4 border rounded-xl shadow-sm bg-green-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p><strong>{t.service}:</strong> {b.service}</p>
                  <p><strong>{t.customer}:</strong> {b.customerName}</p>
                  <p><strong>{t.date}:</strong> {b.date}</p>
                </div>
                <button
                  onClick={() => handleMarkAsCompleted(b.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  {t.markCompleted}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t.noUpcoming}</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">{t.completed}</h2>
        <div className="space-y-4">
          {completed.length > 0 ? (
            completed.map(b => (
              <div key={b.id} className="p-4 border rounded-xl shadow-sm bg-gray-100">
                <p><strong>{t.service}:</strong> {b.service}</p>
                <p><strong>{t.customer}:</strong> {b.customerName}</p>
                <p><strong>{t.date}:</strong> {b.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t.noCompleted}</p>
          )}
        </div>
      </div>
    </div>
  );
}
