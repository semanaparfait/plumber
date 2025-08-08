import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import sider from "../../assets/services/sider-bg.png";
import bg from '../../assets/services/bgservices1.jpg'
import bg1 from "../../assets/services/bgservices.jpg";
import Footer from "../../components/Footer/Footer";

function Services() {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover bg-center h-screen relative "
        style={{ backgroundImage: `url(${bg1})`}}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="flex items-center  relative flex-wrap">
          <img src={sider} alt="sider" />
          <h1 className=" font-black text-[white] text-[25px] md:text-[40px] text-center">
            {" "}
            Our Services <br /> — <br /> What We Do Best
          </h1>
        </div>
      </div>
      <br />
      <div>
        <div className=" flex flex-col items-center gap-2.5">
          <h1 className="text-center font-bold text-[24px]">Our Services</h1>
          <p className="text-center w-[80%] md:w-[50%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            nihil, maxime, in repellat tempore debitis sint quasi repellendus,
            ipsa perferendis magni ut voluptate voluptatem quis eveniet deleniti
            natus voluptatum. Quisquam!
          </p>
        </div>
        <br />
        <div style={{ padding: "40px" }}>
          <div className="grid md:grid-cols-4 gap-4 ">
            <div className="service-card min-w-[200px] ">
              <div className="relative">
                <img
                  src={bg}
                  alt="service background"
                  className="w-full h-[13rem]  object-cover"
                />

                <img
                  src={sider}
                  alt="service-logo"
                  className="rounded-full w-[3rem] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Text content */}
              <div className="text-center border">
                <br />
                <h2 className="font-bold text-lg">Water Line Repair</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat iure fugiat magni libero numquam placeat.
                </p>
                <br />
                <p className="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline">
                  Learn More
                </p>
              </div>
            </div>

            <div className="service-card min-w-[200px] ">
              <div className="relative">
                <img
                  src={bg}
                  alt="service background"
                  className="w-full h-[13rem] object-cover "
                />

                <img
                  src={sider}
                  alt="service-logo"
                  className="rounded-full w-[3rem] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Text content */}
              <div className="text-center border">
                <br />
                <h2 className="font-bold text-lg">Water Line Repair</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat iure fugiat magni libero numquam placeat.
                </p>
                <br />
                <p className="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline">
                  Learn More
                </p>
              </div>
            </div>
            <div className="service-card min-w-[200px] ">
              <div className="relative">
                <img
                  src={bg}
                  alt="service background"
                  className="w-full h-[13rem] object-cover"
                />

                <img
                  src={sider}
                  alt="service-logo"
                  className="rounded-full w-[3rem] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Text content */}
              <div className="text-center border">
                <br />
                <h2 className="font-bold text-lg">Water Line Repair</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat iure fugiat magni libero numquam placeat.
                </p>
                <br />
                <p className="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline">
                  Learn More
                </p>
              </div>
            </div>
            <div className="service-card min-w-[200px] ">
              <div className="relative">
                <img
                  src={bg}
                  alt="service background"
                  className="w-full h-[13rem] object-cover"
                />

                <img
                  src={sider}
                  alt="service-logo"
                  className="rounded-full w-[3rem] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Text content */}
              <div className="text-center border">
                <br />
                <h2 className="font-bold text-lg">Water Line Repair</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat iure fugiat magni libero numquam placeat.
                </p>
                <br />
                <p className="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline">
                  Learn More
                </p>
              </div>
            </div>

            <div className="service-card min-w-[200px] ">
              <div className="relative">
                <img
                  src={bg}
                  alt="service background"
                  className="w-full h-[13rem] object-cover "
                />

                <img
                  src={sider}
                  alt="service-logo"
                  className="rounded-full w-[3rem] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Text content */}
              <div className="text-center border">
                <br />
                <h2 className="font-bold text-lg">Water Line Repair</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat iure fugiat magni libero numquam placeat.
                </p>
                <br />
                <p className="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline">
                  Learn More
                </p>
              </div>
            </div>

            <div className="service-card min-w-[200px] ">
              <div className="relative">
                <img
                  src={bg}
                  alt="service background"
                  className="w-full h-[13rem] object-cover "
                />

                <img
                  src={sider}
                  alt="service-logo"
                  className="rounded-full w-[3rem] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Text content */}
              <div className="text-center border">
                <br />
                <h2 className="font-bold text-lg">Water Line Repair</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat iure fugiat magni libero numquam placeat.
                </p>
                <br />
                <p className="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline">
                  Learn More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
