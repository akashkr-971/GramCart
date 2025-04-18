import React from 'react'
import Navbar from '../sellercomponents/sellernavbar'

const Seller = () => {
  return (
    <div>
      <Navbar />
      <div className='bg-white h-screen'>
        <h1 className='text-2xl font-bold'>Seller Dashboard</h1>
        {/* Add your dashboard components here */}
      </div>
    </div>
  )
}

export default Seller