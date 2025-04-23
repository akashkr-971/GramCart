'use client';

import React, { useEffect, useState } from 'react';
import AddressForm from '../../components/addresssetup';
import PaymentComponent from '../../components/paymentcomponent';
import Navbar from '../../components/NavBar';
import { supabase } from '../../utils/supabaseClient';

const Checkout = () => {
  const [address, setAddress] = useState('');
  let oldaddress = '';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user_id = localStorage.getItem('userId');
    const fetchAddress = async () => {
      if (user_id) {
        const { data } = await supabase
          .from('users')
          .select('address')
          .eq('id', user_id)
          .single();

        if (data) {
            setAddress(data.address);
            console.log('Address:', data.address);
            oldaddress = data.address;
            console.log('The old address is ',oldaddress);
        }
            
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handlePayment = () => {
    alert('Payment successful!');
    localStorage.removeItem('cart');
    window.location.href = '/';
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="p-8 -mb-10">
        {!isLoading && (
          <>
            {address ? (
              <div className="mt-16 text-green-700 font-medium bg-green-50 p-4 rounded-lg">
                Using saved address: {address} <br /><br />
                <button
                    onClick={() => {setAddress('');console.log('The old address is ',oldaddress);}}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Add another address</button>
              </div>
            ) : (
                <>
                    <AddressForm />
                </>
            )}
          </>
        )}
      </div>
      <div className="p-8">
        <PaymentComponent onPay={handlePayment} />
      </div>
    </div>
  );
};

export default Checkout;
