import React from 'react'
import logo from '../../assets/logo/logo.jpg'
import { Link } from 'react-router-dom';

function Footer() {
  const date = new Date();
const year = date.getFullYear();
  return (
    <div>

    <div className='flex justify-around flex-wrap'>
        <div >
            <div className='flex'>
                <img src={logo} alt="logo on footer" className='w-[4rem]'/>
                <h1 className='font-black text-[20px]'>Einstein Ltd</h1>
            </div><br />
            <p className=''>Lorem ipsum dolor sit amet,  <br /> consectetur adipisicing elit.  <br />In dolores, nihil ex expedita </p><br />
            <div className=' flex justify-evenly text-[#0077be]'>
                <i className="fa-brands fa-facebook-f border rounded-[7px]" style={{padding:'5px 9px'}}></i>
                <i className="fa-brands fa-twitter border rounded-[7px]" style={{padding:'5px 9px'}}></i>
                <i className="fa-brands fa-instagram border rounded-[7px]" style={{padding:'5px 9px'}}></i>
                <i className="fa-brands fa-linkedin-in border rounded-[7px]" style={{padding:'5px 9px'}}></i>
                <i className="fa-brands fa-youtube border rounded-[7px]" style={{padding:'5px 9px'}}></i>

            </div>
        </div>
        <div >
            <h3 className='font-bold'>Menu</h3><br />
            <ul>
                <Link to={`/`}>
                <li>Home</li>
                </Link>
                <li>About</li>
                <Link to={`/services`}>
                <li>Services</li>
                </Link>
                <Link to={`/contactus`}>
                <li>Contact</li>
                </Link>
                <Link to={`/shop`}>
                <li>Shop</li>
                </Link>
            </ul>
        </div>
        <div >
            <h3 className='font-bold'>Address</h3><br />
            <ul>
                <li>+250 782 171 515</li>
                <li>+250 782 171 515</li>
                <li>KG 33 Avenue</li>
                <li>Copcom Business Center</li>
                <li>Door No. CR046</li>
            </ul>
        </div>
        <div className='flex flex-col'>
            <h3 className='font-bold'>Subscribe to our newsletter</h3><br />
            <input type="email"
            placeholder='Enter Your email' 
            className='border h-[2.7rem] rounded-[12px]'
            style={{paddingLeft:'5px'}}
            />
            <button className='bg-[#0077be] text-[white] rounded-[10px]' style={{marginTop:'2rem', padding:'10px 20px'}}>Subscribe</button>
        </div>
    </div><br />
    <hr />
    <footer className='text-center'>
        Copyright &copy; {year} Einstein Ltd | Designed by <span className='text-[#0077be] font-bold'>SEMANA</span> - Powered by  <span className='text-[#0077be] font-bold'>SEMANA</span>
    </footer>
            </div>
  )
}

export default Footer