import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Account({ onClose }) {
  
const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://einstein-plumbers1.onrender.com/api";

  const [action, setAction] = useState("Sign up")
  const [username, setUsername] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [password, setPassword] = useState("")
    // const [showModal, setShowModal] = useState(true); // 👈 Modal visibility
    const navigate = useNavigate();

  // if (!showModal) return null; // Hide modal if false
const submitform = async (e) => {
  e.preventDefault();

  const digits = phonenumber.replace(/\D/g, ""); // keep only digits

  // 🚨 Phone validation
  if (digits.length < 10 || digits.length > 12) {
    alert("Phone number must be between 10 and 12 digits.");
    return;
  }

  // 🚨 Password validation
  if (!password || password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (action === "Sign up") {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phonenumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setUsername("");
        setPhonenumber("");
        setPassword("");
      } else {
        // ✅ Show server-side errors (duplicate phone number, etc.)
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  }

  if (action === "Log in") {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phonenumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        if (data.is_admin === true) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  }
};

// -------phone number validation---------
  const isPhoneValid = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone.trim());
    
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black/20 z-50'>

    <div className='inset-0 h-screen relative'>

        <form onSubmit={submitform}>
    <div className='flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[27%]'
    style={{padding:'40px 1px'}}>
        <i className="fa-solid fa-xmark absolute top-[7%] right-[8%] border rounded-full "
        style={{padding:'3px 5px'}}
        onClick={onClose}
        // onClick={() => setShowModal(false)} // 👈 Close modal
        ></i>
        <h1 className='text-2xl font-bold'>{action}</h1>

        
          {action ==="Log in"? <div></div>:
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Your Name'
        className=' border-2 rounded-[9px] outline-none h-[2rem] border-gray-400' 
        style={{padding:'10px 10px'}}/>
        }
        {/* <input type="number"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
        placeholder='Your Phone number'
        className=' border-2 rounded-[9px] outline-none h-[2rem] border-gray-400' 
        style={{padding:'10px 10px'}}/> */}
<input
  type="tel"
  value={phonenumber}
  onChange={(e) => {
    let val = e.target.value.replace(/[^\d+]/g, ""); // allow only digits and +
    
    if (val.startsWith("+")) {
      // strip +, then limit digits to 12
      const digits = val.slice(1).replace(/\D/g, "").slice(0, 12);
      val = "+" + digits;
    } else {
      // no + → just digits max 12
      val = val.replace(/\D/g, "").slice(0, 12);
    }

    setPhonenumber(val);
  }}
  placeholder="+250788123456"
  className={`border-2 rounded-[9px] outline-none h-[2rem] border-gray-400 ${
    phonenumber && (phonenumber.replace(/\D/g, "").length < 10 || phonenumber.replace(/\D/g, "").length > 12)
      ? "border-red-500"
      : "border-gray-400"
  }`}
  style={{ padding: "10px 10px" }}
/>
{phonenumber && (phonenumber.replace(/\D/g, "").length < 10) && (
  <p className="text-red-600 text-sm mt-1">Phone number must be at least 10 digits.</p>
)}
{phonenumber && (phonenumber.replace(/\D/g, "").length > 12) && (
  <p className="text-red-600 text-sm mt-1">Phone number cannot exceed 12 digits.</p>
)}


        <input type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Your password'
        className=' border-2 rounded-[9px] outline-none h-[2rem] border-gray-400' 
        style={{padding:'10px 10px'}}/>
        <button type='submit' className='bg-amber-600 w-[60%]
        rounded-[9px] text-white font-bold'
         style={{padding:'6px 1px'}}>{action}</button>
          {action === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span className='text-blue-500 cursor-pointer' onClick={() => setAction("Log in")}>
                Log in
              </span>
            </p>
          ) : (
            <>
                        <p>
              
              <span className='text-amber-600 cursor-pointer' >
                Forgot password
              </span>
            </p>
            <p>
              Don't have an account?{" "}
              <span className='text-blue-500 cursor-pointer' onClick={() => setAction("Sign up")}>
                Sign up
              </span>
            </p>
            </>
          )}
    </div>
          </form>
    </div>
    </div>
  )
}

export default Account