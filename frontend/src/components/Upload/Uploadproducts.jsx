import React, {useState, useEffect} from 'react'

function Uploadproducts() {
  
    //   fetching categories
      useEffect(() => {
        // Fetch categories from backend
        fetch("https://einstein-plumbers1.onrender.com/api/categories")
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error(err));
      }, []);
    // upload category
     const [categoryName, setCategoryName] = useState("");
      const [categoryImage, setCategoryImage] = useState(null);
      const [message, setMessage] = useState("");
    
      const handleUpload = async (e) => {
        e.preventDefault();
    
        if (!categoryName) {
          setMessage("Category name is required");
          return;
        }
    
        const formData = new FormData();
        formData.append("category_name", categoryName);
        if (categoryImage) {
          formData.append("category_image", categoryImage);
        }
    
        try {
          const res = await fetch("https://einstein-plumbers1.onrender.com/api/categories", {
            method: "POST",
            body: formData,
          });
    
          const data = await res.json();
          if (res.ok) {
            setMessage(`Category "${data.category_name}" uploaded successfully!`);
            setCategoryName("");
            setCategoryImage(null);
          } else {
            setMessage(data.error || "Failed to upload category");
          }
        } catch (err) {
          console.error("Error uploading category:", err);
          setMessage("Error uploading category");
        }
    
      };
    //   upload product
      const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productOldPrice, setProductOldPrice] = useState("");
  const [productImage1, setProductImages1] = useState(null);

//   const [message, setMessage] = useState("");
    const handleUploadproducts = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_description", productDescription);
    formData.append("product_newprice", productNewPrice);
    formData.append("product_oldprice", productOldPrice);
    formData.append("category_id", e.target.category_id.value);
    if (productImage1 ){
    formData.append("product_image1", productImage1);

    }

    try {
      const res = await fetch("https://einstein-plumbers1.onrender.com/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Product "${data.product_name}" uploaded successfully!`);
        setProductName("");
        setProductDescription("");
        setProductNewPrice("");
        setProductOldPrice("");
        setProductImages1(null);
        // setProductImage1(null);
        e.target.reset();
      } else {
        setMessage(data.error || "Failed to upload product");
      }
    } catch (err) {
      console.error("Error uploading product:", err);
      setMessage("Error uploading product");
    }
  };
  return (
    <div>
                <div>
        <div className='flex items-center justify-center '
        style={{paddingTop:'2rem'}}>
        <div className=' w-1/2 '>
            <form className='flex flex-col gap-4'onSubmit={handleUploadproducts} >
            <div className='flex w-fit flex-wrap gap-2.5'>
                <input
                type="file"
                accept="image/*"
                 onChange={(e) => setProductImages1(e.target.files[0])}
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />   
            </div>
            <label className='font-medium' >Product name</label>
            <input type="text" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Product Name'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
            <label className='font-medium' >Product Description</label>
            <textarea  cols="20" rows="5"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder='Product Description'
            className='border resize-none rounded-[10px]'
            style={{padding:'10px 15px'}}></textarea>
            <label className='font-medium' >Category Image</label>

            <label className='font-medium' >Product Category</label>

            <select name="category_id" className="border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black" required>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>
            <label className='font-medium' >Old Product Price</label>
            <input type="number" 
            value={productOldPrice}
            onChange={(e) => setProductOldPrice(e.target.value)}      
            placeholder='Product Price'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
            <label className='font-medium' >New Product Price</label>
            <input type="number" 
            value={productNewPrice}
            onChange={(e) => setProductNewPrice(e.target.value)}
            placeholder='Product Price'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
            <button type='submit' className='bg-cyan-500 h-[2.4rem] rounded-2xl'>Upload Product</button>

            </form>

        </div>
          </div><br /><br /><hr />
        <div className="upload-new-category"><br />
            <h1 className='text-center font-bold text-3xl'>Upload  category</h1><br />
            <form onSubmit={handleUpload} className='flex flex-col gap-4 items-center justify-center'>
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setCategoryImage(e.target.files[0])}
                className=" rounded-[6px] w-fit text-center file:text-gray-500 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:rounded-md"
                />
            <input type="text" 
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='category name'
            className='outline-none border-2 border-gray-500 rounded-[10px] h-[2.5rem] placeholder-black '
            style={{paddingLeft:'8px'}}/>
                <button type='submit' className='bg-cyan-500 h-[2.4rem] rounded-2xl'style={{padding:'10px 20px'}}>Upload New product</button>

            </form>
        </div>
          </div>
    </div>
  )
}

export default Uploadproducts