
import { useState } from "react";
import { FiDollarSign, FiCreditCard, FiCalendar, FiArrowUpRight, FiCheckCircle, FiAlertTriangle, FiActivity } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Payments = () => {
  const [earnings, setEarnings] = useState(500);
  const [paymentHistory, setPaymentHistory] = useState([
    { 
      id: 1,
      date: "2025-04-20", 
      amount: 250,
      method: "Bank Transfer",
      status: "Completed",
      transactionId: "#TX123456"
    },
    { 
      id: 2,
      date: "2025-04-19", 
      amount: 150,
      method: "UPI",
      status: "Pending",
      transactionId: "#TX123455"
    },
  ]);

  const chartData = [
    { week: "Week 1", earnings: 120 },
    { week: "Week 2", earnings: 200 },
    { week: "Week 3", earnings: 180 },
    { week: "Week 4", earnings: 300 },
  ];

  const handleWithdraw = () => {
    // Add proper withdrawal logic here
    setEarnings(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payment Overview</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <FiCalendar className="text-green-600" />
          <span>April 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Earnings Card */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 mb-2 flex items-center">
                <FiDollarSign className="mr-2 text-green-600" /> Available Balance
              </p>
              <p className="text-3xl font-bold text-gray-800">₹{earnings}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FiDollarSign className="text-2xl text-green-600" />
            </div>
          </div>
          <button
            onClick={handleWithdraw}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <FiArrowUpRight className="mr-2" /> Request Withdrawal
          </button>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiCreditCard className="mr-2 text-blue-600" /> Payment Methods
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiCreditCard className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Bank Account</p>
                  <p className="text-sm text-gray-500">**** **** 1234</p>
                </div>
              </div>
              <FiCheckCircle className="text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FiCreditCard className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">UPI ID</p>
                  <p className="text-sm text-gray-500">user@upi</p>
                </div>
              </div>
              <FiAlertTriangle className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiActivity className="mr-2 text-green-600" /> Weekly Earnings
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiCalendar className="mr-2 text-blue-600" /> Transaction History
          </h2>
          <button className="text-green-600 hover:text-green-700 text-sm">
            View All Transactions →
          </button>
        </div>
        
        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${payment.status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {payment.status === 'Completed' ? (
                    <FiCheckCircle className="text-green-600" />
                  ) : (
                    <FiAlertTriangle className="text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{payment.method}</p>
                  <p className="text-sm text-gray-500">{payment.transactionId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">₹{payment.amount}</p>
                <p className="text-sm text-gray-500">{payment.date}</p>
                <span className={`text-xs ${payment.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;