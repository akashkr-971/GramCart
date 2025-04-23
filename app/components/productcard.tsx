'use client';
import React from 'react'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import StarRating from './starrating';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const addToCart = (newItem: CartItem): void => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const exists: boolean = cart.some((item: CartItem) => item.title === newItem.title);

  if (!exists) {
    const updatedCart: CartItem[] = [...cart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`Item ${newItem.title} Added to cart`);
  } else {
    toast.error(`Item ${newItem.title} is Already in the cart`);
  }
};

const translations ={
  en: {
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
  },
  hi: {
    addToCart: 'कार्ट में जोड़ें',
    viewDetails: 'विस्तार से देखें',
  },
  ml: {
    addToCart: `കാർട്ടി
                ലേക്ക് 
                ചേർ
                ക്കുക`,
    viewDetails: `വിശദാം
                  ശങ്ങൾ കാണുക`, 
  },
  ta: {
    addToCart: `கார்ட்
                டில் 
                சேர்க்
                கவும்`, 
    viewDetails: `விவர
                  ங்க
                  ளைப்
                  பார்க்
                  கவும்`, 
  }
}


export default function ProductCard({ id,image, title, price, rating }: ProductCardProps) {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');
      
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('lang') as 'en' | 'hi' | 'ta' | 'ml' | null;
        if (storedLang) {
          setLang(storedLang);
        }
      }
    }, []);
  return (
    <div id="productcard">
        <div className="bg-white p-3 rounded-lg shadow-md w-">
          <Image src={image} alt={title} width={200} height={200} className="w-full h-40 object-cover rounded-md mb-2" />
          <h3 className="text-lg text-black font-semibold mb-2">{title}</h3>
          <div className="text-gray-700 mb-2 flex items-center justify-between">
            <span className="text-green-600 font-bold">₹ {price}</span>
            <div className='flex gap-2 items-center'>
              <span className="text-green-600 font-bold">{rating}</span>
              <span className='flex'><StarRating rating={rating} /></span>
            </div>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              {translations[lang].viewDetails}
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={()=>{
                addToCart({ title, id, price, image, quantity: 1 });
              }}
            >
              {translations[lang].addToCart}
            </button>
          </div>
        </div>
    </div>
  )
}