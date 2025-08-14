import React, {useEffect, useState} from 'react'
import './Adminpage.css'
import { Link } from 'react-router-dom'
import logo  from '../../assets/logo/logo.jpg'
import Uploadproducts from '../../components/Upload/Uploadproducts'
import Tables from '../../components/tables/Tables'
import Producttable from '../../components/proucttable/Producttable'

function Adminpage() {
    const [activetab, setActivetab] = useState("dashboard")


//   fetching for contact us
    const [contactUsMessages, setContactUsMessages] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/contactus')
        .then(res => res.json())
        .then(data => setContactUsMessages(data))
        .catch(err => console.error('Error fetching contact us messages:', err));
    }, []);
//   fetching news letter
    const [newsLetterSubscribers, setNewsLetterSubscribers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/subscribe')
        .then(res => res.json())  
        .then(data => setNewsLetterSubscribers(data))
        .catch(err => console.error('Error fetching news letter subscribers:', err));
    }, []);

    // for categories
   
 


  return (
    <div>
        <nav className='flex items-center justify-between bg-amber-600 '>
            <div>
                <img src={logo} alt="camapany logo"className='w-[6rem]' />
            </div>
                <ul className='gap-5 cursor-pointer hidden md:flex'>
                    <li onClick={()=>setActivetab("dashboard")}>Dashboard</li>
                    <li onClick={()=>setActivetab("users")}>Accounts</li>
                    <li onClick={()=>setActivetab("product")}>Products</li>
                    <li onClick={()=>setActivetab("carts")}>carts</li>
                    <li onClick={()=>setActivetab("upload")}>Upload</li>
                    <li onClick={()=>setActivetab("hired us")}>Hired us</li>
                    <li onClick={()=>setActivetab("contacted us")}>contacted us</li>
                    <li onClick={()=>setActivetab("news letter")}>News Letter</li>
                </ul>
  
            <div>
                <Link to={`/`}>
                <button className='bg-amber-400 rounded-2xl'
                style={{padding:'5px 12px'}}>
                Back Home</button>
                    </Link>

            </div>
        </nav><br /><br />
        {/* admin dashboard */}
            {/* by defaoult this is the admin Dashboard */}
            {activetab === 'dashboard' && (
            <div >
                <div className=" flex flex-wrap justify-around gap-4">
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>

                        <div className=" bg-[rgba(52,152,219,0.1)] text-[#3498db] rounded-[8px]"style={{padding:'10px'}}>
                        <i className="fas fa-film"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>2,584</h3>
                        <p className='text-[#777] text-[14px]'>Total products</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className="bg-[rgba(46,204,113,0.1)] text-[#2ecc71] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>18,249</h3>
                        <p className='text-[#777] text-[14px]'>Total Users</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className="bg-[rgba(231,76,60,0.1)] text-[#f39c12] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-star"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>48,362</h3>
                        <p className='text-[#777] text-[14px]'>Total Reviews</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className=" bg-[#e74c3c] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>$52,489</h3>
                        <p className='text-[#777] text-[14px]'>Monthly Revenue</p>
                        </div>
                    </div>
                    </div><br /><br />
 

            </div>
            )}
        {/* fetching users */}
        {activetab === 'users' && (
            <Tables/>
        )}
        {/* fetching products */}
        {activetab === 'product' && (
            <Producttable/>
        )}
        {/* add products */}
        {activetab === 'upload' && (
            <Uploadproducts/>
        )}
          {/* fetching contact us messages */}
          {activetab === 'contacted us' && (

          <div>
            <h2 className='text-center text-2xl font-bold'>Contact Us Messages</h2>
            <table className='recent-table w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th>Name</th>
                        <th>Sended_at</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through contact us messages here */}
                    {/* Example row */}
                    {contactUsMessages.map(message => (
                        <tr key={message.id}>
                            <td>{message.id}</td>
                            <td>{new Date(message.sended_at).toLocaleString()}</td>
                            <td>{message.name}</td>
                            <td>{message.phone_number}</td>
                            <td>{message.email}</td>
                            <td>{message.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          )}
          {/* fetching news letter subscribers */}
          {activetab === 'news letter' && (
          <div>
            <h2 className='text-center text-2xl font-bold'>News Letter Subscribers</h2>
            <table className='recent-table w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th>Email</th>
                        <th>Subscribed At</th>
                    </tr>
                </thead>
                <tbody>
                    {newsLetterSubscribers.map(subscriber => (
                        <tr key={subscriber.id}>
                            <td>{subscriber.id}</td>
                            <td>{subscriber.email}</td>
                            <td>{new Date(subscriber.sended_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          )}
            
    </div>
  )
}


export default Adminpage;