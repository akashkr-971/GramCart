'use client';
import React, { useState } from 'react';

interface PaymentComponentProps {
  onPay: () => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ onPay }) => {
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'crypto' | 'cash'>('card');

  return (

    <div className="bg-green-50 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setPaymentType('card')}
          className={`p-3 border-2 rounded-lg transition-colors ${
            paymentType === 'card'
              ? 'border-green-600 bg-green-50'
              : 'border-green-200 hover:border-green-400'
          }`}
        >
          <span className="block text-sm font-medium text-black">Card</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('upi')}
          className={`p-3 border-2 rounded-lg transition-colors ${
            paymentType === 'upi'
              ? 'border-green-600 bg-green-50'
              : 'border-green-200 hover:border-green-400'
          }`}
        >
          <span className="block text-sm font-medium text-black">UPI</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('crypto')}
          className={`p-3 border-2 rounded-lg transition-colors ${
            paymentType === 'crypto'
              ? 'border-green-600 bg-green-50'
              : 'border-green-200 hover:border-green-400'
          }`}
        >
          <span className="block text-sm font-medium text-black">Crypto</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('cash')}
          className={`p-3 border-2 rounded-lg transition-colors ${
            paymentType === 'cash'
              ? 'border-green-600 bg-green-50'
              : 'border-green-200 hover:border-green-400'
          }`}
        >
          <span className="block text-sm font-medium text-black">Cash</span>
        </button>
      </div>

      {paymentType === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input
              type="number"
              required
              pattern="\d{16}"
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                required
                pattern="\d{2}/\d{2}"
                placeholder="MM/YY"
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="number"
                pattern="\d{3}"
                required
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="123456"
              />
            </div>
          </div>
        </div>
      )}

      {paymentType === 'upi' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="yourname@bank"
          />
        </div>
      )}

      <button
        onClick={onPay}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentComponent;
