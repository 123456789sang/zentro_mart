import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.totalAmount || 0;

  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);

    // Simulate payment process
    setTimeout(() => {
      setLoading(false);
      navigate('/payment-status', { state: { success: true, amount } });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Payment Page</h1>
        <p className="mb-6 text-center text-lg">Total Amount: <span className="font-semibold">${amount}</span></p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Processing...</span>
            </div>
          ) : (
            'Pay Now'
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
