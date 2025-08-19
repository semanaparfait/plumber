import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Orderhistory() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://einstein-plumbers1.onrender.com";

  const [loggedinuser, setLoggedinuser] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    fetch(`${API_URL}/api/me`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setLoggedinuser(data);
        fetchCart(); // fetch cart after user is confirmed
      })
      .catch(() => navigate('/'));
  }, [API_URL, navigate]);

  // Fetch cart items
  const fetchCart = () => {
    fetch(`${API_URL}/api/cart`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setCart(data))
      .catch(err => console.error("Error fetching cart:", err));
  };

  // Calculate total
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.product_price) * item.quantity, 0);
const date= new Date()
const year= date.getFullYear()
  return (
    <div style={{ padding: '30px' }} className='shadow-2xl rounded-[10px]'>
      <h1 className='font-bold'>Welcome, {loggedinuser.username} to your Order History</h1><br />
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div >

            {cart.map(item => (
                <div key={item.cart_idid} className='border border-gray-500 rounded-[12px] flex flex-wrap gap-7 items-center justify-between'style={{padding:'10px', marginBottom:'12px'}}>
                    <div>
                        <div className='flex gap-4'>
                            <h1 className='font-semibold'>ORD-{year}-{item.cart_id}</h1>
                            <p className='bg-amber-600 rounded-[10px] w-fit'style={{padding:'3px 7px'}}>{item.cart_status}</p>
                        </div>
                        <div>
                            <p><i className="fa-solid fa-calendar-days"></i> {item.created_at}</p>
                            <p><i className="fa-solid fa-bag-shopping"></i> {item.quantity} Items</p>
                            <p className='text-purple-800'>Tracking: ORD-{year}-{item.cart_id}</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <h2 className='font-bold'>{Number(item.product_newprice).toLocaleString()}RWF</h2>
                        <i className="fa-solid fa-eye"></i>
                        <i className="fa-solid fa-download"></i>
                    </div>
                </div>

            ))}
        </div>
      )}
    
    </div>
  );
}

export default Orderhistory;
