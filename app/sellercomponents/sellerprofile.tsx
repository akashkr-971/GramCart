import React, { useState, useEffect } from 'react';
import { UserCircleIcon, DocumentTextIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { supabase } from '../utils/supabaseClient';
import toast from 'react-hot-toast';

const SellerProfile = () => {
    const userId = localStorage.getItem('userId');
  const [profileData, setProfileData] = useState({
    name: '',
    aadhaar: '',
    village: '',
    district: '',
    state: '',
    pinCode: '',
    businessType: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upi: '',
    additionalDetails: '',
  });
  const [editMode, setEditMode] = useState({
    personal: false,
    business: false,
    financial: false,
  });

  useEffect(() => {
    if (userId) {
      const fetchProfileData = async () => {
        const { data, error } = await supabase.from('seller').select('*').eq('id', userId).single();
        if (data) {
          setProfileData(data);
          const sellername = data.name;
          localStorage.setItem('sellername', sellername);
        } else {
          console.error('Error fetching profile data:', error);
        }
      };
      fetchProfileData();
    }
  }, []);

interface ProfileData {
    name: string;
    aadhaar: string;
    village: string;
    district: string;
    state: string;
    pinCode: string;
    businessType: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    upi: string;
    additionalDetails: string;
}

interface EditMode {
    personal: boolean;
    business: boolean;
    financial: boolean;
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
};

const handleSave = async (section: keyof EditMode): Promise<void> => {
    const { error } = await supabase.from('seller').update(profileData).eq('id', userId);
    if (error) {
        console.error('Error updating profile data:', error);
    } else {
        setEditMode({ ...editMode, [section]: false });
        toast.success('Profile updated successfully!');
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <UserCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Seller Profile</h1>
        </div>

        <div className="space-y-8">
          {/* Personal Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <UserCircleIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
              </div>
              <button
                onClick={() => setEditMode({ ...editMode, personal: !editMode.personal })}
                className="text-green-600 hover:underline"
              >
                {editMode.personal ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(['name', 'aadhaar', 'village', 'district', 'state', 'pinCode'] as Array<keyof ProfileData>).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {editMode.personal ? (
                    <input
                      type="text"
                      name={field}
                      value={profileData[field]}
                      onChange={handleInputChange}
                      className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                    />
                  ) : (
                    <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">{profileData[field]}</p>
                  )}
                </div>
              ))}
            </div>
            {editMode.personal && (
              <button
                onClick={() => handleSave('personal')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            )}
          </div>

          {/* Business Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Business Information</h2>
              </div>
              <button
                onClick={() => setEditMode({ ...editMode, business: !editMode.business })}
                className="text-green-600 hover:underline"
              >
                {editMode.business ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                {editMode.business ? (
                  <input
                    type="text"
                    name="businessType"
                    value={profileData.businessType}
                    onChange={handleInputChange}
                    className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                  />
                ) : (
                  <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">{profileData.businessType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                {editMode.business ? (
                  <textarea
                    name="additionalDetails"
                    value={profileData.additionalDetails}
                    onChange={handleInputChange}
                    className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                  />
                ) : (
                  <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">{profileData.additionalDetails}</p>
                )}
              </div>
            </div>
            {editMode.business && (
              <button
                onClick={() => handleSave('business')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            )}
          </div>

          {/* Financial Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BanknotesIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Financial Information</h2>
              </div>
              <button
                onClick={() => setEditMode({ ...editMode, financial: !editMode.financial })}
                className="text-green-600 hover:underline"
              >
                {editMode.financial ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(['bankName', 'accountNumber', 'ifsc', 'upi'] as Array<keyof ProfileData>).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {editMode.financial ? (
                    <input
                      type="text"
                      name={field}
                      value={profileData[field]}
                      onChange={handleInputChange}
                      className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                    />
                  ) : (
                    <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">{profileData[field]}</p>
                  )}
                </div>
              ))}
            </div>
            {editMode.financial && (
              <button
                onClick={() => handleSave('financial')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;