'use client';
import React, { useEffect, useState } from 'react';

export default function PaymentComponent() {
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'crypto' | 'cash'>('card');
  let [amount, setAmount] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const validateCard = () => {
    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumberPattern.test(cardNumber)) {
      alert('Invalid card number. Please enter a valid 16-digit card number.');
      return false;
    }
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDatePattern.test(expiryDate)) {
      alert('Invalid expiry date. Please use MM/YY format.');
      return false;
    }
    const cvvPattern = /^[0-9]{3}$/;
    if (!cvvPattern.test(cvv)) {
      alert('Invalid CVV. Please enter a valid 3-digit CVV.');
      return false;
    }

    return true;
  };

  const validateUpi = () => {
    const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!upiPattern.test(upiId)) {
      alert('Invalid UPI ID. Please enter a valid UPI ID.');
      return false;
    }
    return true;
  };

  const onPay = async () => {
    console.log('The payment type is:', paymentType);

    try {
      if (paymentType === 'upi') {
        if (validateUpi()) {
          alert('payment request has beem sent successfully!');
          window.location.href = '/';
          localStorage.removeItem('amount');
          localStorage.removeItem('cart');
        }
      } else if (paymentType === 'card') {
        if (validateCard()) {
          alert('Card payment processed successfully!');
          localStorage.removeItem('amount');
          localStorage.removeItem('cart');
          window.location.href = '/';
        }
      } else if (paymentType === 'crypto') {
        const coinbaseRes = await fetch('/api/coinbase/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Order Payment',
            description: 'Payment via Crypto',
            local_price: { amount: amount || '10.00', currency: 'INR' },
          }),
        });
        const { hosted_url } = await coinbaseRes.json();
        window.location.href = hosted_url;
      } else if (paymentType === 'cash') {
        alert('Order placed. You can pay cash upon delivery.');
        window.location.href = '/';
        localStorage.removeItem('amount');
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    const storedAmount = localStorage.getItem('amount') ?? '';
    setAmount(storedAmount);
  }, []);

  return (
    <div className="bg-green-50 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Payment Details{' '}
        <span className="text-green-600 float-right mr-10">Amount to Pay : {amount}</span>
      </h2>

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
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
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
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="number"
                pattern="\d{3}"
                required
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={onPay}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Confirm Payment
          </button>
        </div>
      )}

      {paymentType === 'upi' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="yourname@bank"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <button
            onClick={onPay}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Confirm Payment
          </button>
        </div>
      )}

      {paymentType === 'crypto' && (
        <div className="mb-4">
          <button
            onClick={onPay}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Confirm Payment
          </button>
        </div>
      )}

      {paymentType === 'cash' && (
        <div className="mb-4">
          <button
            onClick={onPay}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}
