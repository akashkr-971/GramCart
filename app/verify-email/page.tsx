'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';

export default function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const handleResendEmail = async () => {
    setErrors('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) throw error;
      alert('Verification email resent successfully!');
    } catch (error) {
      setErrors((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/signup.jpeg')] bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Verify Your Email</h1>
        <p className="text-center text-black mb-4">A verification email has been sent to your email address. Please check your inbox and click the link to verify your account.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {errors && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors}
          </div>
        )}

        <button
          onClick={handleResendEmail}
          disabled={loading}
          className={`mt-3 w-full py-3 px-4 rounded-lg transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {loading ? 'Resending...' : 'Resend Verification Email'}
        </button>

        <button
          onClick={() => router.push('/login')}
          className="w-full mt-4 py-3 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-black"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}