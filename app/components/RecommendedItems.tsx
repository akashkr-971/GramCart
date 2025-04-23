'use client';

import { useState, useEffect } from 'react';
import ProductCard from './productcard';
import { supabase } from '../utils/supabaseClient';
import { translateProducts} from '../utils/translate';

export default function RecommendedItems() {
  const [products, setProducts] = useState<{ id: number; image_url: string; name: string; price: number; rating: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
        localStorage.setItem('products', JSON.stringify(data));
      }
      setLoading(false);
      const lang = localStorage.getItem('lang') || 'en';
      if (lang !== 'en' && data && data.length > 0) {
        await translateProducts(data, setProducts);
      }
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
            id={product.id || 0}
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
