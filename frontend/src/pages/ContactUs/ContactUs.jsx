import React, {useState} from 'react'
import './ContactUs.css'
import contact from '../../assets/contactus/contactus.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import bg1 from "../../assets/services/bgservices.jpg";


function ContactUs() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubit = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const contactData = {
      name,
      phoneNumber,
      email,
      message
    };

    try {
      const response = await fetch('http://localhost:5000/api/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setName("");
        setPhoneNumber("");
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    }
  }

  return (
    <main>
        <Navbar/>
        <div
        className='w-full h-[70vh]'
        style={{background:'rgb(207, 225, 229)'}}>
            <h1>Contact Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit expedita error sit. At perspiciatis hic unde vel ducimus iusto non, perferendis labore ad culpa quod libero aut officiis, eos reprehenderit!</p>
        </div>
        <div style={{padding:'40px'}}>

        <div className='flex gap-5 md:gap-[10rem] justify-center flex-wrap'>
            <div className=' md:w-[45%]'>
                <form className='flex flex-col gap-4 'onSubmit={handleSubit}>
                <div className=' flex  gap-2'>
                    
                <input type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='name'
                className='rounded-3xl h-[2.5rem] w-full md:w-[50%]'
                 style={{background:'rgb(207, 225, 229)',paddingLeft:'10px'}}
                />
                 <input type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                 placeholder='phonenumber' 
                className='rounded-3xl h-[2.5rem] w-full md:w-[50%]'
                 style={{background:'rgb(207, 225, 229)',paddingLeft:'10px'}}
                 />
                </div>

                <input type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email' 
                className='rounded-3xl h-[2.5rem]'
                 style={{background:'rgb(207, 225, 229)',paddingLeft:'10px'}}
                />
                 <textarea  cols="20" rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                 placeholder='Message'
                 className='rounded-3xl'
                 style={{background:'rgb(207, 225, 229)',resize:'none',paddingLeft:'10px'}}
                 ></textarea>
                 <button 
                 type='submit'
                 className='text-white rounded-3xl text-[14px] w-[8rem]'
                 style={{background:'rgb(100, 145, 150)',padding:'7px 20px'}}>Submit</button>
                 </form>
            </div>
            <div className='relative text-white rounded-[10px] '
            style={{backgroundImage: `url(${bg1})`,borderRadius:'10px'}}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className='flex flex-col gap-2 relative text-center items-center justify-center'>
                    <h1 className='font-bold'>Our Newsletters</h1>
                    <p>Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. <br /> Sint saepe tempore alias, fugit nostrum  </p>
                    <form className='flex flex-col gap-4'>
                        <input type="email"
                        placeholder='Email'
                        className='bg-[#ffffff] rounded-3xl h-[2.5rem] text-[black] outline-none' 
                        style={{paddingLeft:'10px'}}/>
                        <button className='text-[white] bg-[black] rounded-3xl font-bold'
                        style={{padding:'7px 20px'}}
                        >Subscribe to Newsletter</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        <div style={{padding:'40px'}}>

        <div className='flex gap-4 flex-wrap justify-center'>
          {/* <!-- Location --> */}
          <div className="contact-box flex flex-col gap-3 rounded-3xl text-[white]"
          style={{backgroundColor:'rgb(154, 184, 186)',padding:'10px 30px'}}>
            <div className="heading flex items-center gap-3" >

              <i className="fas fa-map-marker-alt"></i>
              <h3>Location <br /><strong>Visit Us At</strong> </h3>
            
            </div>
              <p>65th Street, Los Angeles.<br />3rd Street, San Andreas.</p>
          </div>
  
          {/* <!-- Phone --> */}
          <div className="contact-box flex flex-col gap-3 rounded-3xl"
          style={{backgroundColor:'rgb(168, 194, 196)',padding:'10px 30px'}}>
            <div className="heading flex items-center gap-3">

              <i className="fas fa-phone-alt"></i>
              <h3>24/7 Service <br /><strong>Call Us On</strong></h3>
            </div>
              <p>Tel: +81-245-54896<br />Mob: +81-125-87965</p>
          </div>
  
          {/* <!-- Email --> */}
          <div className="contact-box flex flex-col gap-3 rounded-3xl"
          style={{backgroundColor:'rgb(188, 210, 211)',padding:'10px 30px'}}>
            <div className="heading flex items-center gap-3">

              <i className="fas fa-envelope"></i>
              <h3>Drop A Line <br /><strong>Mail Address</strong></h3>
            </div>
              <p>info@domain.com<br />domain@company.com</p>
          </div>
        </div>
        </div>
        <Footer/>
        
    </main>
  )
}

export default ContactUs