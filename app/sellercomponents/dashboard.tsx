import React, { useState, useEffect } from 'react';
import { ChartBarIcon, CurrencyDollarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { supabase } from '../utils/supabaseClient';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashBoard = () => {
  const [products, setProducts] = useState<{ id: number; name: string; price: number; stock: number; category: string }[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [totalproducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', userId);

      const totalproducts = data?.length;
      setTotalProducts(totalproducts || 0);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
  }


  const handleEditProduct = (product: Product): void => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    const { id, name, price, stock ,category} = editingProduct;
    const { error } = await supabase
      .from('products')
      .update({ name, price, stock, category })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
    } else {
      setEditingProduct(null);
      window.location.reload();
      toast.success('Product updated successfully!');
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;

    // Logic for withdrawal (e.g., updating balance in the database)
    alert(`Withdrawal of ₹${withdrawAmount} initiated!`);
    setWithdrawAmount('');
  };

  const stats = [
    { name: 'Total Sales', value: '₹1,20,000', icon: <ShoppingBagIcon className="h-6 w-6 text-green-500" /> },
    { name: 'Total Products', value: totalproducts, icon: <ChartBarIcon className="h-6 w-6 text-blue-500" /> },
    { name: 'Remaining Profit', value: '₹50,000', icon: <CurrencyDollarIcon className="h-6 w-6 text-yellow-500" /> },
  ];

  const recentSales = 
  [
    { product: 'Organic Wheat', date: 'April 18, 2025', amount: '₹2,000' },
    { product: 'Fresh Vegetables', date: 'April 17, 2025', amount: '₹1,500' },
    { product: 'Dairy Products', date: 'April 16, 2025', amount: '₹3,000' },
  ];

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 15000, 10000, 20000, 25000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const sellername = localStorage.getItem('sellername');

    if (userId) {
      const sellerdetails = [
        {
          id: 1,
          name: sellername,
          total_sales: stats[0].value,
          total_products: totalproducts,
          remaining_profit: stats[2].value,
          seller_products: products
        }
      ];
      console.log("Storing sellerdetails:", sellerdetails);
      localStorage.setItem('sellerdetails', JSON.stringify(sellerdetails));
    }
  }, [products, totalproducts]);


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 overflow-x-hidden">
      <h1 className="mt-10 text-4xl font-extrabold text-gray-900 mb-12 text-center">Seller Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-8 flex items-center justify-between hover:shadow-2xl transition-shadow"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.name}</p>
              <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Sales Graph Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Overview</h2>
        <div className="overflow-x-auto">
          <Line data={salesData} />
        </div>
      </div>

      {/* Recent Sales Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                <th className="border-b py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="border-b py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{sale.product}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{sale.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{sale.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Balance Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Withdraw Balance</h2>
        <h4 className="text-2xl font-bold text-gray-900 mb-6">Available Balance : {stats[2].value}</h4>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount to withdraw"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={handleWithdraw}
            className="px-6 py-3 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">Product Name</th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">Price</th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">Stock</th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">Category</th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-lg text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-lg text-gray-500">₹{product.price}</td>
                  <td className="py-3 px-4 text-lg text-gray-500">{product.stock}</td>
                  <td className="py-3 px-4 text-lg text-gray-500">{product.category}</td>
                  <td className="py-3 px-4 text-lg text-gray-900">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-200 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                placeholder="Product Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="number"
                required
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                placeholder="Price"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="number"
                required
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value === '' ? 1 : parseInt(e.target.value, 10) })}
                placeholder="Stock"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <select
                name="category"
                required
                value={editingProduct.category || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, category:e.target.value })}
                className={`block w-full p-2 rounded-md border`}
                >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Clothing">Clothing</option>
                <option value="Farming">Farming</option>
                <option value="Handcraft">Handcraft</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Grains and Pulses">Grains and Pulses</option>
                <option value="Seeds and Sapling">Seeds and Sapling</option>
                <option value="Dairy Products">Dairy Products</option>
                </select>
                
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;