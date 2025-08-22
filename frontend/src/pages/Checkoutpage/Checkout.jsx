import React,{useState, useEffect} from 'react'
// import mtn from '../../assets/checkout/mtn.jpeg'
import { useLocation, useNavigate, Link } from "react-router-dom";
import Invoice from '../Invoice/Invoice';
import check from '../../assets/checkout/check.jpg'




function Checkout(props) {

    // this stores the user who logged in
    const [loggedinuser, setLoggedinuser] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const[deliverypickup,setDelivetypickup]=useState("delivery")
    const [selected, setSelected] = useState("delivery");
const location = useLocation();
  const navigate = useNavigate();

  const { cartItems = [], username = "Guest" } = location.state || {};
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://einstein-plumbers1.onrender.com";

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.product_newprice) * Number(item.quantity),
    0
  );
  useEffect(() => {
  fetch(`${API_URL}/api/me`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => setLoggedinuser(data))
    .catch(err => console.error(err));
}, []);


const handlePlaceOrder = async () => {
  if (!loggedinuser?.id) {
    alert("Your session is not ready yet. Please wait a moment.");
    return;
  }

  if (cartItems.length === 0) {
    alert("No items to order!");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/api/orders/checkout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedinuser.id,  // guaranteed to exist
        fullName: fullname,
        email,
        phone: phonenumber,
        country,
        province,
        district,
        sector,
        cell,
        village,
        street: streetnickname,
        deliveryFee: deliveryprice,
        deliveryMethod: selected
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Checkout failed");
    }

    setOrderId(data.orderId);
    setStep(3);
    // navigate("/orders");
  } catch (err) {
    console.error("Checkout error:", err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};





//   fetching the user who wants to buy
// checkout input handles
const [step, setStep] = useState(1);

const[fullname, setFullname] = useState("")
const[email,setEmail] =  useState("")
const[phonenumber,SetPhonenumber] = useState("")
const[country,setCountry] = useState("")
const[province,setProvince] = useState("")
const[district,setDistrict] = useState("")
const[sector,setSector] = useState("")
const[cell,setCell] = useState("")
const[village,setVillage] = useState("")
const[streetnickname,setStreetnickname] = useState("")
// -----------------errors-----------------
const [errors, setErrors] = useState({});
const [deliveryprice,setDelivery] = useState(5000)
useEffect(() => {
  // If user chooses pickup, delivery is free
  setDelivery(selected === "pickup" ? 0 : 5000);
}, [selected]);
const finalTotal = totalPrice + deliveryprice;


const handleConfirmOrder = () => {
  let newErrors = {};

  if (!fullname) newErrors.fullname = "Full names are needed";
  if (!email) newErrors.email = "Email is required";
  if (!phonenumber) newErrors.phonenumber = "Phone number is required";
  if (!country) newErrors.country = "Country is reqires"
  if (!province) newErrors.province = "province is reqires"
  if (!district) newErrors.district = "district is reqires"
  if (!sector) newErrors.sector = "sector is reqires"
  if (!cell) newErrors.cell = "cell is reqires"
  if (!village) newErrors.village = "village is reqires"
  if (!streetnickname) newErrors.streetnickname = "streetnickname is reqires"


  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return; // stop if errors exist

  setStep(2);
};


  // pay -> go to step 3


  return (
    <div style={{padding:'5px 15px'}}>
        <h1 style={{paddingLeft:'30px'}}>Hello , {username}</h1>
        <Link to={`/cart`}>
        <p className='text-[#0077be]'><i className="fa-solid fa-arrow-left"></i> Back to cart</p><br />
        </Link>

      <div className="relative flex flex-col items-center justify-center w-full">
        {/* Steps wrapper */}
        <div className="relative flex justify-center items-center gap-20">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-300 z-0"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white z-10">
    <p
      className={`w-6 h-6 rounded-full flex items-center justify-center 
      ${step >= 1 ? "bg-[#0077be] text-white" : "bg-gray-300 text-black"}`}
    >
      1</p>
            <span className="mt-2 text-sm">Checkout</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white z-10">
    <p
      className={`w-6 h-6 rounded-full flex items-center justify-center 
      ${step >= 2 ? "bg-[#0077be] text-white" : "bg-gray-300 text-black"}`}
    >
      2
    </p>
            <span className="mt-2 text-sm">Pay</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white z-10">
    <p
      className={`w-6 h-6 rounded-full flex items-center justify-center 
      ${step === 3 ? "bg-[#0077be] text-white" : "bg-gray-300 text-black"}`}
    >
      ✔
    </p>
            <span className="mt-2 text-sm">Receipt</span>
          </div>
        </div>
      </div>

        <div className='flex flex-wrap items-center justify-evenly gap-3.5'>
          {/* on step one fill the shipping address details */}
          {step === 1 && (
        <div className='w-full md:w-[40%] '>
            <div >
            <div>
            <div className="rounded-xl shadow-2xl bg-white " style={{padding:'30px'}}>
            <h1 className="font-bold text-lg mb-4">Customer Information</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                <label htmlFor="names" className="font-semibold mb-1">
                    Full Names *
                </label>
                <input
                    type="text"
                    name="names"
                    value={fullname}
                    onChange={(e)=>setFullname(e.target.value)}
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                />
                {errors.fullname && (
                  <p className="text-red-600 text-sm mb-3">{errors.fullname}</p>
                )}
                </div>

                <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1 flex flex-col mb-2 md:mb-0">
                    <label htmlFor="email" className="font-semibold mb-1">
                    Email Address *
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                {errors.email && (
                  <p className="text-red-600 text-sm mb-3">{errors.email}</p>
                )}
                </div>
                <div className="flex-1 flex flex-col">
                    <label htmlFor="phonenumber" className="font-semibold mb-1">
                    Phone Number *
                    </label>
                    <input
                    type="tel"
                    value={phonenumber}
                    onChange={(e)=>SetPhonenumber(e.target.value)}
                    placeholder="+250 78X XXX XXX / +250 79X XXX XXX"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                  {errors.phonenumber && (
                  <p className="text-red-600 text-sm mb-3">{errors.phonenumber}</p>
                )}
                </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1 flex flex-col mb-2 md:mb-0">
                    <label htmlFor="country" className="font-semibold mb-1">
                    Country *
                    </label>
                    <input
                    type="text"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                    name="country"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                    {errors.country && (
                  <p className="text-red-600 text-sm mb-3">{errors.country}</p>
                )}
                </div>
                <div className="flex-1 flex flex-col">
                    <label htmlFor="province" className="font-semibold mb-1">
                    Province *
                    </label>
                    <input
                    type="text"
                    value={province}
                    onChange={(e)=>setProvince(e.target.value)}
                    name="province"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                  {errors.province && (
                  <p className="text-red-600 text-sm mb-3">{errors.province}</p>
                )}
                </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1 flex flex-col mb-2 md:mb-0">
                    <label htmlFor="district" className="font-semibold mb-1">
                    District *
                    </label>
                    <input
                    type="text"
                    value={district}
                    onChange={(e)=>setDistrict(e.target.value)}
                    name="district"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                  {errors.district && (
                  <p className="text-red-600 text-sm mb-3">{errors.district}</p>
                )}
                </div>
                <div className="flex-1 flex flex-col">
                    <label htmlFor="sector" className="font-semibold mb-1">
                    Sector *
                    </label>
                    <input
                    type="text"
                    value={sector}
                    onChange={(e)=>setSector(e.target.value)}
                    name="sector"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                    {errors.sector && (
                  <p className="text-red-600 text-sm mb-3">{errors.sector}</p>
                )}
                </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1 flex flex-col mb-2 md:mb-0">
                    <label htmlFor="cell" className="font-semibold mb-1">
                    Cell *
                    </label>
                    <input
                    type="text"
                    value={cell}
                    onChange={(e)=>setCell(e.target.value)}
                    name="cell"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                    {errors.cell && (
                  <p className="text-red-600 text-sm mb-3">{errors.cell}</p>
                )}
                </div>
                <div className="flex-1 flex flex-col">
                    <label htmlFor="village" className="font-semibold mb-1">
                    Village *
                    </label>
                    <input
                    type="text"
                    value={village}
                    onChange={(e)=>setVillage(e.target.value)}
                    name="village"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                    />
                    {errors.village && (
                  <p className="text-red-600 text-sm mb-3">{errors.village}</p>
                )}
                </div>
                </div>

                <div className="flex flex-col">
                <label htmlFor="street" className="font-semibold mb-1">
                    Street Nickname
                </label>
                <input
                    type="text"
                    value={streetnickname}
                    onChange={(e)=>setStreetnickname(e.target.value)}
                    placeholder="eg: kwarubangura / kukinamba"
                    className="border rounded-md border-gray-400  w-full"
                    style={{padding:'4px 10px'}}
                />
                  {errors.streetnickname && (
                  <p className="text-red-600 text-sm mb-3">{errors.streetnickname}</p>
                )}
                </div>
            </form>
            </div>

            </div>

        </div><br />
        <div className="flex flex-col gap-2 w-full">
            <h2 className="font-bold text-[17px]">Delivery method</h2>

            {/* Home / Site Delivery */}
            <div
                onClick={() => setSelected("delivery")}
                className={`border rounded-[10px] flex items-center justify-between p-4 cursor-pointer ${
                selected === "delivery" ? "border-blue-600 bg-blue-50" : "border-gray-500"
                }`}
                style={{padding:'10px 20px'}}
            >
                <div>
                <h2 className="font-bold">Home / Site delivery</h2>
                <p>Get your tools delivered to your address</p>
                </div>
                <h2 className="text-blue-800 font-bold">{deliveryprice} RWF</h2>
            </div>

            {/* Store Pickup */}
            <div
                onClick={() => setSelected("pickup")}
                className={`border rounded-[10px] flex items-center justify-between p-4 cursor-pointer ${
                selected === "pickup" ? "border-green-600 bg-green-50" : "border-gray-500"
                }`}
                style={{padding:'10px 20px'}}
            >
                <div>
                <h2 className="font-bold">Store Pickup</h2>
                <p>Pick up from our store in Kigali</p>
                </div>
                <h2 className="text-green-600 font-bold">FREE</h2>
            </div>
            </div>
            {/* ---------------for pick it up ------------- */}
        {selected === "pickup" && (
            <div>
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold"></span> EINSTEIN GROUP Ltd</p>
            <p><span className="font-semibold">Location:</span> KN 3 Rd, Near Kigali City Tower</p>
            <p><span className="font-semibold">Opening Hours:</span> Mon - Sat, 8:00 AM - 7:00 PM</p>
            <p><span className="font-semibold">Contact:</span> +250 788 123 456</p>
          </div>
          <div>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1771.0241351126176!2d30.080213922644408!3d-1.9826346604764145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6108d6db08d%3A0xbfc486d1fb045285!2sKK%20567%20St%2C%20Kigali!5e1!3m2!1sen!2srw!4v1752690422812!5m2!1sen!2srw"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow"
          ></iframe>
          </div>
            </div>
        )}
        <div className='flex flex-col gap-1.5'><br />
            <h2 className='font-bold text-[17px]'>Payment methos</h2>
                <img src='https://i.pinimg.com/736x/7f/eb/02/7feb0256dc66ee941c1a5d4c945ed60b.jpg' alt="payment methos" className='w-[4rem] rounded-[10px]' />
            
        </div>
        </div>
          )}
        {/* ---------------------step 2 after filling all addresses--------- */}
        {step === 2 && (
        <div className='w-full md:w-1/3'>
          <h2 className='font-bold text-[17px]'>Customer Information</h2><br />
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1.5'>
            <p className='font-bold'>Full Names:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{fullname}</h1>
          </div>
                    <div>
            <p className='font-bold'>Email Addres:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{email}</h1>
          </div>
                    <div>
            <p className='font-bold'>Phone Number:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>+25{phonenumber}</h1>
          </div>
                    <div>
            <p className='font-bold'>Country:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{country}</h1>
          </div>
                    <div>
            <p className='font-bold'>Province : </p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{province}</h1>
          </div>
                    <div>
            <p className='font-bold'>District :</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{district}</h1>
          </div>
                    <div>
            <p className='font-bold'>Sector:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{sector}</h1>
          </div>
                    <div>
            <p className='font-bold'>Cell:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{cell}</h1>
          </div>
                    <div>
            <p className='font-bold'>Street Nickname:</p>
            <h1 className="border rounded-md border-gray-400  w-full font-semibold" style={{padding:'2px 10px'}}>{streetnickname}</h1>
          </div>


        </div><br />
        <h2 className='font-bold text-[17px]'>Delivery Method</h2>
                        <div className='flex flex-col gap-1.5'>
                <img src='https://i.pinimg.com/736x/78/1e/2c/781e2cdb91d16efbfe31b7b9a3202304.jpg' alt="delivery method methos" className='w-[7rem] rounded-[10px]' />
            
        </div>

            <h2 className='font-bold text-[17px]'>Payment methos</h2>
                <div className='flex flex-col gap-1.5'>
                <img src='https://i.pinimg.com/736x/7f/eb/02/7feb0256dc66ee941c1a5d4c945ed60b.jpg' alt="payment methos" className='w-[4rem] rounded-[10px]' />
            
        </div>
        </div>
        )}
              {/* Step 3: Receipt */}
        {/* {step === 3 && (
          
          <Invoice
            customer={{
              fullname,
              email,
              phone: phonenumber,
              country,
              province,
              district,
              sector,
              cell,
              village,
              street: streetnickname
            }}
            items={cartItems}
            deliveryMethod={selected}
            deliveryFee={deliveryprice}
            total={totalPrice}
            grandTotal={finalTotal}
            orderId={orderId}
            date={new Date().toLocaleDateString()}
          />
        )} */}
{step === 3 && (
  <div className='text-center flex flex-col items-center justify-center gap-3'>
    <h1 className='font-semibold text-2xl'>Success!</h1>
    <p>Your order has been placed successfully. You can download your invoice below.</p>
    <img src={check} alt="checked icon" className='w-[20rem]' /><br />

    <Invoice
      customer={{
        fullname,
        email,
        phonenumber,
        country,
        province,
        district,
        sector,
        cell,
        village,
        street: streetnickname,
      }}
      items={cartItems}
      orderId={orderId}
      date={new Date().toLocaleDateString()}
      total={totalPrice}
      grandTotal={finalTotal}
      API_URL={API_URL}
    />
  </div>
)}



        {/* ------------payments and carts--------------- */}
        {/* { step === 3 && (
        )} */}
        {step !== 3 && (

        <div className='w-full  md:w-[45%] '>
            <div className='shadow-2xl rounded-[10px]'style={{padding:'30px'}}>
                <h1 className='font-bold'>Order Summary</h1><br />
                <div className='flex flex-wrap gap-2.5'>
                {cartItems.map((item) => (
                    <div key={item.cart_id} className='flex gap-5 mb-3'>
                    <div>
                        <img src={`${API_URL}/uploads/${item.product_image1}`} alt={item.product_name} className='w-[4rem] rounded-[10px]' 
                        loading='lazy'/>
                    </div>
                    <div>
                        <h2 className='font-bold'>{item.product_name}</h2>
                        <p>Qty: {item.quantity}</p>
                        <p className='text-[#0077be] font-bold'>
                        {(Number(item.product_newprice) * Number(item.quantity)).toLocaleString()} RWF
                        </p>
                    </div>
                    </div>
                ))}
                </div>

            <br /><hr /><br />
            <div>
                {/* ------subtotal-------- */}
                <div className='flex items-center justify-between'>
                    <p>Subtotal</p>
                    <p className='font-bold'>{totalPrice.toLocaleString()} RWF</p>
                </div><br />
                {/* -----------for delivery----------------- */}
                <div className='flex items-center justify-between'>
                    <p>Delivery</p>
                    <p className='font-bold '>{deliveryprice === 0 ? "FREE" : deliveryprice.toLocaleString() + " RWF"}</p>
                </div>
            </div><br /><hr /><br />
            {/* --------------total-------------- */}
            <div className='flex items-center justify-between'>
                <p className='font-bold'>Total</p>
                <p className='font-bold text-[#0077b3]'>{finalTotal.toLocaleString()} RWF</p>

            </div>
            </div><br />
            <div className='shadow-2xl rounded-[10px]'style={{padding:'30px'}}>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6" style={{padding:'6px'}}>
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{padding:'5px'}}>
                    MTN
                  </div>
                  <span className="text-orange-800 font-medium" style={{padding:'5px'}}>MTN Mobile Money - Rwanda</span>
                </div>
                <p className="text-orange-700 text-sm mt-2">
                  Secure payment powered by MTN Mobile Money
                </p>
              </div><br />
              {step == 1 && (

              <div className='text-center'>
                <button onClick={handleConfirmOrder} className='font-semibold bg-[#0077be] text-amber-50 rounded-[6px]'style={{padding:'7px'}}>Confirm Order</button>
              </div>
              )}
              {step === 2 && (

          <form className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="phonenumber" className='font-semibold'>Phone Number *</label>
              <input type="number" placeholder='+250 78X XXX XXX / +250 79X XXX XXX' className='border rounded-[7px] border-gray-500' style={{padding:'7px 10px'}}/>
            </div>
            <button onClick={handlePlaceOrder} type= "button" className='font-semibold bg-[#0077be] text-amber-50 rounded-[6px]' style={{padding:'7px'}}>
              Pay Now - {totalPrice.toLocaleString()} - via MTN
            </button>
          </form>

              )}
            </div><br />
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4" style={{padding:'10px'}}>
                <h1>Secure Checkout</h1>
                <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• SSL encrypted payment</li>
                    <li>• MTN Mobile Money secured</li>
                    <li>• 30-day return policy</li>
                    <li>• 24/7</li>
                </ul>
            </div><br />

        </div>
        )}
        </div>
    </div>
  )
}

export default Checkout