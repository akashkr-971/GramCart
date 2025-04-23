'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { supabase } from '../utils/supabaseClient';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    if (storedUserId) {
      const fetchProfileData = async () => {
        const { data, error } = await supabase.from('users').select('name,address,email,phone_number').eq('id', storedUserId).single();
        if (data) setProfileData({
          name: data.name,
          email: data.email,
          phone: data.phone_number,
          address: data.address
        });
        if (error) console.error('Error fetching profile data:', error);
      };
      fetchProfileData();
    }
  }, []);

  interface ProfileData {
    name: string;
    email: string;
    phone: string;
    address: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData: ProfileData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const { error } = await supabase.from('users').update(profileData).eq('id', userId);
    if (error) console.error('Error updating profile:', error);
    else setEditMode(false);
  };

  const orders = [
    {
      id: '#GC1234',
      date: '2024-03-15',
      items: ['Organic Wheat (5kg)', 'Handmade Pottery (2 items)'],
      status: 'Delivered',
      total: '₹1,250'
    },
    {
      id: '#GC1122',
      date: '2024-02-28',
      items: ['Mangoes (10kg)', 'Cotton Saree'],
      status: 'Shipped',
      total: '₹2,150'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto max-w-4xl mt-20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
              <div className="space-y-2">
                <button onClick={() => setActiveSection('profile')} className={`w-full text-left p-3 rounded-lg ${activeSection === 'profile' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>Profile Details</button>
                <button onClick={() => setActiveSection('orders')} className={`w-full text-left p-3 rounded-lg ${activeSection === 'orders' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>Order History</button>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
              {activeSection === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Profile Details</h2>
                    <button
                      onClick={() => editMode ? handleSaveChanges() : setEditMode(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {editMode ? 'Save Changes' : 'Edit'}
                    </button>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(profileData).map((key) => (
                      <div key={key} className="flex flex-col">
                        <label className="text-sm text-gray-600 capitalize">{key}</label>
                        <input
                          type="text"
                          name={key}
                          value={profileData[key as keyof ProfileData]}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="mt-1 p-2 border rounded-md disabled:bg-gray-100"
                        />
                      </div>
                    ))}
                  </form>
                </div>
              )}

              {activeSection === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Order History</h2>
                  <ul className="space-y-4">
                    {orders.map(order => (
                      <li key={order.id} className="border p-4 rounded-lg">
                        <div className="font-semibold">Order ID: {order.id}</div>
                        <div>Date: {order.date}</div>
                        <div>Items: {order.items.join(', ')}</div>
                        <div>Status: {order.status}</div>
                        <div>Total: {order.total}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
