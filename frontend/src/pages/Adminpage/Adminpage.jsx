import React, {useEffect, useState} from 'react'
import './Adminpage.css'
import { Link } from 'react-router-dom'
import logo  from '../../assets/logo/logo.jpg'

function Adminpage() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users')
    // fetch('https://new-movie-app.onrender.com/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

//   fetching for contact us
    const [contactUsMessages, setContactUsMessages] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/contactus')
        .then(res => res.json())
        .then(data => setContactUsMessages(data))
        .catch(err => console.error('Error fetching contact us messages:', err));
    }, []);
//   inserting into category table
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      alert("Please select a category and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Category saved successfully!");
        setCategoryName("");
        setCategoryImage(null);
      } else {
        alert("Error saving category");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };
  return (
    <div>
        <nav className='flex items-center justify-between bg-amber-600 '>
            <div>
                <img src={logo} alt="camapany logo"className='w-[6rem]' />
            </div>
                <ul className=' v  gap-5 cursor-pointer hidden md:flex'>
                    <li>Dashboard</li>
                    <li>Users</li>
                    <li>Products</li>
                    <li>carts</li>
                    <li>Upload</li>
                    <li>Hired us</li>
                </ul>
  
            <div>
                <Link to={`/`}>
                <button className='bg-amber-400 rounded-2xl'
                style={{padding:'5px 12px'}}>
                Back Home</button>
                    </Link>

            </div>
        </nav>
        {/* fetching users */}
        <div className="overflow-x-auto px-4 hidden">
                <table className='recent-table w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                    <th>UserId</th>
                    <th>Created_At</th>
                    <th>Username</th>
                    <th>Phonenumber</th>
                    <th>Password</th>
                    <th>Is_Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className='text-center'>
                        <td>{user.id}</td>
                        <td>{new Date(user.created_at).toLocaleString()}</td>
                        <td>{user.username}</td>
                        <td>{user.phonenumber}</td>
                        <td>{user.password}</td>
                        <td>{user.is_admin ? 'Admin' : 'User'}</td>
                        </tr>
                    ))}
                    </tbody>
                    {/* Add more rows as needed */}
            </table>
        </div>
        {/* add products */}
        <div className='flex items-center justify-center hidden'
        style={{paddingTop:'2rem'}}>
        <div className=' w-1/2 '>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex w-fit flex-wrap gap-2.5'>
                <input
                type="file"
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />
                <input
                type="file"
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />
                <input
                type="file"
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />
                <input
                type="file"
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />
                <input
                type="file"
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />
            </div>
            <label className='font-medium' >Product name</label>
            <input type="text" 
            placeholder='Product Name'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
            <label className='font-medium' >Product Description</label>
            <textarea  cols="20" rows="5"
            placeholder='Product Description'
            className='border resize-none rounded-[10px]'
            style={{padding:'10px 15px'}}></textarea>
            <label className='font-medium' >Category Image</label>
            <input
            type="file"
            className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            accept="image/*"
            />
            <label className='font-medium' >Product Category</label>
            <select name="category" id="category" className='border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black'
            onChange={(e) => setCategoryName(e.target.value)}
            >
                <option value="">-- Select Category --</option>
                {/* <!-- Plumbing Categories --> */}
                <option value="pipes-fittings">Pipes & Fittings</option>
                <option value="valves-taps">Valves & Taps</option>
                <option value="plumbing-tools">Plumbing Tools</option>
                <option value="seals-gaskets">Seals & Gaskets</option>
                <option value="water-heaters">Water Heaters</option>
                <option value="drainage-systems">Drainage Systems</option>
                <option value="pumps-motors">Pumps & Motors</option>
                <option value="toilets-fixtures">Toilets & Fixtures</option>
                <option value="bathroom-accessories">Bathroom Accessories</option>
                <option value="sinks-basin">Sinks & Basins</option>
                <option value="hoses-tubing">Hoses & Tubing</option>
                <option value="water-filters">Water Filters</option>

                {/* <!-- Construction Categories --> */}
                <option value="cement-mortar">Cement & Mortar</option>
                <option value="steel-rebars">Steel & Rebars</option>
                <option value="construction-tools">Construction Tools</option>
                <option value="safety-gear">Safety Gear</option>
                <option value="paints-coatings">Paints & Coatings</option>
                <option value="roofing-materials">Roofing Materials</option>
                <option value="electrical-supplies">Electrical Supplies</option>
                <option value="fasteners-hardware">Fasteners & Hardware</option>
                <option value="tiles-flooring">Tiles & Flooring</option>
                <option value="insulation-materials">Insulation Materials</option>
                <option value="adhesives-sealants">Adhesives & Sealants</option>
            </select>
            <label className='font-medium' >Old Product Price</label>
            <input type="number" 
            placeholder='Product Price'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
            <label className='font-medium' >New Product Price</label>
            <input type="number" 
            placeholder='Product Price'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
            <button type='submit' className='bg-cyan-500 h-[2.4rem] rounded-2xl'>Upload Product</button>

            </form>

        </div>
          </div>
          {/* fetching contact us messages */}
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
    </div>
  )
}

export default Adminpage