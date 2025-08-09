    import React, { useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { food_list } from '../../assets/try/assets'
import { Link } from 'react-router-dom'

function Shop() {
    const [categories, setCategories] = useState([]);
      useEffect(() => {
        fetch('http://localhost:5000/api/categories')
        // fetch('https://new-movie-app.onrender.com/api/admin/users')
          .then(res => res.json())
          .then(data => setCategories(data))
          .catch(err => console.error('Error fetching users:', err));
      }, []);
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className='flex gap-6 justify-center items-center text-center overflow-x-scroll scrollbar-hidden flex-nowrap'>
            {categories.map((category) => (
                <div key={category.id} className="text-center   flex-shrink-0">
                <img 
                src={`http://localhost:5000${category.category_icon}`} 
                alt={category.category_name} 
                className='rounded-full w-[4rem] h-[4rem] object-cover m-4' 
                />

                <p className='text-[13px]  w-[10px]'>{category.category_name}</p>
                    </div>
            ))}
        </div>
        <div style={{ padding: "40px" }}>

        <div className='grid md:grid-cols-4 gap-6 '>
        {food_list.map((item, index) => (
            <Link to={`/itemoverview/${item._id}`} key={item._id}>
            {/* // <Link key={index} to={`/itemoverview/${item.id}`}> */}
        <div key={index} >
            <img src={item.image} alt={item.name}
            className='w-full object-cover rounded-tl-[20px] rounded-tr-[20px] h-[15rem]'
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