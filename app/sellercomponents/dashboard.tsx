import React, { useState, useEffect } from 'react';
import { ChartBarIcon, CurrencyDollarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { supabase } from '../utils/supabaseClient';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const translations = {
  en: {
    dashboardTitle: "Seller Dashboard",
    stats: {
      totalSales: "Total Sales",
      totalProducts: "Total Products",
      remainingProfit: "Remaining Profit"
    },
    salesOverview: "Sales Overview",
    recentSales: "Recent Sales",
    withdrawBalance: "Withdraw Balance",
    availableBalance: "Available Balance",
    enterAmount: "Enter amount to withdraw",
    yourProducts: "Your Products",
    productName: "Product Name",
    price: "Price",
    stock: "Stock",
    category: "Category",
    actions: "Actions",
    edit: "Edit",
    withdraw: "Withdraw",
    noProducts: "No products available",
    editProduct: "Edit Product",
    cancel: "Cancel",
    save: "Save",
    categories: {
      clothing: "Clothing",
      farming: "Farming",
      handcraft: "Handcraft",
      vegetable: "Vegetable",
      grains: "Grains and Pulses",
      seeds: "Seeds and Sapling",
      dairy: "Dairy Products"
    },
    selectCategory: "Select a category",
    successMessage: "Product updated successfully!"
  },
  ml: {
    dashboardTitle: "വിൽപ്പനക്കാരൻ ഡാഷ്ബോർഡ്",
    stats: {
      totalSales: "മൊത്തം വിറ്റുവരവ്",
      totalProducts: "ആകെ ഉൽപ്പന്നങ്ങൾ",
      remainingProfit: "ശേഷിക്കുന്ന ലാഭം"
    },
    salesOverview: "വിറ്റുവരവ് അവലോകനം",
    recentSales: "ഏറ്റവും പുതിയ വിറ്റുവരവുകൾ",
    withdrawBalance: "ബാലൻസ് പിൻവലിക്കൽ",
    availableBalance: "ലഭ്യമായ ബാലൻസ്",
    enterAmount: "പിൻവലിക്കാനുള്ള തുക നൽകുക",
    yourProducts: "നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ",
    productName: "ഉൽപ്പന്നത്തിന്റെ പേര്",
    price: "വില",
    stock: "സ്റ്റോക്ക്",
    category: "വിഭാഗം",
    actions: "പ്രവൃത്തികൾ",
    edit: "തിരുത്തുക",
    withdraw: "പിൻവലിക്കുക",
    noProducts: "ഉൽപ്പന്നങ്ങൾ ലഭ്യമല്ല",
    editProduct: "ഉൽപ്പന്നം തിരുത്തുക",
    cancel: "റദ്ദാക്കുക",
    save: "സംരക്ഷിക്കുക",
    categories: {
      clothing: "വസ്ത്രങ്ങൾ",
      farming: "കൃഷി",
      handcraft: "കരകൗശലം",
      vegetable: "പച്ചക്കറി",
      grains: "ധാന്യങ്ങളും പയർവർഗങ്ങളും",
      seeds: "വിത്തുകളും നാളികേരങ്ങളും",
      dairy: "പാൽ ഉൽപ്പന്നങ്ങൾ"
    },
    selectCategory: "ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക",
    successMessage: "ഉൽപ്പന്നം വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു!"
  },
  hi: {
    dashboardTitle: "विक्रेता डैशबोर्ड",
    stats: {
      totalSales: "कुल बिक्री",
      totalProducts: "कुल उत्पाद",
      remainingProfit: "शेष लाभ"
    },
    salesOverview: "बिक्री अवलोकन",
    recentSales: "हाल की बिक्री",
    withdrawBalance: "राशि निकालें",
    availableBalance: "उपलब्ध शेष",
    enterAmount: "निकालने के लिए राशि दर्ज करें",
    yourProducts: "आपके उत्पाद",
    productName: "उत्पाद का नाम",
    price: "मूल्य",
    stock: "स्टॉक",
    category: "श्रेणी",
    actions: "कार्रवाई",
    edit: "संपादन",
    withdraw: "निकालें",
    noProducts: "कोई उत्पाद उपलब्ध नहीं",
    editProduct: "उत्पाद संपादित करें",
    cancel: "रद्द करें",
    save: "सहेजें",
    categories: {
      clothing: "वस्त्र",
      farming: "खेती",
      handcraft: "हस्तशिल्प",
      vegetable: "सब्जी",
      grains: "अनाज और दालें",
      seeds: "बीज और पौध",
      dairy: "डेयरी उत्पाद"
    },
    selectCategory: "एक श्रेणी चुनें",
    successMessage: "उत्पाद सफलतापूर्वक अद्यतन!"
  },
  ta: {
    dashboardTitle: "விற்பனையாளர் டாஷ்போர்டு",
    stats: {
      totalSales: "மொத்த விற்பனை",
      totalProducts: "மொத்த தயாரிப்புகள்",
      remainingProfit: "மீதமுள்ள லாபம்"
    },
    salesOverview: "விற்பனை கண்ணோட்டம்",
    recentSales: "சமீபத்திய விற்பனைகள்",
    withdrawBalance: "பணத்தை திரும்பப்பெற",
    availableBalance: "உள்ளிட்ட தொகை",
    enterAmount: "திரும்பப்பெற வேண்டிய தொகையை உள்ளிடவும்",
    yourProducts: "உங்கள் தயாரிப்புகள்",
    productName: "தயாரிப்பு பெயர்",
    price: "விலை",
    stock: "பங்கு",
    category: "வகை",
    actions: "செயல்கள்",
    edit: "திருத்து",
    withdraw: "திரும்பப்பெற",
    noProducts: "தயாரிப்புகள் இல்லை",
    editProduct: "தயாரிப்பை திருத்து",
    cancel: "ரத்து செய்",
    save: "சேமி",
    categories: {
      clothing: "ஆடை",
      farming: "விவசாயம்",
      handcraft: "கைவினை",
      vegetable: "காய்கறி",
      grains: "தானியங்கள் மற்றும் பருப்பு வகைகள்",
      seeds: "விதைகள் மற்றும் நாற்றுகள்",
      dairy: "பால் பொருட்கள்"
    },
    selectCategory: "ஒரு வகையை தேர்ந்தெடுக்கவும்",
    successMessage: "தயாரிப்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது!"
  }
};

const DashBoard = () => {
  const [lang, setLang] = useState<keyof typeof translations>('en');
  const [products, setProducts] = useState<{ id: number; name: string; price: number; stock: number; category: string }[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [totalproducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const savedLang = (localStorage.getItem('lang') as keyof typeof translations) || 'en';
    setLang(savedLang);
    
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
        setProducts(data || []);
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
    const { id, name, price, stock, category } = editingProduct;
    const { error } = await supabase
      .from('products')
      .update({ name, price, stock, category })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
    } else {
      setEditingProduct(null);
      window.location.reload();
      toast.success(translations[lang].successMessage);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    alert(`Withdrawal of ₹${withdrawAmount} initiated!`);
    setWithdrawAmount('');
  };

  const stats = [
    { name: translations[lang].stats.totalSales, value: '₹1,20,000', icon: <ShoppingBagIcon className="h-6 w-6 text-green-500" /> },
    { name: translations[lang].stats.totalProducts, value: totalproducts, icon: <ChartBarIcon className="h-6 w-6 text-blue-500" /> },
    { name: translations[lang].stats.remainingProfit, value: '₹50,000', icon: <CurrencyDollarIcon className="h-6 w-6 text-yellow-500" /> },
  ];

  const recentSales = [
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 overflow-x-hidden">
      <h1 className="mt-10 text-4xl font-extrabold text-gray-900 mb-12 text-center">
        {translations[lang].dashboardTitle}
      </h1>

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
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16 w-full overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 w-full">
          {translations[lang].salesOverview}
        </h2>
        <div className="w-full">
          <Line data={salesData} />
        </div>
      </div>

      {/* Recent Sales Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {translations[lang].recentSales}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-4 text-sm font-medium text-gray-500">
                  {translations[lang].productName}
                </th>
                <th className="border-b py-3 px-4 text-sm font-medium text-gray-500">
                  {translations[lang].category}
                </th>
                <th className="border-b py-3 px-4 text-sm font-medium text-gray-500">
                  {translations[lang].price}
                </th>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {translations[lang].withdrawBalance}
        </h2>
        <h4 className="text-2xl font-bold text-gray-900 mb-6">
          {translations[lang].availableBalance} : {stats[2].value}
        </h4>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder={translations[lang].enterAmount}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={handleWithdraw}
            className="px-6 py-3 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            {translations[lang].withdraw}
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {translations[lang].yourProducts}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">
                  {translations[lang].productName}
                </th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">
                  {translations[lang].price}
                </th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">
                  {translations[lang].stock}
                </th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">
                  {translations[lang].category}
                </th>
                <th className="border-b py-3 px-4 text-lg font-medium text-gray-500">
                  {translations[lang].actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
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
                        {translations[lang].edit}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-3 px-4 text-lg text-gray-500 text-center">
                    {translations[lang].noProducts}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-200 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {translations[lang].editProduct}
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                placeholder={translations[lang].productName}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="number"
                required
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                placeholder={translations[lang].price}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="number"
                required
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value === '' ? 1 : parseInt(e.target.value, 10) })}
                placeholder={translations[lang].stock}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <select
                name="category"
                required
                value={editingProduct.category || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className={`block w-full p-2 rounded-md border`}
              >
                <option value="" disabled>
                  {translations[lang].selectCategory}
                </option>
                <option value="Clothing">{translations[lang].categories.clothing}</option>
                <option value="Farming">{translations[lang].categories.farming}</option>
                <option value="Handcraft">{translations[lang].categories.handcraft}</option>
                <option value="Vegetable">{translations[lang].categories.vegetable}</option>
                <option value="Grains and Pulses">{translations[lang].categories.grains}</option>
                <option value="Seeds and Sapling">{translations[lang].categories.seeds}</option>
                <option value="Dairy Products">{translations[lang].categories.dairy}</option>
              </select>
                
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  {translations[lang].cancel}
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  {translations[lang].save}
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