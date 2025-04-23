'use client';

import { useState } from 'react';

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

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

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
      <h1 className="text-2xl font-bold mb-6 mt-20">📅 Bookings</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-700">Upcoming Bookings</h2>
        <div className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map(b => (
              <div key={b.id} className="p-4 border rounded-xl shadow-sm bg-green-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p><strong>Service:</strong> {b.service}</p>
                  <p><strong>Customer:</strong> {b.customerName}</p>
                  <p><strong>Date:</strong> {b.date}</p>
                </div>
                <button
                  onClick={() => handleMarkAsCompleted(b.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Mark as Completed
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming bookings.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Completed Bookings</h2>
        <div className="space-y-4">
          {completed.length > 0 ? (
            completed.map(b => (
              <div key={b.id} className="p-4 border rounded-xl shadow-sm bg-gray-100">
                <p><strong>Service:</strong> {b.service}</p>
                <p><strong>Customer:</strong> {b.customerName}</p>
                <p><strong>Date:</strong> {b.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No completed bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
}
