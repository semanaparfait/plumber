import React, {useState} from 'react'
import './Navbar.css'
import logo from '../../assets/logo/logo.jpg'
import { Link } from 'react-router-dom'

function Navbar() {
    const [activetab, setActivetab] = useState('home');
  return (
    <div style={{padding:'10px '}}>

    <div className='flex justify-around items-center  border-gray-300 border'>
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
        <div className='flex items-center gap-2.5'>
            <button className=' rounded-[20px] bg-[#0077be] text-[white] cursor-pointer' style={{padding:'5px 12px'}}>Book a call</button>
            <Link to ={`/cart`}>
            <i className="fa-solid fa-cart-arrow-down text-[20px]"></i>
            </Link>
            <i className="fa-solid fa-user text-2xl"></i>
        </div>
    </div>
    </div>
  )
}

export default Navbar