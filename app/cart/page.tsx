'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
}



const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step] = useState<'cart' | 'payment'>('cart');

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        setCartItems(JSON.parse(cart));
      } catch {
        setCartItems([]);
      }
    }
  }, []);


  const removeFromCart = (title: string) => {
    const updatedCart = cartItems.filter(item => item.title !== title);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`Item ${title} removed from cart`);
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price*item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex absolute top-20">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center flex flex-col items-center justify-center min-h-screen -mt-16 flex items-center justify-center flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-cart-plus mt-16" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            <p className="text-gray-600 text-lg mt-4 font-semibold">Your cart is empty</p>
            <Link href="/" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {step === 'cart' && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full mt-10 sm:mt-30">
                  <ul className="space-y-4">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col items-center justify-between p-2 bg-green-50 rounded-lg gap-4 sm:gap-6 sm:flex-row"
                      >
                        <div className="flex items-center gap-10 p-0">
                          <p>{index + 1}</p>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-green-600">₹{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-xl hover:bg-gray-600"
                          onClick={() => {
                            const updatedCart = cartItems.map((cartItem) => {
                              if (cartItem.id === item.id) {
                                const newQuantity = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
                                return { ...cartItem, quantity: newQuantity };
                              }
                              return cartItem;
                            }).filter((cartItem) => cartItem.quantity > 0);

                            setCartItems(updatedCart);
                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                          }}
                        >
                          −
                        </button>

                        <span className="text-lg font-semibold w-6 text-center">{item.quantity}</span>

                        <button
                          onClick={() => {
                            const updatedCart = cartItems.map((cartItem) => {
                              if (cartItem.id === item.id) {
                                return { ...cartItem, quantity: cartItem.quantity + 1 };
                              }
                              return cartItem;
                            });

                            setCartItems(updatedCart);
                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                          }}
                          className="bg-green-700 text-white px-3 py-1 rounded-full text-xl hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>
                        <button
                          onClick={() => removeFromCart(item.title)}
                          className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700"
                        >
                          Remove
                        </button>
                        <p>{(item.price * item.quantity).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-800">
                      Subtotal: ₹{subtotal.toFixed(2)}
                    </p>
                    <button
                      onClick={() => window.location.href = 'cart/checkout'}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;