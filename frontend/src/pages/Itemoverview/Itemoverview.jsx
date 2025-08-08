import React from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import { food_list } from '../../assets/try/assets'


function Itemoverview() {
//     const {productid} = useParams();
//       let item = null;

//   for (const product of food_list) {
//     const found = product.food_list.find(m => m.productid === productid);
//     if (found) {
//       movie = found;
//       break;
//     }
//   }

//   if (!item) {
//     return <div>product  not found</div>;
//   }

  const { productid } = useParams();

  // Find product by id (or _id)
  const item = food_list.find(product => product._id === productid);

  if (!item) {
    return <div>Product not found</div>;
  }
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div style={{padding:'30px'}}>
        <div className='flex flex-wrap items-center justify-center gap-7'>
            <div >
                <img src={item.image} alt="item image" className='w-[90%] md:w-[17rem] h-[23rem] rounded-3xl object-cover'/>
            </div>
            <div className=' w-full md:w-[50%] flex flex-col gap-2'>
                <h1 className='font-extrabold text-4xl'>{item.name}</h1>
                <p className='w-[100%] md:w-[70%]'>{item.description}</p>
                <p>⭐⭐⭐⭐⭐</p>
                <p className='bg-amber-500 w-fit rounded-2xl'
                style={{padding:'4px 20px'}}
                >Free shipping</p>
                <div>
                    <h1 className='font-black text-3xl text-amber-900'>{item.price} RWF</h1>
                </div>
                <div className='flex flex-wrap gap-2 justify-center'>
                    <button className='bg-amber-300 w-1/3 rounded-3xl font-medium'
                    style={{padding:'7px 20px'}}>Add to Cart</button>
                    <button className='bg-amber-500 w-1/3 rounded-3xl font-medium'>Buy Now</button>
                </div>
            </div>
        </div>

        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Itemoverview