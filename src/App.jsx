import { useEffect, useRef, useState } from "react";
import data from "./data";
import "./App.css";
import Canvas from "./Canvas";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import fetchData from "./Apis/Api";


function App() {
  const [show, setShow] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedData = await fetchData();
      setRecipes(fetchedData);
    };

    loadRecipes();
  }, []);
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  useEffect(() => {
    // Set initial black theme on page load
    gsap.set("body", {
      color: "#fff",
      backgroundColor: "#000",
    });

    const handleClick = (e) => {
      setShow((prevShow) => {
        if (!prevShow) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a", // Red theme
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, { scale: 0, clearProps: "all" });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000", // Black theme
            duration: 1.2,
            ease: "power2.inOut",
          });
        }
        return !prevShow;
      });
    };

    const headingElement = headingRef.current;
    if (headingElement) {
      headingElement.addEventListener("click", handleClick);
    }

    return () => {
      if (headingElement) {
        headingElement.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      {/* Growing Span Animation */}
      <span
        ref={growingSpan}
        className="growing rounded-full  block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>

      {/* Main Container */}
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {/* Canvas in Background */}
        <div className="absolute flex flex-wrap-reverse">
          {show &&
            data[0].map((canvasdetails, index) => (
              <Canvas key={index} details={canvasdetails} />
            ))}
        </div>

        <div className="w-full relative z-[1] h-screen">
          {/* Navbar */}
          <nav className="w-full p-8 flex justify-between">
            <div className="brand text-2xl italic font-md">SpicyHeaven</div>
            <div className="links hidden sm:flex font-semibold  gap-10">
              {[
                { name: "Home", href: "#Home" },
                { name: "Our Food", href: "#our-food" },
                { name: "Contact", href: "#contact" },
                { name: "About Us", href: "#about-us" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href} // Corrected
                  className="text-md hover:text-gray-300"
                >
                  {link.name} {/* Display the actual name */}
                </a>
              ))}

            </div>
          </nav>

          {/* Hero Section */}
          <div className="textcontainer roboto-custom w-full px-[20%]">
            <div className="text w-full sm:w-[50%]">
              <h3 className="text-4xl  leading-[1.2]">
                Welcome to <span className="text-4xl  text-white/70">'SpicyHeaven'</span> – The Ultimate Junk Food Paradise!
              </h3>
              <p className="sm:text-3xl w-full sm:w-[80%]  text-gray-950 font-extralight italic  text-sm  mt-10">
                From blazing hot Carolina Reapers to zesty sriracha drizzles, we bring the heat that lingers. Dare to take a bite?              </p>
              <button className="rounded-lg  hover:bg-black hover:text-[#fd2c2a] hover:border-white mt-6 border-[1px] border-white/40 py-1 px-5">
                Our Food
              </button>
            </div>
          </div>

          {/* Large Heading */}
          <div className="w-full absolute bottom-0 left-0 top-[39rem]">
            <h1
              ref={headingRef}
              className=" text-5xl flex justify-center sm:text-[14rem] underline uppercase font-extralight tracking-tight leading-none pl-5"
            >
              SpicyHeaven
            </h1>
          </div>
        </div>
      </div>

      <div className="border-[1px] border-black/10 w-[90%] max-w-[1200px] mx-auto bottom-0 mt-32">
      </div>

      {/* Second Screen */}

      <div className="h-screen relative">
        <h1 id="our-food" className="flex justify-center text-5xl roboto-custom mt-2">Dishes</h1>
        <div className="flex flex-wrap absolute z-[1]">
          {show &&
            data[1].map((canvasdetails, index) => (
              <Canvas key={index} details={canvasdetails} />
            ))}
        </div>

        <div className="w-full z-[1] justify-center flex items-center min-h-screen relative">
          <div
            className="max-h-[800px] overflow-y-auto scrollbar sm:grid sm:grid-cols-4 gap-4 p-10"
            data-scroll
          >          
            {recipes.map((recipe, index) => (
              <div key={index} className="w-60 p-4 border mt-2 border-gray-300 rounded-lg shadow-md bg-red-600/5">
                <img src={recipe.image} alt={recipe.name} className="w-full h-20 object-cover rounded-md" />
                <h4 className="text-lg font-bold mt-3">{recipe.name}</h4>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>⭐ {recipe.rating}</span>
                  <span>{recipe.cuisine}</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>

      <div className="border-[1px]  border-black/10 w-[90%] max-w-[1200px] mx-auto bottom-0  mt-48 sm:mt-32">
      </div>
      {/* third scrren */}
      <div className="h-screen relative">
        <div className="flex  absolute z-[-1] flex-wrap">
          {show &&
            data[2].map((canvasdetails, index) => (
              <Canvas key={index} details={canvasdetails} />
            ))}
        </div>

        <div>
          <div id="about-us" className="h-screen flex flex-col justify-center items-center text-center p-10">
            <h1 className="text-5xl font-bold">About Us</h1>

            <p className="text-lg mt-5 max-w-2xl">
              Welcome to <span className="font-semibold">SpicyHeaven</span>, your ultimate destination for spicy food lovers!
              We serve the best mouth-watering, fiery, and delicious dishes that leave a lasting impact on your taste buds.
              From sizzling hot wings to exotic spice-infused cuisines, our passion is to bring heat to your plate.
            </p>

            <p className="text-lg mt-3 max-w-2xl">
              Our chefs experiment with spices from around the world to bring you a unique experience.
              Whether you love mild flavors or crave extreme heat, we have something for every spice lover!
            </p>

            <p className="text-lg mt-5 font-semibold">🌎 We Serve Globally!</p>
            <p className="text-lg max-w-2xl">
              With 4 years of experience in the food industry, we have expanded to 7 branches across 4 countries.
              Our main headquarters is located in Delhi, India.
            </p>

            <p className="text-lg max-w-2xl mt-3">
              Join us on this spicy journey, and let's make your taste buds dance with flavors like never before!
            </p>

          </div>

        </div>
      </div>

      <div className="border-[1px] border-black/10 w-[90%] max-w-[1200px] mx-auto bottom-0 mt-32">
      </div>

      <div className="h-screen relative">
        <div className="flex  absolute z-[-1] flex-wrap">
          {show &&
            data[3].map((canvasdetails, index) => (
              <Canvas key={index} details={canvasdetails} />
            ))}
        </div>

        <div>
          <div id="contact" className="h-screen  flex flex-col justify-center items-center text-center p-10">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <p className="text-lg mt-5">Have questions? Want to collaborate? Reach out to us!</p>

            <form className="mt-8 w-96 p-6 border rounded-lg shadow-md bg-red-600/5">
              <div className="mb-4">
                <label className="block text-left font-semibold">Name</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Your Name" />
              </div>

              <div className="mb-4">
                <label className="block text-left font-semibold">Email</label>
                <input type="email" className="w-full p-2 border rounded-md" placeholder="Your Email" />
              </div>

              <div className="mb-4">
                <label className="block text-left font-semibold">Message</label>
                <textarea className="w-full p-2 border rounded-md" rows="4" placeholder="Your Message"></textarea>
              </div>

              <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700">
                Send Message
              </button>
            </form>

            <p className="mt-5 text-white">📍 123 Spicy Street, Food City, USA</p>
            <p className="text-white">📧 contact@spicyheaven.com</p>
            <p className="text-white">📞 +1 (123) 456-7890</p>
          </div>
        </div>
      </div>

      <div className="border-[1px] border-black/10 w-[90%] max-w-[1200px] mx-auto bottom-0 mt-32">
      </div>

    </>
  );
}

export default App;