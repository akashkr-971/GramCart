'use client';

import React, { useState, useEffect } from 'react'
import ProductCard from './productcard'
import { supabase } from '../utils/supabaseClient'
import { translateProducts, Producttype } from '../utils/translate';

const ArtisansNearYou = () => {
  const [products, setProducts] = useState<Producttype[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(3);
      
      if (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        return;
      }else {
        console.log('Fetched products:', data);
    }

      setProducts(data);
      setLoading(false);

      const lang = localStorage.getItem('lang') || 'en';
       if (lang !== 'en' && data.length > 0) {
        await translateProducts(data, setProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image_url}
              title={product.name}
              description={
                product.description
                  ? product.description.length > 25
                    ? product.description.slice(0, 25) + '...'
                    : product.description
                  : 'No Description'
              }
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ArtisansNearYou
