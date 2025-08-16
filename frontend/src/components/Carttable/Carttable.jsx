import React,{useState,useEffect} from 'react'

function Carttable() {
        const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://einstein-plumbers1.onrender.com";
    const[cartdetail,setCartdetail] = useState([])
    useEffect(()=>{
        fetch(`${API_URL}/api/admin/cart-details`,{
            method: "GET",
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data=>setCartdetail(data))
        .catch(err=>console.error('erro fetching cart details:',err))

    },[])
  return (
    <div>
        <div className='flex items-center justify-center gap-8'>
            <h1 className='font-bold text-orange'>Pending</h1>
            <h1 className='font-bold text-green'>payed</h1>
        </div>
        {/* --------pending cats in table----------- */}
                 <div className='overflow-x-auto'>
            <h2 className='text-center text-2xl font-bold'>Pending carts</h2>
            <table className='recent-table w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th>cart_id</th>
                        <th>user_id</th>
                        <th>username</th>
                        <th>phonenumber</th>
                        <th>pro_id</th>
                        <th>pro_image</th>
                        <th>pro_name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>created_at</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {cartdetail.map(cart => (
                        <tr key={cart.cart_id}>
                            <td>{cart.cart_id}</td>
                            <td>{cart.user_id}</td>
                            <td>{cart.username}</td>
                            <td>{cart.phonenumber}</td>
                            <td>{cart.product_id}</td>
                                                    <td>
                           <img
                            src={`${API_URL}/uploads/${cart.product_image1}`}
                            className='w-10'
                            alt={cart.product_name}
                            />

                        </td>
                            <td>{cart.product_name}</td>
                            <td>{cart.quantity}</td>
                            <td>{cart.product_newprice} RWF</td>
                            <td>{new Date(cart.created_at).toLocaleString()}</td>
                            <td className='font-bold text-orange-500'>{cart.cart_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    </div>
  )
}

export default Carttable