import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo/logo.jpg'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-around items-center '>
        <div>
            <img src={logo} alt="logo" className='w-[5rem]'/>
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
            <button className=' rounded-[20px] bg-[green] text-[white] cursor-pointer' style={{padding:'5px 12px'}}>Book a call</button>
            <i className="fa-solid fa-cart-arrow-down text-[20px]"></i>
            <i className="fa-solid fa-user text-2xl"></i>
        </div>
    </div>
  )
}

export default Navbar