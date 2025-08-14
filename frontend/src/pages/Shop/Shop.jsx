import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Account from '../../components/Account/Account';
import logo from '../../assets/logo/logo.jpg';
import tools from '../../assets/hero/tools.jpg';

function Shop() {
    const API_URL = process.env.REACT_APP_API_URL;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openAccount, setOpenAccount] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showFillFields, setShowFillFields] = useState(false);

  // Fetch categories once
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch products once
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category_name === selectedCategory)
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

  return (
    <div>
      {openAccount && <Account onClose={() => setOpenAccount(false)} />}
      {showNotification && <Notification />}
      {showFillFields && <FillAllFieldsNotification />}

      {/* Header */}
      <div style={{ padding: '10px' }}>
        <div className='flex justify-around items-center border-gray-300 border'>
          <Link to={`/`}>
            <img src={logo} alt="logo" className='w-[5rem]' />
          </Link>
          <ul className='gap-5 cursor-pointer hidden md:flex'>
            <li>Home</li>
            <li>About</li>
            <Link to={`/services`}><li>Service</li></Link>
            <Link to={`/contactus`}><li>Contact</li></Link>
            <Link to={`/shop`}><li>Shop</li></Link>
          </ul>
          <div className='flex items-center gap-3'>
            <Link to={`/cart`}>
              <i className="fa-solid fa-cart-arrow-down text-[20px]"></i>
            </Link>
            <button className='rounded-[20px] border text-[#000000] cursor-pointer'
              style={{ padding: '5px 12px' }}
              onClick={() => setOpenAccount(true)}>Sign in</button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          width: '100%',
          height: '80vh',
          backgroundImage: `url(${tools})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }}></div>

        <h1 className='shop-overlay text-5xl'
          style={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            textAlign: 'center',
            top: '50%',
            transform: 'translateY(-50%)',
            fontWeight: 'bold'
          }}>
          Find the Perfect Plumbing Solutions for Every Job <br />
          <span className='text-[#0077be]'>EINSTEIN PLUMBER ltd</span>
        </h1>
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
              className="category-item w-fit shadow rounded-[7px] cursor-pointer"
              style={{ padding: "5px" }}
              onClick={() => setSelectedCategory(cat.category_name)}
            >
              <img src={`${API_URL}/uploads/${cat.category_image}`}
                alt={cat.category_name} className="w-[4rem]" />
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
        </h1>
        <div className='grid md:grid-cols-4 gap-6 mt-10'>
          {filteredProducts.map(product => (
            <Link key={product.product_id} to={`/itemoverview/${product.product_id}`}>
              <div>
                <img
                  src={`${API_URL}/uploads/${product.product_image1}`}
                  alt={product.product_name}
                  className='w-full object-cover rounded-tl-[20px] rounded-tr-[20px] h-[15rem]'
                />
                <div className='shadow-md rounded-bl-[10px] rounded-br-[10px]' style={{ paddingLeft: '20px' }}>
                  <h2 className='font-bold'>{product.product_name}</h2>
                  <p>{product.product_description}</p>
                  <p className='font-black text-2xl text-amber-700'>{product.product_newprice} RWF</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
