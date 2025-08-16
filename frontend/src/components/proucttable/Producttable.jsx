import React,{useState,useEffect} from 'react'
import { data } from 'react-router-dom';

function Producttable() {
  const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://einstein-plumbers1.onrender.com";

    const [activeproductcategory,setActiveproductcategory] = useState("products")
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching product:', err));
  }, []);

//   deleting products
// deleting products
const deleteProduct = async (productId) => {
  if (!window.confirm('Are you sure you want to delete this product?')) return;

  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Deleted:', data);
      // Remove the deleted product from state to auto-refresh UI
      setProducts(products.filter(product => product.product_id !== productId));
    } else {
      console.error('Delete failed:', data.message);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
// ---------------working on categories---------------
const [categories, setCategories] = useState([])
useEffect(()=>{
  fetch(`${API_URL}/api/categories`)
  .then(res => res.json())
  .then(data=> setCategories(data))
  .catch(err=>console.error('error fetching categories from categories table:',err))
},[])
// ---------------dealing with deleting category------------------
const deletecategory = async (categoryId) => {
  if (!window.confirm('Are you sure you want to delete this category?')) return;

  try {
    const response = await fetch(`${API_URL}/api/category/${categoryId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Deleted:', data);
      // Remove the deleted category from state to auto-refresh UI
      setCategories(categories.filter(category => category.category_id !== categoryId));
    } else {
      console.error('Delete failed:', data.message);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};


  return (
    <div>
        <div className='flex items-center justify-center gap-4 cursor-pointer'>
            <h1 className='font-bold text-2xl' onClick={()=>setActiveproductcategory("products")}>Products table</h1>
            <h1 className='font-bold text-2xl' onClick={()=>setActiveproductcategory("category")}>Category table</h1>
        </div><br />


              {/* product Table */}
          {activeproductcategory === 'products' && (

        <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
            <thead className='bg-gray-100'>
              <tr>
                <th>Id</th>
                <th>image</th>
                <th>name</th>
                <th>description</th>
                <th>oldprice</th>
                <th>Newprice</th>
                <th>categoryid</th>
                <th>created_At</th>
              </tr>
            </thead>
            <tbody>
                {products.map((oneproduct)=>(
                    <tr key={oneproduct.product_id}>
                        <td>{oneproduct.product_id}</td>
                        <td>
                           <img
                            src={`${API_URL}/uploads/${oneproduct.product_image1}`}
                            className='w-10'
                            alt={oneproduct.product_name}
                            />

                        </td>
                        <td>{oneproduct.product_name}</td>
                        <td>{oneproduct.product_description}</td>
                        <td>{oneproduct.product_oldprice}</td>
                        <td>{oneproduct.product_newprice}</td>
                        <td>{oneproduct.category_id}</td>
                        <td>{new Date(oneproduct.created_at).toLocaleString()}</td>
                        <td className='text-red-600'>
                        <i className="fa-solid fa-trash" onClick={() => deleteProduct(oneproduct.product_id)}></i>
                        </td>
                    </tr>
                ))}
              
            </tbody>
          </table>
        </div>
          )}
  

          {/* category table */}
          {activeproductcategory === 'category' && (

           <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
            <thead className='bg-gray-100'>
              <tr>
                <th>Id</th>
                <th>image</th>
                <th>name</th>
                <th>created_At</th>
              </tr>
            </thead>
            <tbody>
                {categories.map((onecategory)=>(
                    <tr key={onecategory.category_id}>
                        <td>{onecategory.category_id}</td>
                        <td>
                           <img
                            src={`${API_URL}/uploads/${onecategory.category_image}`}
                            className='w-10'
                            alt={onecategory.category_name}
                            />

                        </td>
                        <td>{onecategory.category_name}</td>

                        <td>{new Date(onecategory.created_at).toLocaleString()}</td>
                        <td className='text-red-600'>
                        <i className="fa-solid fa-trash" onClick={() => deletecategory(onecategory.category_id)}></i>
                        </td>
                    </tr>
                ))}
              
            </tbody>
          </table>
        </div>
          )}
      
    </div>
  )
}

export default Producttable