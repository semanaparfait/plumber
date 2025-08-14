import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import cart from '../../assets/cart/download.jpeg'
import { Link } from 'react-router-dom';


function Cart() {
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/cart', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    })
    .then(data => {
      setCartItems(data || []);
    })
    .catch(err => {
      console.error('Failed to fetch cart:', err);
    });
}, []);


const removeFromCart = async (cartId) => {
  if (!cartId) return; // safeguard

  try {
    const res = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Remove item from state immediately
    setCartItems(prev => prev.filter(item => item.cart_id !== cartId));

    console.log("Item removed:", data.message);
  } catch (err) {
    console.error("Error removing item from cart:", err);
  }
};


const totalPrice = cartItems.reduce((sum, item) => {
  const price = Number(item.product_newprice) || 0;
  const qty = Number(item.quantity) || 0;
  return sum + price * qty;
}, 0);

  return (
    <div>
      <Navbar />
      
       {cartItems.length === 0 ? (
        <div className='flex flex-col items-center'>

          <p className="nothingin-cart text-center font-black text-4xl">Your cart is empty 😔</p><br />
          <img src={cart} alt="the cart image" className='w-[20rem] object-cover'/><br />
          <Link to={`/shop`}>
          <button className='bg-[#0077be] rounded-[5px] text-white font-bold' style={{padding:'10px 20px'}}>Go to shop Immdiatery</button>
          </Link>
        </div>
  ) : (
      <>
     
      <div className="cart px-8 py-6 " >
        <h1 className='cart-heading text-center font-black text-4xl'>MY CART PRODUCT FROM <br /><span className='text-[#0077be]'>EINSTEIN PLUMBERS</span></h1><br />
        {/* Render table header */}
        <div className="cart-items-title hidden md:grid grid-cols-6 text-center font-semibold pb-2 ">
          <p>Items</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
  
        </div>
        <br />
        

        {/* Render cart rows from backend */}
        {cartItems.map((item) => (
          
          <div key={item.id} className="grid grid-cols-4 md:grid-cols-6  items-center justify-between text-center border-b border-b-gray-300 "
          style={{padding:'10px 2rem'}}
          >
            <div className='flex flex-wrap  items-center gap-0 md:gap-4'>
            <img 
            src={`http://localhost:5000/uploads/${item.product_image1}`} 
            // src={item.product_image1} 
            alt={item.name} className="w-16 h-16 object-cover mx-auto" />
            <p className='font-semibold'>{item.product_name}</p>

            </div>
            <p className='hidden md:block'> {Number(item.product_newprice).toLocaleString()}RWF</p>
            <p>{item.quantity}</p>
            <p className='font-bold'> {(Number(item.product_newprice) * Number(item.quantity)).toLocaleString()} RWF</p>
            <p className='text-green-500 font-black'>{item.cart_statust}</p>
            <button className="text-red-500" onClick={() => removeFromCart(item.cart_id)}>X</button>
          </div>
        ))}
      </div><br /><br />
      <div style={{padding:'0px 20px'}}>

      <div className='flex flex-wrap gap-5 items-center justify-between'>
      <div className='w-full md:w-[40%]'>
        <h1 className='font-black text-3xl'>Cart Total</h1><br />
        <div className='flex justify-between border-b border-b-gray-500' style={{paddingBottom:'15px'}}>
          <p>Subtotal</p>
          <p>1000RWF</p>
        </div>
        <div className='flex justify-between border-b border-b-gray-500' style={{padding:'15px 0px'}}>
          <p>Items</p>
          <p>10 </p>
        </div>
        <div className='flex justify-between ' style={{padding:'15px 0px'}}>
          <h2 className='font-bold'>Total</h2>
          <h2 className='font-bold'> {totalPrice.toLocaleString()} </h2>
        </div>
        <button className='bg-[#0077be] rounded-[6px] font-bold text-white' style={{padding:'10px 15px'}}>PROCED TO CHECKOUT</button>
      </div>
      <div className=' w-full md:w-[40%]'>
        <form >
        <label>If you have a promo code, Enter it here</label><br /><br />
        <input type="text"
        placeholder='Promocode'
        className='bg-gray-400'
        style={{padding:'7px 15px'}}
        />
        <button className='bg-[#0077be] rounded-[4px] font-bold text-white'
        style={{padding:'7px 15px'}}
        >Apply</button>

        </form>
      </div>
      </div>
      </div><br />
         </>
  )}
    </div>
  );
}

export default Cart;
