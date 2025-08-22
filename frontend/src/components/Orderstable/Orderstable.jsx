import React,{useState,useEffect} from 'react'

function Orderstable() {
    const[selectedtable, setSelectedtable]= useState("order")
    const [orders,setOrders] = useState([])
    const [invoices,setInvoices] = useState([])
     const [selectedOrder, setSelectedOrder] = useState(null);
    const[ordeditems,setOrdeditems] = useState([])
        const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://einstein-plumbers1.onrender.com/api";

    useEffect(()=> {
        fetch(`${API_URL}/get/orders`,{
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error('error fetching in orders table', err))
    },[])
        useEffect(()=> {
        fetch(`${API_URL}/get/ordereditems`,{
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setOrdeditems(data))
        .catch(err => console.error('error fetching in orders table', err))
    },[])
    


  return (
    <div >
        <div className='flex justify-center gap-4 cursor-pointer'>
        <h1 className='font-bold text-[18px]' onClick={()=>setSelectedtable("order")}>Orders</h1>
        <h1 className='font-bold text-[18px]'onClick={()=>setSelectedtable("ordered items")}>Orderded items</h1>
        <h1 className='font-bold text-[18px]' onClick={()=>setSelectedtable("invoices")}>Invoices</h1>
        </div><br />
        {/* ----------------orders table----------- */}
        {selectedtable === 'order' && (

                <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
            <thead className='bg-gray-100'>
              <tr>
                <th>Order_Id</th>
                <th>Customer_id</th>
                <th>fullname</th>
                <th>email</th>
                <th>phonenumber</th>
                <th>country</th>
                <th>province</th>
                <th>District</th>
                <th>Sector</th>
                <th>Cell</th>
                <th>Village</th>
                <th>Street </th>
                <th>Sub_total</th>
                <th>deliveryFee</th>
                <th>Total_amount</th>
                <th>Order status</th>
                <th>Created_at</th>
                <th>Updated_at</th>
              </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.full_name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone_number}</td>
                  <td>{order.country}</td>
                  <td>{order.province}</td>
                  <td>{order.district}</td>
                  <td>{order.sector}</td>
                  <td>{order.cell}</td>
                  <td>{order.village}</td>
                  <td>{order.street}</td>
                  <td>{order.subtotal}</td>
                  <td>{order.delivery_fee}</td>
                  <td>{order.total_amount}</td>
                  <td className='font-semibold text-green-500'>{order.order_status}</td>
                  <td>{order.created_at}</td>
                  <td>{order.updated_at}</td>
                  <td>
                    <select
                      className='border text-center'
                    >
                      <option value="">status</option>
                      <option value="delived">Delived</option>
                      <option value="Waiting">Waiting</option>
                    </select>
                  </td>
                  <td className='text-red-600'>
                    <i className="fa-solid fa-trash" ></i>
                  </td>
                </tr>
                ))}

            </tbody>
          </table>
        </div>
        )}
        {/* ----------------orded items table------------- */}
        {selectedtable === 'ordered items' && (
            <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
            <thead className='bg-gray-100'>
              <tr>
                <th>Order_item_Id</th>
                <th>order_id</th>
                <th>product_id</th>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {ordeditems.map(ordereditem => (
                <tr key={ordereditem.order_item_id}>
                <td>{ordereditem.order_item_id}</td>
                  <td>{ordereditem.order_id}</td>
                  <td>{ordereditem.product_id}</td>
                  <td>{ordereditem.quantity}</td>
                  <td>{ordereditem.price}</td>
                  <td>
                  </td>
                  <td className='text-red-600'>
                    <i className="fa-solid fa-trash" ></i>
                  </td>
                </tr>
                ))}

            </tbody>
          </table>
        </div>
        )}
        {/* -------------------invoices----------------- */}

    </div>
  )
}

export default Orderstable