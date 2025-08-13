import React, {useState} from 'react'
import home from '../../assets/home/homeblue.jpeg'
import './Hero.css'
import booking from '../../assets/hero/book.png'
import confirmation from '../../assets/hero/confirmation.png'
import detail from '../../assets/hero/detail.png'
import complete from '../../assets/hero/complete.png'
import arow from '../../assets/hero/arrow.png'
import tools from '../../assets/hero/tools.jpg'
import robine from '../../assets/hero/robine2.jpeg'
import mission from '../../assets/hero/missionsog.png'
import objectives from '../../assets/hero/objectives.png'
import { Link } from 'react-router-dom'


function Hero() {
    const [activetab, setActivetab] = useState('why-choose-us');
     const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How quickly can you respond to emergency plumbing issues?",
      answer:
        "Our team is available 24/7 and strives to respond within one hour to emergency calls, ensuring your problem is resolved quickly to prevent further damage.",
    },
    {
      question: "What types of plumbing services do you offer?",
      answer:
        "We provide a wide range of services including leak repairs, drain cleaning, pipe installations, water heater servicing, bathroom and kitchen plumbing, and emergency repairs 24/7.",
    },
    {
      question: "Do you offer upfront pricing and estimates?",
      answer:
        "Yes! We provide clear, upfront quotes before starting any work, so there are no surprises or hidden fees. Our pricing is competitive and transparent.",
    },
  ];


  return (
    <div>

  
    <div className="hero-container relative w-full h-dvh ">
        <div className="bg-cover bg-center w-full h-full rounded-bl-[70px]"
        style={{ backgroundImage: `url(${home})` }}>
<div className="absolute inset-0 bg-gradient-to-b from-white via-white/93 to-transparent h-"></div>

            <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center absolute z-10 top-[15%]">
                    <h1 className=" the-h1 text-4xl md:text-6xl font-bold mb-4 z-100 relative text-black">We're Top <span className="highlighted-expert">Expert </span>in <br />Plumbing</h1><br />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
                    style={{padding: '10px 20px'}}>
                        Get Started <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    </div>
                    <div className='absolute bottom-[6%] left-[3%]  flex gap-4 items-center text-white py-4 z-10 hidden'>
                        <section className="stats-section">
                        <div className="stat">
                            <span className="font-bold block text-[2rem]">13+</span>
                            <span className="text-[0.9rem] text-[#d1d5bd]">Years Of Experience</span>
                        </div>
                        <div className="w-[2px] h-[100px] bg-[#0062ec]"></div>
                        <div className="stat">
                            <span className="font-bold block text-[2rem]">53K+</span>
                            <span className="text-[0.9rem] text-[#d1d5bd]">Active Customers Rate</span>
                        </div>
                        <div className="w-[2px] h-[100px] bg-[#0062ec]"></div>
                        <div className="stat">
                            <span className="font-bold block text-[2rem]">1M+</span>
                            <span className="text-[0.9rem] text-[#d1d5bd]">Customer Satisfaction Rate</span>
                        </div>
                        </section>


                    </div>
                    </div>

        </div>
         </div><br />
        {/* --------------services--------------- */}
        <div>
            <div className='text-center flex flex-col items-center gap-4'>

            <p className='text-[#0077be]'>WORK PROCESS</p>
            <h1 className='process text-4xl'>We Follow the <span className='text-[#0077be]'>Process</span></h1>
            </div><br /><br />
            <div className='flex items-center justify-center flex-wrap gap-5'>
            <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="border-dashed border-2 border-[#0077be] rounded-full "
            style={{padding: '6px'}}>
                <div className="relative bg-[#0077be] w-24 h-24 rounded-full flex justify-center items-center">
                <img src={booking} alt="booking icon" className="w-12" />
                {/* Badge */}
                <p className="absolute bottom-0 right-0 rounded-full bg-[#00be39] w-8 h-8 text-white text-center flex items-center justify-center font-bold translate-x-1/4 translate-y-1/4">
                    01
                </p>
                </div>
            </div><br />

            <div className=" text-center">
                <h1 className="text-lg font-semibold mb-1">Booking Online</h1>
                <p className="text-gray-600 text-sm leading-snug">
                Completely repurpose forward <br /> conveniently target
                </p>
            </div>
            </div>


            <div>
                <img src={arow} alt="arrow" className='w-[5rem]' />
            </div>
            <div className="flex flex-col items-center max-w-xs mx-auto">

            <div className='border-dashed border-2 border-[#0077be] rounded-full '
            style={{padding: '6px'}}>
            <div className='relative bg-[#0077be] w-[6rem] h-[6rem] rounded-full flex justify-center items-center'>
            <img src={confirmation} alt="confirmation icon" className='w-[3rem]' />
            
            {/* Badge */}
            <p className='absolute bottom-0 right-0 rounded-full bg-[#00be39] w-[2rem] h-[2rem] text-white text-center flex items-center justify-center font-bold translate-x-1/4 translate-y-1/4'>
                02
            </p>
            </div>
            </div><br />

            <div className=" text-center">
                <h1 className="text-lg font-semibold mb-1">Confirmation</h1>
                <p className="text-gray-600 text-sm leading-snug">
                Completely repurpose forward <br /> conveniently target
                </p>
            </div>
            </div>


            <div>
                <img src={arow} alt="arrow" className='w-[5rem]' />
            </div>

            <div className="flex flex-col items-center max-w-xs mx-auto">

            <div className='border-dashed border-2 border-[#0077be] rounded-full '
            style={{padding: '6px'}}>
            <div className='relative bg-[#0077be] w-[6rem] h-[6rem] rounded-full flex justify-center items-center'>
            <img src={detail} alt="detail icon" className='w-[3rem]' />
            
            {/* Badge */}
            <p className='absolute bottom-0 right-0 rounded-full bg-[#00be39] w-[2rem] h-[2rem] text-white text-center flex items-center justify-center font-bold translate-x-1/4 translate-y-1/4'>
                03
            </p>
            </div>
            </div><br />
                <div className="text-center">
                <h1 className="text-lg font-semibold mb-1">Detail</h1>
                <p className="text-gray-600 text-sm leading-snug">
                Completely repurpose forward <br /> conveniently target
                </p>
                </div>

            </div>


            <div>
                <img src={arow} alt="arrow" className='w-[5rem]' />
            </div>

            <div className="flex flex-col items-center max-w-xs mx-auto">

            <div className='border-dashed border-2 border-[#0077be] rounded-full '
            style={{padding: '6px'}}>
            <div className='relative bg-[#0077be] w-[6rem] h-[6rem] rounded-full flex justify-center items-center'>
            <img src={complete} alt="complete icon" className='w-[3rem]' />
            
            {/* Badge */}
            <p className='absolute bottom-0 right-0 rounded-full bg-[#00be39] w-[2rem] h-[2rem] text-white text-center flex items-center justify-center font-bold translate-x-1/4 translate-y-1/4'>
                04
            </p>
            </div>

            </div><br />
            <div className="text-center">
                <h1 className="text-lg font-semibold mb-1">Complete</h1>
                <p className="text-gray-600 text-sm leading-snug">
                Completely repurpose forward <br /> conveniently target
                </p>
                </div>
            </div>

        </div>
            </div><br /><br />

            {/* -----------------why choose us--------------------- */}
    <div className='bg-[#dff1fb] rounded-3xl'
    style={{padding: '20px'}}>
        <div className='text-center flex justify-center items-center gap-8'>
            <div
            onClick={() => setActivetab('why-choose-us')}
            className='bg-center bg-cover rounded-tl-[10px] rounded-bl-[30px] rounded-tr-[30px] rounded-br-[30px] w-[20rem] h-[3rem] text-center flex items-center justify-center font-bold text-[18px]'
            style={{backgroundImage: `url(${tools})`}}>
                <h1 className='text-white'><span className='text-[#0077be]'>01.</span> Why choose Us ?</h1>
            </div>
            <div
            onClick={() => setActivetab('our-missions')}
            className='bg-center bg-cover rounded-tl-[10px] rounded-bl-[30px] rounded-tr-[30px] rounded-br-[30px] w-[20rem] h-[3rem]'
            style={{backgroundImage: `url(${tools})`}}>
                <h1 className='text-white'><span className='text-[#0077be]'>02.</span> Our Missions</h1>
            </div>
            <div
            onClick={() => setActivetab('objectives')}
            className='bg-center bg-cover rounded-tl-[10px] rounded-bl-[30px] rounded-tr-[30px] rounded-br-[30px] w-[20rem] h-[3rem]'
            style={{backgroundImage: `url(${tools})`}}>
                <h1 className='text-white'><span className='text-[#0077be]'>03.</span> Objectives</h1>
            </div>
        </div><br />

        {/* ---------------why choose us--------------------- */}
        {activetab === 'why-choose-us' && (
        <div className='flex flex-wrap justify-center items-center gap-9'>
            <div className='relative '>
                <img src={tools} alt="tools" className=' object-cover w-[30rem] rounded-2xl relative' />
            <div></div>
            <div className='bg-[#0077be] hidden'>
                <img src={robine} alt="robine on why choose" className='absolute top-0 w-[5rem] object-center rounded-tr-[50%] rounded-br-[50%]'/>
            </div>
            </div>
            <div  >
                <p className='text-[#0077be]'>WHY CHOOSE US</p><br />
                <h2 className='why-choose-us text-2xl'>Hire Best Plumbing <span className='text-[#0077be]'>Service</span><br />For Great Work</h2>
                <p className='text-[0.9rem] text-[#000000] w-[20rem] md:w-[30rem]'>We are a team of highly skilled professionals dedicated to providing top-notch plumbing services. Our mission is to ensure customer satisfaction through quality workmanship and exceptional service.</p><br />
                <div className='flex flex-wrap items-center gap-4'>
                    <div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Experienced and certified plumbers</p>
                        </div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>24/7 emergency services available</p>
                        </div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Transparent pricing with no hidden fees</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>High-quality materials and equipment</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Customer satisfaction guaranteed</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Environmentally friendly practices</p>
                        </div>
                    </div>
                </div><br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
                    style={{padding: '10px 20px'}}>
                        Get Started <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        )}

   
    {/* -----------------------mission------------------- */}
        {activetab === 'our-missions' && (
            <div className='flex flex-wrap justify-center items-center gap-9'>
            <div className='relative '>
                <img src={mission} alt="tools" className=' object-cover w-[30rem] rounded-2xl relative' />
            <div></div>
            <div className='bg-[#0077be] hidden'>
                <img src={robine} alt="robine on why choose" className='absolute top-0 w-[5rem] object-center rounded-tr-[50%] rounded-br-[50%]'/>
            </div>
            </div>
            <div>
                <p className='text-[#0077be]'>WHY CHOOSE US</p><br />
                <h2 className='why-choose-us text-2xl'>Hire Best Plumbing <span className='text-[#0077be]'>Service</span><br />For Great Work</h2>
                <p className='text-[0.9rem] text-[#000000] w-[20rem] md:w-[30rem]'>We are a team of highly skilled professionals dedicated to providing top-notch plumbing services. Our mission is to ensure customer satisfaction through quality workmanship and exceptional service.</p><br />
                <div className='flex flex-wrap items-center gap-4'>
                    <div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Experienced and certified plumbers</p>
                        </div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>24/7 emergency services available</p>
                        </div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Transparent pricing with no hidden fees</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>High-quality materials and equipment</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Customer satisfaction guaranteed</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Environmentally friendly practices</p>
                        </div>
                    </div>
                </div><br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
                    style={{padding: '10px 20px'}}>
                        Get Started <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        )}
    {/* --------------------------objectives--------------------- */}
        {activetab === 'objectives' && (
            <div className='flex flex-wrap justify-center items-center gap-9'>
            <div className='relative '>
                <img src={objectives} alt="tools" className=' object-cover w-[30rem] rounded-2xl relative' />
            <div></div>
            <div className='bg-[#0077be] hidden'>
                <img src={robine} alt="robine on why choose" className='absolute top-0 w-[5rem] object-center rounded-tr-[50%] rounded-br-[50%]'/>
            </div>
            </div>
            <div>
                <p className='text-[#0077be]'>OUR OBJECTIVES</p><br />
                <h2 className='why-choose-us text-2xl'>Hire Best Plumbing <span className='text-[#0077be]'>Service</span><br />For Great Work</h2>
                <p className='text-[0.9rem] text-[#000000] w-[20rem] md:w-[30rem]'>We are a team of highly skilled professionals dedicated to providing top-notch plumbing services. Our mission is to ensure customer satisfaction through quality workmanship and exceptional service.</p><br />
                <div className='flex flex-wrap items-center gap-4'>
                    <div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Experienced and certified plumbers</p>
                        </div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>24/7 emergency services available</p>
                        </div>
                        <div className='flex items-center gap-4'>
                           <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Transparent pricing with no hidden fees</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>High-quality materials and equipment</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Customer satisfaction guaranteed</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <i className="fa-solid fa-circle-check text-[green]"></i>
                            <p>Environmentally friendly practices</p>
                        </div>
                    </div>
                </div><br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
                    style={{padding: '10px 20px'}}>
                        Get Started <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        )}
    {/* --------------------question------------------- */}
 </div><br />
         {/* ---------------------------questions---------------- */}
           <div className='bg-[#dff1fb] rounded-3xl flex flex-wrap gap-5 justify-center'
           style={{padding: '20px 30px'}}>
            <div className='w-full md:w-[40%]'>
                <p className='text-[#0077be]'>FREQUWNTLY QUESTIONS</p><br />
                <h1 className='question-title text-4xl'>We're Ready to <span className='text-[#0077be]'>Answers</span><br />Your Questions</h1><br />
                <p> Competently repurpose go forward benefits without goal-oriented to conveniently
                target business opportunities whereas proactive strea content via functional
                multidisciplinary</p><br />
                <Link to={`/contactus`}>
                <button className='bg-[gray] rounded-tl-[5px] rounded-bl-[15px] rounded-tr-[20px] rounded-br-[20px]'
                style={{padding: '10px 20px', color: 'white'}}>
                Get An Estimate  <i className="fa-solid fa-plus text-[#0077be]"></i></button>
                </Link>

            </div>
            <div className='w-full md:w-[50%] hidden'>
                <div className='question1 '>
                    <div className='question flex justify-between items-center bg-[green]'
                    style={{padding: '10px 20px'}}
                    >
                        <h1>How quickly can you respond to emergency plumbing issues?</h1>
                        <i className="fa-solid fa-plus text-[#0077be]" ></i>
                    </div>
                    <div className="anwers bg-[white] rounded-bl-[10px] rounded-br-[20px] font-semibold"   
                    style={{padding: '10px 20px'}}>
                        <p>Our team is available 24/7 and strives to respond within one hour to emergency calls, ensuring your problem is resolved quickly to prevent further damage.</p>
                    </div>
                </div><br />
                <div className='question2'>
                    <div className='question flex justify-between items-center'>
                        <h1> What types of plumbing services do you offer?</h1>
                        <i className="fa-solid fa-plus text-[#0077be]"></i>
                    </div>
                    <div className="anwers bg-[white] rounded-bl-[10px] rounded-br-[20px] font-semibold"   
                    style={{padding: '10px 20px'}}>
                        <p>We provide a wide range of services including leak repairs, drain cleaning, pipe installations, water heater servicing, bathroom and kitchen plumbing, and emergency repairs 24/7.</p>
                    </div>
                </div><br />
                <div className='question3'>
                    <div className='question flex justify-between -bjustify-between'>
                        <h1>Do you offer upfront pricing and estimates?</h1>
                        <i className="fa-solid fa-plus text-[#0077be]"></i>
                    </div>
                    <div className="anwers bg-[white] rounded-bl-[10px] rounded-br-[20px] font-semibold"   
                    style={{padding: '10px 20px'}}>
                        <p>Yes! We provide clear, upfront quotes before starting any work, so there are no surprises or hidden fees. Our pricing is competitive and transparent.</p>
                    </div>
                </div>
            </div>
                <div className="w-full md:w-[50%] space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className=" rounded-lg overflow-hidden ">
          {/* Question */}
          <div
            className="flex justify-between items-center bg-[gray] text-white cursor-pointer px-5 py-3"
            style={{padding: '10px 20px'}}
            onClick={() => toggleAnswer(index)}
          >
            <h1 className="text-[1rem] font-semibold">{faq.question}</h1>
            <i
              className={`fa-solid ${
                openIndex === index ? "fa-minus" : "fa-plus"
              } text-[#0077be]  rounded-full w-6 h-6 flex items-center justify-center`}
            ></i>
          </div><br />

          {/* Answer */}
          {openIndex === index && (
            <div className="bg-white text-black px-5 py-3 font-medium"
            style={{padding: '10px 20px'}}>
            
              <p>{faq.answer}</p><br />
            </div>
          )}
        </div>
      ))}
    </div>

         </div><br />
   
      </div>
  )
}

export default Hero