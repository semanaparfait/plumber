import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate hook
import Orderhistory from './Orderhistory';
import { Link } from 'react-router-dom';

function Profile() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://einstein-plumbers1.onrender.com";

  const [loggedinuser, setLoggedinuser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[clickednav,setClickednav] = useState("profile")
const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // ✅ hook for programmatic navigation

  useEffect(() => {
    fetch(`${API_URL}/api/me`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setLoggedinuser(data);
        setIsAuthenticated(true);
      })
      .catch(err => {
        console.error('Error fetching the logged in user:', err);
        setIsAuthenticated(false);
        navigate('/'); // ✅ redirect if not authenticated
      });
  }, [API_URL, navigate]);

  const firstName = loggedinuser.username?.split(" ")[0] || "";
  const lastName = loggedinuser.username?.split(" ").slice(1).join(" ") || "";

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setIsAuthenticated(false);
    navigate('/'); // ✅ redirect after logout
  };
    // Fetch cart items
// Fetch cart items after user is confirmed
useEffect(() => {
  if (!loggedinuser.id) return; // Wait until user is loaded
  fetch(`${API_URL}/api/cart`, { credentials: 'include' })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => setCart(data))
    .catch(err => console.error("Error fetching cart:", err));
}, [loggedinuser, API_URL]);

// Calculate total items
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

const totalPrice = cart.reduce((sum, item) => {
  const price = Number(item.product_newprice) || 0;
  const qty = Number(item.quantity) || 0;
  return sum + price * qty;
}, 0);
  return (
    <div style={{padding:'30px'}}>
        <Link to={`/`}>
        <p className='text-[#0077be]'><i className="fa-solid fa-arrow-left"></i> Back to Home</p><br />
        </Link>
        {/* --------------heading-------------- */}
        <div className='bg-[#0077be] rounded-[10px]' style={{padding:'20px 30px'}}>

        <div className='flex flex-wrap gap-5 items-center justify-between text-white'>
            <div className='flex flex-wrap items-center justify-center gap-4'>
                <img src="https://i.pinimg.com/736x/76/fc/02/76fc024fabab1bf341e6b5fd6ec44b0d.jpg" alt="profile image" className='w-[5rem] rounded-full' />
                <div>
                    <h1 className='font-bold'>{loggedinuser.username}</h1>
                    <h2>{loggedinuser.phonenumber}</h2>
                    <p>Member since january 2020</p>
                </div>
            </div>

            <div className='flex flex-wrap gap-4'>
                <div>
                    <h1><i className="fa-solid fa-money-bill-1-wave"></i> {totalPrice.toLocaleString()} RWF</h1>
                    <p>Total Money</p>
                </div>
                <div>
                    <h1><i className="fa-solid fa-bag-shopping"></i> {cart.length}</h1>
                    <p>Total Orders</p>
                </div>
                <div>
                    <h1><i className="fa-solid fa-cart-shopping"></i> {totalItems}</h1>
                    <p>Total items</p>
                </div>
            </div>
        </div>
        </div><br />
        {/* -----------------navigations------------- */}
        <div className='flex flex-wrap items-center justify-evenly shadow-lg rounded-[10px] gap-4 cursor-pointer' style={{padding:'10px'}}>
        <div
            onClick={() => setClickednav("profile")}
            className={`rounded-[10px] p-2 flex items-center gap-2 ${
            clickednav === "profile" ? "bg-[#0077be] text-white" : ""
            }`}
            style={{padding:'8px 13px'}}
        >
            <i className="fa-solid fa-user"></i> Profile Info
        </div>

        <div
            onClick={() => setClickednav("orderhistory")}
            className={`rounded-[10px] p-2 flex items-center gap-2 ${
            clickednav === "orderhistory" ? "bg-[#0077be] text-white" : ""
            }`}
            style={{padding:'8px 13px'}}
        >
            <i className="fa-solid fa-clock-rotate-left"></i> Order History
        </div>

        <div
            onClick={() => setClickednav("address")}
            className={`rounded-[10px] p-2 flex items-center gap-2 ${
            clickednav === "address" ? "bg-[#0077be] text-white" : ""
            }`}
        >
            <i className="fa-solid fa-location-dot"></i> Address
        </div>

        <div
            onClick={() => setClickednav("payment")}
            className={`rounded-[10px] p-2 flex items-center gap-2 ${
            clickednav === "payment" ? "bg-[#0077be] text-white" : ""
            }`}
            style={{padding:'8px 13px'}}
        >
            <i className="fa-solid fa-credit-card"></i> Payment Methods
        </div>

        <div
            onClick={() => setClickednav("security")}
            className={`rounded-[10px] p-2 flex items-center gap-2 ${
            clickednav === "security" ? "bg-[#0077be] text-white" : ""
            }`}
            style={{padding:'8px 13px'}}
        >
            <i className="fa-solid fa-shield-halved"></i> Security
        </div>
        </div><br />

        {/* -----------------------profile----------------------- */}
        {clickednav === 'profile' && (
        <div className='shadow-2xl rounded-2xl' style={{padding:'20px'}}>
            <div className='flex items-center justify-between'>
            <h1 className='font-bold'>Personal Information</h1>
            <i className="fa-solid fa-pen-to-square"></i>
            </div><br />
            <div className='flex flex-col gap-5'>
                <div className='flex flex-wrap gap-4 items-center justify-between w-1/2'>

                <div>
                    <h2 className='font-semibold'>First Name</h2>
                    <p>{firstName}</p>
                </div>
                <div>
                    <h2 className='font-semibold'>Last Name</h2>
                    <p>{lastName}</p>
                </div>
                </div>
                <div className='flex flex-wrap gap-4 items-center justify-between w-1/2'>

                <div>
                    <h2 className='font-semibold'>Phone Number</h2>
                    <p>{loggedinuser.phonenumber}</p>
                </div>
                <div>
                    <h2 className='font-semibold'>Created At</h2>
                    <p>{loggedinuser.created_at}</p>
                </div>
                </div>
                <div>
                    <button
                    onClick={handleLogout}
                    className="block text-left bg-red-500 w-fit text-white rounded-[10px] outline-none"style={{padding:'5px 10px'}}
                  >
                    Logout
                  </button>
                </div>
            </div>

        </div>
        )}

        {clickednav === 'orderhistory' && (

        <Orderhistory />
        )}
    </div>
  )
}

export default Profile