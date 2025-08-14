import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

function Itemoverview() {
  const { productid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);


  if (loading) return <p>Loading...</p>;

  const item = products.find(product => product.product_id === parseInt(productid));

  if (!item) return <p>Product not found</p>;

    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        if (count > 1) {    
            setCount(count - 1);
        }
    }

  // const handleAddToCart = (product) => {
  //   // your add to cart logic here
  //   console.log("Adding to cart:", product, "Quantity:", count);
  // };

// const handleAddToCart = async (productId) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include", // ✅ sends cookies
//       body: JSON.stringify({ product_id: productId, quantity: count  })
//     });

//     const data = await res.json();
//     console.log("Added to cart:", data);
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//   }
// };


const handleAddToCart = async (productId) => {
  try {
    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ product_id: productId, quantity: count }) // send selected quantity
    });

    const data = await res.json();
    console.log("Cart updated:", data);

    // Optionally, update frontend cart state if needed
  } catch (err) {
    console.error("Error updating cart:", err);
  }
};


  return (
    <div>
      <Navbar />

      <div style={{ padding: '30px' }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-7">
          {/* Product image */}
          <div>
            
        <img 
          src={`http://localhost:5000/uploads/${item.product_image1}`} 
          alt={item.product_name} 
          className='w-[90%] md:w-[17rem] h-[23rem] rounded-3xl object-cover'
        />
          </div>

          {/* Product details */}
          <div className='w-full md:w-[50%] flex flex-col gap-2'>
            <h1 className='font-extrabold text-4xl'>{item.product_name}</h1>
            <p className='w-[100%] md:w-[70%]'>{item.product_description}</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p className='bg-amber-500 w-fit rounded-2xl' style={{ padding: '4px 20px' }}>
              Free shipping
            </p>
            <h1>{item.product_oldprice}</h1>

            <div>
              <h1 className='font-black text-3xl text-amber-900'>
                 {(item.product_newprice * count).toLocaleString() } RWF
              </h1>
            </div>

            <div className="flex items-center border rounded-full px-3 py-1 w-34 justify-between" style={{ padding: '5px 10px' }}>

                <button onClick={decrement}  className="text-xl ">−</button>
                <span>{count}</span>
                <button onClick={increment} className="text-xl">+</button>
            </div>

            <div className='flex flex-wrap gap-2'>
              <button 
                onClick={() => handleAddToCart(item.product_id)} 
                className='bg-amber-300 rounded-3xl font-medium' 
                style={{ padding: '7px 20px' }}
              >
                <i className="fa-solid fa-cart-arrow-down"></i> Add to Cart
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
