'use client';
import { useState } from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

const AddressForm = () => {
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-green-50 rounded-xl p-6 shadow-sm mb-8 mt-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={address.state}
            onChange={(e) => setAddress({...address, state: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
          <input
            type="number"
            required
            pattern="\d{6}"
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={address.zip}
            onChange={(e) => setAddress({...address, zip: e.target.value})}
          />
        </div>
      </form>
    </div>
  );
};

export default AddressForm;