    import React, { useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { food_list } from '../../assets/try/assets'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo.jpg'
import Account from '../../components/Account/Account';
import tools from '../../assets/hero/tools.jpg'

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // fetching categories
  const[categories, setCategories] = useState([])
  useEffect(() => {
    // Fetch categories from backend
    fetch("https://einstein-plumbers1.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // fetching products
  const[products, setProducts] = useState([])
  useEffect (()=>{
        fetch("https://einstein-plumbers1.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  })

      const [openaccount, setOpenaccount] = useState(false);
        function notification() {
    return (
      <div className="done-notification absolute bottom-[10%] fixed  right-0 flex justify-center items-center gap-2   rounded-lg shadow-lg z-10"
      style={{ padding: "10px 20px" }}>
        <i className="fa-regular fa-circle-check text-white"></i>
       <h1 className="text-yellow-500">
  Congratulations! Your account is ready. <br /> You can now log in and start exploring.
</h1>

      </div>
    );
  }
      function fillallfields() {
    return (
      <div className="fillallfields-notification absolute fixed bottom-[10%]  right-0 flex justify-center items-center gap-2 bg-red-600  rounded-lg shadow-lg z-10"
      style={{ padding: "10px 20px", animation: "identifier 1.4s ease-in-out forwards" }}>
        <i className="fa-regular fa-circle-check text-white"></i>
        <h1 className="text-yellow">Oops! It looks like you missed some <br /> fields. Please fill them all in.</h1>
      </div>
    );
  }
  // ------------------click category filtering-----------------
  return (
    <div>
       {openaccount && (
  <Account onClose={() => setOpenaccount(false)} />
)}

<div style={{padding:'10px'}}>
      <div className='flex justify-around items-center border-gray-300 border'>
        <div>
            <Link to={`/`}>
            <img src={logo} alt="logo" className='w-[5rem]'/>
            </Link>
        </div>
        <div>
            <ul className='gap-5 cursor-pointer hidden md:flex'>
                <li>Home</li>
                <li>About</li>
                <Link to={`/services`}>
                <li>Service</li>
                </Link>
                <Link to={`/contactus`}>
                <li>Contact</li>
                </Link>
                <Link to={`/shop`}>
                <li>Shop</li>
                </Link>
            </ul>
        </div>
        <div className='flex items-center gap-3'>
            <Link to={`/cart`}>
            <i className="fa-solid fa-cart-arrow-down text-[20px]"></i>
            </Link>
            <button className=' rounded-[20px] border text-[#000000] cursor-pointer' style={{padding:'5px 12px'}}
            onClick={()=> setOpenaccount(true)}
            >Sign in</button>
            {/* <i className="fa-solid fa-user text-2xl"></i> */}
        </div>
    </div>
</div>
<div
  style={{
    width: '100%',
    height: '80vh',
    backgroundImage: `url(${tools})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative', // needed for overlay positioning
  }}
>
  {/* Dark overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
      zIndex: 1,
    }}
  ></div>

  {/* Content */}
  <h1 className='shop-overlay text-5xl'
    style={{
      position: 'relative', // stay above the overlay
      zIndex: 2,
      color: 'white',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
      fontWeight: 'bold',
    }}
  >
    Find the Perfect Plumbing Solutions for Every Job <br /> <span className='text-[#0077be]'>EINSTEIN PLUMBER ltd</span>
  </h1>
</div><br />

    <div className="category-products">
      <h1 className='brands text-center text-2xl'>Browse By Brands on <br /><span className='text-[#0077be]'>EINSTEIN PLUMBERS</span> Shop</h1><br />
      <div className='flex flex-wrap gap-2 items-center justify-center'>

 {categories.map((onecategory) => (
  <div
    key={onecategory.category_id}
    className="category-item w-fit shadow rounded-[7px]"
    style={{ padding: "5px", cursor: "pointer" }}
    onClick={() => setSelectedCategory(onecategory.category_name)}
  >
    <img
      src={`https://einstein-plumbers1.onrender.com/uploads/${onecategory.category_image}`}
      alt={onecategory.category_name}
      className="w-[4rem]"
    />
    <p className="text-center font-semibold text-[15px]">{onecategory.category_name}</p>
  </div>
))}

      </div>

    </div>
       
        <div style={{ padding: "40px" }} >
          <h1 className='text-center shop-heading text-4xl'>Find The Best Deal For <br /> You as a <span className='text-[#0077be]'>Plumber</span></h1><br />

        <div className='grid md:grid-cols-4 gap-6 '>
        {products.map((product, index) => (
            <Link to={`/itemoverview/${product.product_id}`} key={product.product_id}>
            {/* // <Link key={index} to={`/itemoverview/${item.id}`}> */}
        <div key={index} >
            <img
             src={`https://einstein-plumbers1.onrender.com/uploads/${product.product_image1}`}
             alt={product.product_name}
            className='w-full object-cover rounded-tl-[20px] rounded-tr-[20px] h-[15rem]'
            /><br/>
            <div className='shadow-md rounded-bl-[10px] rounded-br-[10px]'
            style={{paddingLeft:'20px'}}>
            <h2 className='font-bold'>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <p className='font-black text-2xl text-amber-700'>{product.product_newprice} RWF</p><br />
            </div>
        </div>
                 </Link> 
        ))}

        </div>
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Shop