import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from 'react-icons/ri';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-hot-toast';


gsap.registerPlugin(ScrollTrigger);

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = { userMail: email, userPassword: password }; 
    
    try {
      const response = await fetch("http://localhost:8080/student/signup", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.text();

      if (response.ok) {
        toast.success("Sign up successful!");
        navigate("/home");
      } else if (response.status === 400 && responseData === "Email already exists") {
        toast.error("Email already registered");
      } else {
        toast.error("Failed to sign up");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const formRef = useRef(null);
  const headingRef = useRef(null);
  const bgImageRef = useRef(null);
  const infoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(bgImageRef.current, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 2 });
    tl.fromTo(infoRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 }, '-=1.5');
    tl.fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, '-=1.5');
    gsap.fromTo([formRef.current, buttonRef.current], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });
  }, []);

  return (
    <div className="relative w-full h-screen bg-center bg-cover flex items-center justify-center text-white" style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original//pQcp3prf6A0x9E13pBgXZvWPtEy.jpg")' }} ref={bgImageRef}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-20">
        <h1 className="text-2xl md:text-4xl font-jose1 font-bold flex items-center">
          <RiArrowLeftLine onClick={() => navigate(-1)} className="text-lg md:text-md mr-2 md:mr-4 cursor-pointer hover:text-blue-500 transition-transform transform hover:-translate-x-1" />
          Vybe
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-sm md:text-lg font-jose font-semibold">Already have an account?</span>
          <Link to="/myspace" className="px-2 md:px-4 py-1 md:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">Vybe in</Link>
        </div>
      </div>

      <div className="z-20 text-center space-y-4 p-4 md:p-6 mx-auto" ref={infoRef}>
        <h1 className="text-2xl md:text-4xl font-jose2 font-black" ref={headingRef}>Unlimited movies, TV shows, and more</h1>
        <h2 className="text-lg md:text-2xl font-jose2 font-semibold leading-5">Watch anywhere. Stream anytime.</h2>
        <h2 className="text-lg md:text-2xl mt-[-4%] md:mt-[-7%] font-jose2 font-semibold">Ready to watch? Enter your email to create or restart your membership.</h2>
        <form onSubmit={handleSubmit} className="mt-6" ref={formRef}>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input type="email" placeholder="Email address" className="w-full sm:w-[76%] p-3 md:p-4 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow transform group-hover:scale-105 font-semibold" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full sm:w-[76%] p-3 md:p-4 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow transform group-hover:scale-105 font-semibold" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="w-full sm:w-auto px-4 py-3 md:px-6 md:py-4 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 transform group-hover:scale-105 font-bold shadow-lg shadow-red-500/50" ref={buttonRef}>Get Started</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
