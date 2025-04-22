'use client';

import { useState, useEffect } from 'react';
import ProductCard from './productcard';
import { supabase } from '../utils/supabaseClient';

const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function RecommendedItems() {
  const [products, setProducts] = useState<{ id: number; image_url: string; name: string; price: number; rating: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const cachedData = localStorage.getItem('products');
      const cachedTime = localStorage.getItem('cacheTime');
      
      if (cachedData && cachedTime) {
        const cacheTimestamp = parseInt(cachedTime, 10);
        const currentTime = Date.now();

        // Check if the cache is still valid (within 5 minutes)
        if (currentTime - cacheTimestamp < CACHE_EXPIRY_TIME) {
          setProducts(JSON.parse(cachedData));
          setLoading(false);
          return;
        } else {
          // Cache expired, delete cached data
          localStorage.removeItem('products');
          localStorage.removeItem('cacheTime');
        }
      }

      // Fetch new data if no valid cache is available
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
        localStorage.setItem('products', JSON.stringify(data)); // Cache new data
        localStorage.setItem('cacheTime', Date.now().toString()); // Store the current time of caching
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard
            key={product.id || index}
            image={product.image_url}
            title={product.name || 'Product Name'}
            price={product.price || 0}
            rating={product.rating || 0}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
