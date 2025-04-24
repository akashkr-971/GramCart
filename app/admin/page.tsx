"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  name:string;
  user_type: 'admin' | 'seller' | 'buyer' | 'delivery';
  status:string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  seller_id: string;
  category:string;
}


const dummyBookings = [
  { id: 101, userId: 1, sellerId: 2, date: "2023-10-26", service: "Plumbing", status: "Completed", amount: 50 },
  { id: 102, userId: 3, sellerId: 4, date: "2023-10-27", service: "Electrician", status: "Pending", amount: 75 },
  { id: 103, userId: 5, sellerId: 2, date: "2023-10-27", service: "Cleaning", status: "Cancelled", amount: 30 },
];

const dummyPayments = [
  { id: 201, bookingId: 101, amount: 50, date: "2023-10-26", status: "Paid", method: "Credit Card" },
  { id: 202, bookingId: 102, amount: 75, date: "2023-10-27", status: "Pending", method: "Bank Transfer" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [userFilter, setUserFilter] = useState("all");

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        setErrorUsers("Failed to load users.");
        setUsers([]);
      } else {
        setUsers(data || []);
      }
      setLoadingUsers(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
      if (error) {
        setErrorProducts("Failed to load products.");
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  const handleRevokeUser = (userId: number, userName: string) => {
    console.log(`Attempting to revoke user ID: ${userId} (${userName})`);
    alert(`Simulating revoke for user: ${userName} (ID: ${userId})`);
  };

  const filteredUsers = userFilter === "all" ? users : users.filter((user) => user.user_type === userFilter);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 ">Users</h2>
            <div className="mb-6 flex space-x-4">
              {["all", "buyer", "seller", "delivery"].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserFilter(type)}
                  className={`py-2 px-4 rounded-md text-sm font-medium ${
                    userFilter === type ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {type === "all" ? "All Users" : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
                </button>
              ))}
            </div>

            {loadingUsers && <p className="text-center">Loading users...</p>}
            {errorUsers && <p className="text-center text-red-600">{errorUsers}</p>}
            {!loadingUsers && filteredUsers.length === 0 && <p className="text-center">No users found.</p>}

            {!loadingUsers && filteredUsers.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                  <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <tr>
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-6">{user.id}</td>
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6 capitalize">{user.user_type}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`py-1 px-3 rounded-full text-xs ${
                              user.status === "Active" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <button
                            onClick={() => handleRevokeUser(user.id, user.name)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case "bookings":
        return (
          <div className="min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">User ID</th>
                    <th className="py-3 px-6 text-left">Seller ID</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Service</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyBookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6">{b.id}</td>
                      <td className="py-3 px-6">{b.userId}</td>
                      <td className="py-3 px-6">{b.sellerId}</td>
                      <td className="py-3 px-6">{b.date}</td>
                      <td className="py-3 px-6">{b.service}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`py-1 px-3 rounded-full text-xs ${
                            b.status === "Completed"
                              ? "bg-green-200 text-green-700"
                              : b.status === "Pending"
                              ? "bg-yellow-200 text-yellow-700"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-6">${b.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "payments":
        return (
          <div className="min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Payments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Booking ID</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyPayments.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6">{p.id}</td>
                      <td className="py-3 px-6">{p.bookingId}</td>
                      <td className="py-3 px-6">${p.amount.toFixed(2)}</td>
                      <td className="py-3 px-6">{p.date}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`py-1 px-3 rounded-full text-xs ${
                            p.status === "Paid" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-6">{p.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            {loadingProducts && <p className="text-center">Loading products...</p>}
            {errorProducts && <p className="text-center text-red-600">{errorProducts}</p>}
            {!loadingProducts && products.length === 0 && <p className="text-center">No products found.</p>}
            {!loadingProducts && products.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                  <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <tr>
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Price</th>
                      <th className="py-3 px-6 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-6">{product.id}</td>
                        <td className="py-3 px-6">{product.name}</td>
                        <td className="py-3 px-6">${product.price}</td>
                        <td className="py-3 px-6">{product.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userId');
    window.location.href = '/';
    console.log('Logged out successfully');
  };

  return (
    <>
      <nav className="bg-gray-200 shadow-md  w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors">
                GramCart
              </Link>
            </div>

            {/* Logout Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold mb-8 mt-5">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="mb-6 flex space-x-6">
        {["users", "bookings", "payments", "products"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium ${
              activeTab === tab ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600 hover:text-indigo-500"
            } pb-2`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Render Active Tab Content */}
      {renderContent()}
    </div>
    </>
  );
}
