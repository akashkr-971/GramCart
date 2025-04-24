'use client';
import { useEffect, useState } from 'react';
import { UserCircleIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/solid';
import { supabase } from '../utils/supabaseClient';

const languageMap = {
  en: 'English',
  ma: 'Malayalam',
  ta: 'Tamil',
  hi: 'Hindi'
};

export default function DeliveryProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [deliveryAgentData, setDeliveryAgentData] = useState({
    name: '',
    address: '',
    phone: '',
    vehicle_type: '',
    license: '',
    experience: '',
    preferred_language: '',
    preferred_locations: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const userid = localStorage.getItem('userId');
      setUserId(userid);
      if (userid) {
        const { data, error } = await supabase
          .from('delivery')
          .select('name,address,phone,license,preferred_locations,vehicle_type,experience,preferred_language')
          .eq('id', userid)
          .single();

        if (!error && data) {
          setDeliveryAgentData(data);
        }
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setDeliveryAgentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from('delivery')
      .update(deliveryAgentData)
      .eq('id', userId);

    if (!error) {
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      console.error(error);
      alert('Error updating profile');
    }
  };

  const getLanguageFullForm = (code: string) => {
    return languageMap[code as keyof typeof languageMap] || code;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="bg-green-50 rounded-xl p-6 shadow-sm mt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Delivery Agent Info</h2>
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {isEditing ? <CheckIcon className="h-5 w-5" /> : <PencilIcon className="h-5 w-5" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(deliveryAgentData).map(([key, value]) => {
            const labelMap: any = {
              name: 'Name',
              address: 'Address',
              phone: 'Phone',
              vehicle_type: 'Vehicle Type',
              license: 'Vehicle Number',
              experience: 'Experience',
              preferred_language: 'Preferred Language',
              preferred_locations: 'Service Area'
            };

            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {labelMap[key]}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={e => handleInputChange(key, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">
                    {key === 'preferred_language' ? getLanguageFullForm(value) : value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
