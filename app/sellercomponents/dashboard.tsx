import React from 'react';
import SalesOverview from './SalesOverview';
import ProductList from './ProductList';
import Notifications from './Notifications';

const SellerDashboard = () => {
  return (
    <div className="dashboard-container bg-white">
      <h1>Seller Dashboard</h1>
      <SalesOverview />
      <ProductList />
      <Notifications />
    </div>
  );
};

export default SellerDashboard;