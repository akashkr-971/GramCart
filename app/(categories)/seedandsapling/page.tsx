'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/NavBar';
import { supabase } from '@/app/utils/supabaseClient';
import ProductCard from '@/app/components/productcard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
}

const ProductPage = () => {
  const params = useParams();
  const rawItem = params?.item;
  const item = rawItem ? decodeURIComponent(rawItem as string) : '';
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    const { data: fetchedData, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Seeds and Sapling');

        if(data){
            console.log(data);
        }

      if (error) {
        console.error('Error fetching products:', error.message);
        return;
      }

      setData(fetchedData as Product[]);
    };
    fetchData();
  }, [item]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Products on Category  <span className="text-green-600">Seed and saplings</span>:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
          
          data.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
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
          ))) : (
              <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
