import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from 'react-icons/ri';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      toast.error("Please fill in all fields.");
      return;
    }

    const user = { userMail: email, userPassword: password, firstName, lastName, phoneNumber };

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
  const infoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(infoRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 });
    gsap.fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });
  }, []);

  return (
    <div className="relative w-full h-screen bg-center bg-cover" style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original//pQcp3prf6A0x9E13pBgXZvWPtEy.jpg")' }}>
      <i ref={RiArrowLeftLine} onClick={() => navigate(-1)} className="m-3 cursor-pointer text-zinc-200 font-bold text-2xl ri-arrow-left-line hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"></i>
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
        <div className="max-w-lg mx-auto p-6 rounded-lg  text-gray-100 shadow-lg" ref={formRef}>
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Unlimited movies, TV shows, and more</h1>
            <h2 className="text-xl mb-8">Watch anywhere. Stream anytime.</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900">
              <input type="text" placeholder="First Name" className="p-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder="Last Name" className="p-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type="email" placeholder="Email address" className="p-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" className="p-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="tel" placeholder="Phone Number" className="p-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <button type="submit" className="w-full mt-6 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300">Get Started</button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm font-semibold">Already have an account?</span>
            <Link to="/myspace" className="ml-2 text-blue-600 hover:text-blue-700">Vybe in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
