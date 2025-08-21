import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Account from '../../components/Account/Account';
import logo from '../../assets/logo/logo.jpg';

import './Shop.css'
import Loader from '../../components/Loader/Loader';


function Shop() {

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://einstein-plumbers1.onrender.com";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartlength, setCartlength] = useState([]);
  const [openAccount, setOpenAccount] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showFillFields, setShowFillFields] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes, cartRes, userRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/cart`, { credentials: "include" }),
          fetch(`${API_URL}/api/me`, { credentials: "include" }),
        ]);

        const [categoriesData, productsData, cartData, userData] = await Promise.all([
          categoriesRes.json(),
          productsRes.json(),
          cartRes.json(),
          userRes.ok ? userRes.json() : null,
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
        setCartlength(cartData);

        if (userData) {
          setIsAuthenticated(true);
          setUser(userData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };

    fetchData();
  }, [API_URL]);

  // ✅ If still loading, show Loader only inside Shop
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => {
        const category = categories.find(c => c.category_id === p.category_id);
        return category?.category_name === selectedCategory;
      })
    : products;

  // Notification components
  const Notification = () => (
    <div className="done-notification fixed bottom-[10%] right-0 flex justify-center items-center gap-2 rounded-lg shadow-lg z-10"
      style={{ padding: "10px 20px" }}>
      <i className="fa-regular fa-circle-check text-white"></i>
      <h1 className="text-yellow-500">
        Congratulations! Your account is ready. <br /> You can now log in and start exploring.
      </h1>
    </div>
  );

  const FillAllFieldsNotification = () => (
    <div className="fillallfields-notification fixed bottom-[10%] right-0 flex justify-center items-center gap-2 bg-red-600 rounded-lg shadow-lg z-10"
      style={{ padding: "10px 20px", animation: "identifier 1.4s ease-in-out forwards" }}>
      <i className="fa-regular fa-circle-check text-white"></i>
      <h1 className="text-yellow">Oops! It looks like you missed some <br /> fields. Please fill them all in.</h1>
    </div>
  );
  // ----------------logout-------------
    // ✅ Logout function (clear cookie and update state)
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
};


  return (
    <div>
      {openAccount && <Account onClose={() => setOpenAccount(false)} />}
      {showNotification && <Notification />}
      {showFillFields && <FillAllFieldsNotification />}

      {/* Header */}
      <div style={{ padding: '10px' }}>
        <div className='flex justify-around items-center border-gray-300 border'>
          <Link to={`/`}>
            <img src={logo} alt="logo" className='w-[5rem]' loading='lazy' />
          </Link>
          <ul className='gap-5 cursor-pointer hidden md:flex'>
            <Link to={`/`}>
            <li>Home</li>
            </Link>
            <li>About</li>
            <Link to={`/services`}><li>Service</li></Link>
            <Link to={`/contactus`}><li>Contact</li></Link>
            <Link to={`/shop`}><li>Shop</li></Link>
          </ul>
          <div className='flex items-center gap-3'>
            <Link to={`/cart`} className="relative inline-block">
              <i className="fa-solid fa-cart-arrow-down text-[20px]"></i>
              <span className="absolute -bottom-4 left-1/1 -translate-x-1/2 bg-[#0077be] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartlength.length ? cartlength.length : 0}
              </span>
            </Link>
                {!isAuthenticated ? (
              <button
                className='rounded-[20px] border text-[#000000] cursor-pointer'
                style={{ padding: '5px 12px' }}
                onClick={() => setOpenAccount(true)}
              >
                Sign in
              </button>
            ) : (
              <div className="relative dropdown">
                <i className="fa-solid fa-user text-2xl cursor-pointer"></i>
                <span>{user?.username}</span>
                {/* Dropdown for logout */}
               <div className="dropdown-menu">
                <Link to={`/profile`}>
                <button>Profile</button>
                </Link>

                  <button
                    onClick={handleLogout}
                    className="block text-left text-red-600 w-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="category-products py-10">
        <h1 className='brands text-center text-2xl'>
          Browse By Brands on <br />
          <span className='text-[#0077be]'>EINSTEIN PLUMBERS</span> Shop
        </h1>
        <div className='flex flex-wrap gap-2 items-center justify-center mt-5'>
          {categories.map(cat => (
            <div
              key={cat.category_id}
              className={`category-item w-fit shadow rounded-[7px] cursor-pointer ${selectedCategory === cat.category_name ? "bg-[#0077be] text-white" : ""}`}
              style={{ padding: "5px" }}
              onClick={() => setSelectedCategory(cat.category_name)}
            >
              <img src={`${API_URL}/uploads/${cat.category_image}` }
                alt={cat.category_name} className="w-[4rem]"
                loading="lazy" />
              <p className="text-center font-semibold text-[15px]">{cat.category_name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "40px" }}>
        <h1 className='text-center shop-heading text-4xl'>
          Find The Best Deal For <br />
          You as a <span className='text-[#0077be]'>Plumber</span>
        </h1><br />

        {filteredProducts.length > 0 ? (
          <div className='grid md:grid-cols-4 gap-6 mt-10'>
            {filteredProducts.map(product => (
              <Link key={product.product_id} to={`/itemoverview/${product.product_id}`}>
                <div>
                  <img
                    src={`${API_URL}/uploads/${product.product_image1}`}
                    alt={product.product_name}
                    loading="lazy"
                    className='w-full object-cover rounded-tl-[20px] rounded-tr-[20px] h-[15rem]'
                  />
                  <div className='shadow-md rounded-bl-[10px] rounded-br-[10px]' style={{ paddingLeft: '20px' }}>
                    <h2 className='font-bold'>{product.product_name}</h2>
                    <p className='h-[3.3rem] overflow-y-hidden'>{product.product_description} </p>
                    <p className='font-black text-2xl text-amber-700'>
                      {Number(product.product_newprice).toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="text-center text-xl font-bold text-gray-600 mt-10">
            No product belongs to this category
          </h1>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
