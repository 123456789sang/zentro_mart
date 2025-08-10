import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, amount } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {success ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
          <p className="mt-2">You paid ${amount}</p>
        </>
      ) : (
        <h1 className="text-3xl font-bold text-red-600">Payment Failed!</h1>
      )}
      <button
        onClick={() => navigate('/products')}
        className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentStatus;
