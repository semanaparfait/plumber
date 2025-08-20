import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

// -----------------Notification Component-----------------
function CartNotificationAdded({ item, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the notification with a slight delay to allow for the animation
    setIsVisible(true);

    // Set a timer to start the fade-out process
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Start fade out after 2.5 seconds

    // Set a timer to completely remove the component from the DOM after the animation
    const removeTimer = setTimeout(() => {
      onClose();
    }, 3000); // Total display time: 2.5s (visible) + 0.5s (fade out)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  // Use a dynamic class based on the isVisible state
  const notificationClasses = `
    fixed top-10 right-4 z-50
    flex items-center gap-2
    rounded-lg shadow-lg text-white
    bg-green-500 transition-all duration-500 ease-in-out
    transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
  `;

  return (
    <div className={notificationClasses} style={{ padding: "10px 20px" }}>
      <i className="fa-regular fa-circle-check text-white"></i>
      <div>
        <h1 className="font-bold">{item.product_name}</h1>
        <p>Added to cart</p>
      </div>
      <button onClick={() => setIsVisible(false)} className="ml-4 font-bold">X</button>
    </div>
  );
}

// -----------------Item Overview Component-----------------
function Itemoverview() {
  const API_URL = 
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://einstein-plumbers1.onrender.com";

  const { productid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // New state for notification
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return <p>Loading...</p>;

  const item = products.find(product => product.product_id === parseInt(productid));

  if (!item) return <p>Product not found</p>;

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = async (productId) => {
    if (isAdding) return;

    setIsAdding(true);

    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity: count })
      });

      const data = await res.json();
      console.log("Cart updated:", data);

      if (res.ok) {
        // Show the notification instead of navigating
        setShowNotification(true);
        // You can also add a timeout to hide the notification automatically
      } else {
        console.error("Failed to add to cart:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px' }}>
        {/* Conditionally render the notification */}
        {showNotification && (
          <CartNotificationAdded item={item} onClose={() => setShowNotification(false)} />
        )}
        <div className="flex flex-col md:flex-row items-center justify-center gap-7">
          {/* ... (rest of your JSX) ... */}
          <div>
            <img 
                src={`${API_URL}/uploads/${item.product_image1}`} 
                alt={item.product_name} 
                className='w-[90%] md:w-[17rem] h-[23rem] rounded-3xl object-cover'
            />
          </div>

          <div className='w-full md:w-[50%] flex flex-col gap-2'>
              <h1 className='font-extrabold text-4xl'>{item.product_name}</h1>
              <p className='w-[100%] md:w-[70%]'>{item.product_description}</p>
              <p>⭐⭐⭐⭐⭐</p>
              <p className='bg-amber-500 w-fit rounded-2xl' style={{ padding: '4px 20px' }}>
                  Free shipping
              </p>
              <strike><h1 className='font-bold text-gray'>{item.product_oldprice}</h1></strike>
              <div>
                  <h1 className='font-black text-3xl text-amber-900'>
                      {(item.product_newprice * count).toLocaleString()} RWF
                  </h1>
              </div>
              <div className="flex items-center border rounded-full px-3 py-1 w-34 justify-between" style={{ padding: '5px 10px' }}>
                  <button onClick={decrement} className="text-xl ">−</button>
                  <span>{count}</span>
                  <button onClick={increment} className="text-xl">+</button>
              </div>
              <div className='flex flex-wrap gap-2'>
                  <button 
                      onClick={() => handleAddToCart(item.product_id)} 
                      className='bg-amber-300 rounded-3xl font-medium' 
                      style={{ padding: '7px 20px' }}
                      disabled={isAdding}
                  >
                      {isAdding ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <button 
                      className='bg-amber-500 rounded-3xl font-medium' 
                      style={{ padding: '7px 20px' }}
                  >
                      Buy Now
                  </button>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Itemoverview;