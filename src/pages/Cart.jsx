import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"

const Cart = ({ location, getLocation }) => {
    const { cartItem, updateQuantity, deleteItem } = useCart()
    const { user } = useUser()
    const navigate = useNavigate();

    const totalPrice = cartItem.reduce((total, item) => total + item.price, 0)

    // Form states
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [postcode, setPostcode] = useState('')
    const [country, setCountry] = useState('')
    
    const [promoCode, setPromoCode] = useState("");

    const [discount, setDiscount] = useState(0);

    const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "save10") {
        setDiscount(10); // ₹10 off
        alert("Promo code applied! ₹10 discount added.");
    } else {
        setDiscount(0);
        alert("Invalid promo code.");
    }
    };
    // Prefill fields from user/location
    useEffect(() => {
        if (user?.fullName) setFullName(user.fullName)
        if (location) {
        setAddress(location.address || '')
        setState(location.state || '')
        setPostcode(location.postcode || '')
        setCountry(location.country || '')
        }
    }, [user, location])
    const handleSubmit = () => {
    
    alert("Form submitted!");
  };
  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {
        cartItem.length > 0 ? <div>
          <h1 className='font-bold text-2xl '>My Cart ({cartItem.length})</h1>
          <div>
            <div className='mt-10'>
              {cartItem.map((item, index) => (
                <div key={index} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                  <div className='flex items-center gap-4'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md' />
                    <div>
                      <h1 className='md:w-[300px] line-clamp-2 '>{item.title}</h1>
                      <p className='text-red-500 font-semibold text-lg'>${item.price}</p>
                    </div>
                  </div>
                  <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                    <button onClick={() => updateQuantity(cartItem, item.id, "decrease")} className='cursor-pointer'>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(cartItem, item.id, "increase")} className='cursor-pointer'>+</button>
                  </div>
                  <span onClick={() => deleteItem(item.id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                    <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                  </span>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
                {/* Delivery Info */}
               <form className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'
                   onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                   }}
                >
                    <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

                    <div className='flex flex-col space-y-1'>
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder='Enter your name'
                        className='p-2 rounded-md'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    </div>

                    <div className='flex flex-col space-y-1'>
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder='Enter your address'
                        className='p-2 rounded-md'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    </div>

                    <div className='flex w-full gap-5'>
                    <div className='flex flex-col space-y-1 w-full'>
                        <label>State</label>
                        <input
                        type="text"
                        placeholder='Enter your state'
                        className='p-2 rounded-md w-full'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-1 w-full'>
                        <label>PostCode</label>
                        <input
                        type="text"
                        placeholder='Enter your postcode'
                        className='p-2 rounded-md w-full'
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        />
                    </div>
                    </div>

                    <div className='flex w-1/3 gap-5'>
                    <div className='flex flex-col space-y-1 w-full'>
                        <label>Country</label>
                        <input
                        type="text"
                        placeholder='Enter your country'
                        className='p-2 rounded-md w-full'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    
                    </div>

                    <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Submit</button>

                    <div className='flex items-center justify-center w-full text-gray-700'>
                    ---------OR-----------
                    </div>
                    <div className='flex justify-center'>
                    <button onClick={getLocation} className='bg-red-500 text-white px-3 py-2 rounded-md'>Detect Location</button>
                    </div>
                </form>

                {/* Bill Summary */}
                <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
                    <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>

                    <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'>
                        <LuNotebookText /> Items total
                    </h1>
                    <p>${totalPrice}</p>
                    </div>

                    <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'>
                        <MdDeliveryDining /> Delivery Charge
                    </h1>
                    <p className='text-red-500 font-semibold'>
                        <span className='text-gray-600 line-through'>$25</span> FREE
                    </p>
                    </div>

                    <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'>
                        <GiShoppingBag /> Handling Charge
                    </h1>
                    <p className='text-red-500 font-semibold'>$5</p>
                    </div>

                    <hr className='text-gray-200 mt-2' />

                    <div className='flex justify-between items-center'>
                    <h1 className='font-semibold text-lg'>Grand total</h1>
                    <p className='font-semibold text-lg'>${totalPrice + 5}</p>
                    </div>

                    <div>
                    <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                    {/* Show available codes */}
                        <p className="text-sm text-gray-500 mb-2">
                            Available promo codes: <span className="font-semibold text-green-600">SAVE10</span>
                        </p>
                    <div className='flex gap-3'>
                        <input
                        type="text"
                        placeholder='Enter code'
                        className='p-2 rounded-md w-full'
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button onClick={handleApplyPromo} className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
                        <p className="mt-3 text-gray-700">
                            Total: ₹{totalPrice - discount}
                        </p>
                    </div>
                    </div>

                    <button onClick={() => navigate('/payment', { state: { totalAmount: totalPrice + 5 } })}

                    className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'>Proceed to Checkout</button>
                </div>
            </div>
          </div>
        </div> : (
          <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
            <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
            <img src={emptyCart} alt="Empty cart" className='w-[400px]' />
            <button onClick={() => navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'>Continue Shopping</button>
          </div>
        )
      }
    </div>
  )
}

export default Cart
