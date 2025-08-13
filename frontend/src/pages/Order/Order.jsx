import React from 'react'
import logo from '../../assets/logo/logo.jpg'
import { Link } from 'react-router-dom'

function Order() {
  return (
    <div>
            <div className='flex justify-around items-center '>
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
  )
}

export default Order