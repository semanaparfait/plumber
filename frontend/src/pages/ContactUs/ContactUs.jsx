import React, { useState } from "react";
import "./ContactUs.css";
import contact from "../../assets/contactus/contactus.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import bg1 from "../../assets/services/bgservices.jpg";
import arrow from "../../assets/contactus/arrow.png";

function ContactUs() {
  const [showNotification, setShowNotification] = useState(false);
  const [fillAllFields, setFillAllFields] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsemail, setNewsemail] = useState("");
  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsemail) {
      setFillAllFields(true);
      setTimeout(() => setFillAllFields(false), 5000); // Hide after 5s
      return;
    }
    const newsletterData = {
      email: newsemail,
    };
    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsletterData),
      });
      if (response.ok) {
        setShowNotification(true); // Show notification
        setTimeout(() => setShowNotification(false), 5000); // Hide after 5s
        setNewsemail("");
      }
      else {
        alert("Failed to subscribe. Please try again later.");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      alert("An error occurred while subscribing to the newsletter.");
    }
  };
  const handleSubit = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !message) {
      setFillAllFields(true);
      setTimeout(() => setFillAllFields(false), 5000); // Hide after
      return;
    }

    const contactData = {
      name,
      phoneNumber,
      email,
      message,
    };

    try {
      const response = await fetch("http://localhost:5000/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

    if (response.ok) {
      setShowNotification(true); // Show notification
      setTimeout(() => setShowNotification(false), 5000); // Hide after 5s
      setName("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
    }
    else {
            alert("Failed to send message. Please try again later.");
          }
        } catch (error) {
          console.error("Error sending message:", error);
          alert("An error occurred while sending your message.");
        }
  };
  function notification() {
    return (
      <div className="done-notification absolute bottom-[10%] fixed  right-0 flex justify-center items-center gap-2   rounded-lg shadow-lg z-10"
      style={{ padding: "10px 20px" }}>
        <i className="fa-regular fa-circle-check text-white"></i>
        <h1 className="text-yellow">We’ve received your message <br /> we’ll be in touch soon! </h1>
      </div>
    );
  }
      function fillallfields() {
    return (
      <div className="fillallfields-notification absolute fixed bottom-[10%]  right-0 flex justify-center items-center gap-2 bg-red-600  rounded-lg shadow-lg z-10"
      style={{ padding: "10px 20px", animation: "identifier 1.4s ease-in-out forwards" }}>
        <i className="fa-regular fa-circle-check text-white"></i>
        <h1 className="text-yellow">Oops! It looks like you missed some <br /> fields. Please fill them all in.</h1>
      </div>
    );
  }

  return (
    <main>
      {showNotification && (notification())}
      {fillAllFields && (fillallfields())}
      

      <Navbar />
      <div
        className="w-full h-[100vh] md:h-[70vh] flex items-center justify-center flex-col gap-6 bg-[#0077be]"
        // style={{ background: "rgb(207, 225, 229)" }}
      >
        <img
          src={arrow}
          alt="arrow decoration"
          className="w-[7rem] absolute top-[10%] left-[10%]"
        />
        <div className="relative flex flex-col items-center gap-4">
          <h1 className="font-black text-5xl md:text-7xl text-center text-white">
            Contact Us
          </h1>
          <p className=" text-center w-full md:w-[50%] text-white">
            Need a reliable plumber you can trust? We fix leaks, unclog drains,
            and install systems fast. Call now for expert service, honest
            pricing, and lasting results for your home or business.
          </p>
        </div>
        <img
          src={arrow}
          alt="arrow decoration"
          className="w-[7rem] absolute bottom-0 md:bottom-[20%] right-[10%]"
        />
      </div>
      <div style={{ padding: "40px" }}>
        <div className="flex gap-5 md:gap-[10rem] justify-center flex-wrap">
          <div className=" md:w-[45%]">
            <form className="flex flex-col gap-4 " onSubmit={handleSubit}>
              <div className=" flex  gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  className="rounded-2xl h-[2.5rem] w-full md:w-[50%]"
                  style={{
                    background: "rgb(207, 225, 229)",
                    paddingLeft: "10px",
                  }}
                />
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="phonenumber"
                  className="rounded-2xl h-[2.5rem] w-full md:w-[50%]"
                  style={{
                    background: "rgb(207, 225, 229)",
                    paddingLeft: "10px",
                  }}
                />
              </div>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-2xl h-[2.5rem]"
                style={{
                  background: "rgb(207, 225, 229)",
                  paddingLeft: "10px",
                }}
              />
              <textarea
                cols="20"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="rounded-2xl"
                style={{
                  background: "rgb(207, 225, 229)",
                  resize: "none",
                  padding: "20px 10px",
                }}
              ></textarea>
              <button
                type="submit"
                className="text-white rounded-3xl text-[14px] w-[8rem]"
                style={{
                  background: "rgb(100, 145, 150)",
                  padding: "7px 20px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
          <div
            className="relative text-white rounded-3xl  h-[17rem] text-center"
            style={{
              backgroundImage: `url(${bg1})`,
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
            <div className="flex flex-col gap-2 relative text-center items-center justify-center">
              <h1 className="font-bold text-2xl">Our Newsletters</h1>
              <p>
  Stay updated with the latest tips, offers,  <br />and plumbing insights. 
  Subscribe now <br /> and never miss important updates <br /> for your home or business.
              </p>
              <form className="flex flex-col gap-4" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  value={newsemail}
                  onChange={(e) => setNewsemail(e.target.value)}
                  placeholder="Email"
                  className="bg-[#ffffff] rounded-3xl h-[2.5rem] text-[black] outline-none"
                  style={{ paddingLeft: "10px" }}
                />
                <button
                  type="submit"
                  className="text-[white] bg-[#199233] rounded-3xl font-bold"
                  style={{ padding: "7px 20px" }}
                >
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "40px" }} className="relative">
        <div className="relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1771.0241351126176!2d30.080213922644408!3d-1.9826346604764145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6108d6db08d%3A0xbfc486d1fb045285!2sKK%20567%20St%2C%20Kigali!5e1!3m2!1sen!2srw!4v1752690422812!5m2!1sen!2srw"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow"
          ></iframe>
          <br />
          <br />
        </div>

        <div className="flex gap-4 flex-wrap justify-center absolute bottom-0 right-0 left-0">
          {/* <!-- Location --> */}
          <div
            className="contact-box flex flex-col gap-3 rounded-3xl text-[white]"
            style={{
              backgroundColor: "rgb(154, 184, 186)",
              padding: "10px 30px",
            }}
          >
            <div className="heading flex items-center gap-3">
              <i className="fas fa-map-marker-alt"></i>
              <h3>
                Location <br />
                <strong>Visit Us At</strong>{" "}
              </h3>
            </div>
            <p>
              KG 33avenue Kigali Gisozi <br />
              copcom business center <br />
              door number CR046
            </p>
          </div>

          {/* <!-- Phone --> */}
          <div
            className="contact-box flex flex-col gap-3 rounded-3xl"
            style={{
              backgroundColor: "rgb(168, 194, 196)",
              padding: "10px 30px",
            }}
          >
            <div className="heading flex items-center gap-3">
              <i className="fas fa-phone-alt"></i>
              <h3>
                24/7 Service <br />
                <strong>Call Us On</strong>
              </h3>
            </div>
          <p>
            Tel: <a href="tel:+250782171515">
              +250 78217 1515
            </a>
            <br />
            Mob: <a href="tel:+250782171515">
              +250 78217 1515
            </a>
          </p>

          </div>

          {/* <!-- Email --> */}
          <div
            className="contact-box flex flex-col gap-3 rounded-3xl"
            style={{
              backgroundColor: "rgb(188, 210, 211)",
              padding: "10px 30px",
            }}
          >
            <div className="heading flex items-center gap-3">
              <i className="fas fa-envelope"></i>
              <h3>
                Drop A Line <br />
                <strong>Mail Address</strong>
              </h3>
            </div>
          <p>
            <a href="mailto:Info@einsteinplumbers.rw" >
              Info@einsteinplumbers.rw
            </a>
            <br />
            <a href="mailto:semana.coder.expert@gamail.com" >
              semana.coder.expert
            </a>
          </p>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default ContactUs;
