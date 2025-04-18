'use client';
import { useState, useRef } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    image: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }
      setProductData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setProductData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProductData(prev => ({ ...prev, image: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!productData.name.trim()) newErrors.name = 'Product name is required';
    if (!productData.price.trim()) newErrors.price = 'Price is required';
    if (!productData.image) newErrors.image = 'Product image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Product Data:', productData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setProductData({ name: '', price: '', description: '', image: null });
      setPreview(null);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              } hover:border-green-500 transition-colors`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-2 text-center">
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                    >
                      <XMarkIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                        <span>Upload a file</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>
            {errors.image && (
              <p className="mt-2 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className={`block w-full rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-green-500 focus:ring-green-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className={`block w-full rounded-md border ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-green-500 focus:ring-green-500`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Add detailed product description..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setProductData({ name: '', price: '', description: '', image: null });
                setPreview(null);
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-green-600 text-white rounded-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
            Product added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;