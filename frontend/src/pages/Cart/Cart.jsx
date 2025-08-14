import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import cartImg from '../../assets/cart/download.jpeg';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await fetch('https://einstein-plumbers1.onrender.com/api/cart', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      setCartItems(data || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove item from cart
  const removeFromCart = async (cartId) => {
    if (!cartId) return;
    try {
      const res = await fetch(`https://einstein-plumbers1.onrender.com/api/cart/${cartId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCartItems(prev => prev.filter(item => item.cart_id !== cartId));
      console.log('Item removed:', data.message);
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product_newprice) * Number(item.quantity),
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <div>
      <Navbar />

      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center py-10'>
          <p className="text-center font-black text-4xl">Your cart is empty 😔</p>
          <img src={cartImg} alt="Empty cart" className='w-[20rem] object-cover my-5' />
          <Link to={`/shop`}>
            <button className='bg-[#0077be] rounded-[5px] text-white font-bold px-5 py-2'>
              Go to Shop Immediately
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart px-8 py-6">
            <h1 className='text-center font-black text-4xl'>
              MY CART PRODUCTS FROM <br />
              <span className='text-[#0077be]'>EINSTEIN PLUMBERS</span>
            </h1>
            <br />

            {/* Cart table header */}
            <div className="hidden md:grid grid-cols-6 text-center font-semibold pb-2">
              <p>Items</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Status</p>
              <p>Remove</p>
            </div>
            <br />

            {/* Cart items */}
            {cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="grid grid-cols-4 md:grid-cols-6 items-center justify-between text-center border-b border-gray-300 py-4"
              >
                <div className='flex flex-wrap items-center gap-2 md:gap-4'>
                  <img
                    src={`https://einstein-plumbers1.onrender.com/uploads/${item.product_image1}`}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                  <p className='font-semibold'>{item.product_name}</p>
                </div>

                <p className='hidden md:block'>{Number(item.product_newprice).toLocaleString()} RWF</p>
                <p>{item.quantity}</p>
                <p className='font-bold'>
                  {(Number(item.product_newprice) * Number(item.quantity)).toLocaleString()} RWF
                </p>
                <p className='text-green-500 font-black'>{item.cart_statust}</p>
                <button
                  className="text-red-500 cursor-pointer font-bold"
                  onClick={() => removeFromCart(item.cart_id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Cart summary */}
          <div className='px-5 md:px-20 my-10 flex flex-col md:flex-row gap-5 justify-between'>
            <div className='w-full md:w-[40%]'>
              <h1 className='font-black text-3xl mb-4'>Cart Total</h1>
              <div className='flex justify-between border-b border-gray-500 py-2'>
                <p>Subtotal</p>
                <p>{subtotal.toLocaleString()} RWF</p>
              </div>
              <div className='flex justify-between border-b border-gray-500 py-2'>
                <p>Items</p>
                <p>{totalItems}</p>
              </div>
              <div className='flex justify-between py-2'>
                <h2 className='font-bold'>Total</h2>
                <h2 className='font-bold'>{subtotal.toLocaleString()} RWF</h2>
              </div>
              <button className='bg-[#0077be] rounded-[6px] font-bold text-white mt-4 px-5 py-2'>
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className='w-full md:w-[40%]'>
              <form>
                <label>If you have a promo code, enter it here</label>
                <br /><br />
                <input
                  type="text"
                  placeholder='Promo code'
                  className='bg-gray-400 w-full md:w-auto px-3 py-2 rounded'
                />
                <button
                  className='bg-[#0077be] rounded-[4px] font-bold text-white ml-2 px-3 py-2'
                  type='button'
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
