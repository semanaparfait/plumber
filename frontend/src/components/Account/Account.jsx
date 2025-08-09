import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Account() {
  const [action, setAction] = useState("Sign up")
  const [username, setUsername] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(true); // 👈 Modal visibility
    const navigate = useNavigate();

  if (!showModal) return null; // Hide modal if false
        const submitform = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ username, phonenumber, password });

  if (action === "Sign up") {
    // Call backend signup API
    try {
       const response = await fetch('http://localhost:5000/api/signup', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phonenumber, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Optionally reset form fields here
        setUsername('');
        setPhonenumber('');
        setPassword('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  } else if (action === "Log in") {
    // Call backend login API
    try {
      const response = await fetch('http://localhost:5000/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
        body: JSON.stringify({ phonenumber, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
          if (data.is_admin === true) {
        navigate("/admin"); // Navigate to admin page
    } else {
        navigate("/"); // Navigate to home page
    }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  }
};
    
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black/20 '>

    <div className='inset-0 h-screen relative'>

        <form onSubmit={submitform}>
    <div className='flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[27%]'
    style={{padding:'40px 1px'}}>
        <i className="fa-solid fa-xmark absolute top-[7%] right-[8%] border rounded-full "
        style={{padding:'3px 5px'}}
        onClick={() => setShowModal(false)} // 👈 Close modal
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
        <input type="number"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
        placeholder='Your Phone number'
        className=' border-2 rounded-[9px] outline-none h-[2rem] border-gray-400' 
        style={{padding:'10px 10px'}}/>
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