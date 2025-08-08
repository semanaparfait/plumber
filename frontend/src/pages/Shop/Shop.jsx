import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { food_list } from '../../assets/try/assets'
import { Link } from 'react-router-dom'

function Shop() {
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div style={{ padding: "40px" }}>

        <div className='grid md:grid-cols-4 gap-4 '>
        {food_list.map((item, index) => (
            <Link to={`/itemoverview/${item._id}`} key={item._id}>
            {/* // <Link key={index} to={`/itemoverview/${item.id}`}> */}
        <div key={index} >
            <img src={item.image} alt={item.name}
            className='w-full object-cover rounded-tl-[20px] rounded-tr-[20px]'
            /><br/>
            <div className='shadow-md rounded-bl-[10px] rounded-br-[10px]'
            style={{paddingLeft:'20px'}}>
            <h2 className='font-bold'>{item.name}</h2>
            <p>{item.description}</p>
            <p className='font-black text-2xl text-amber-700'>{item.price} RWF</p><br />
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