import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const Input = ({ id, label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col relative">
      <label htmlFor={id} className="text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="font-semibold w-full px-4 py-3 rounded-xl bg-gray-700 bg-opacity-50 focus:outline-none focus:bg-gray-900 transition duration-300 text-white placeholder-gray-400 border border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none"
          >
            {showPassword ? (
              <FaEyeSlash className="text-white" />
            ) : (
              <FaEye className="text-white" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginContainerRef = useRef(null);
  const formRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const linkRef = useRef(null);
  const headingRef = useRef(null);
  const bgImageRef = useRef(null);
  const arrowRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(bgImageRef.current, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 2 });
    tl.fromTo(loginContainerRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5 });
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.8, rotation: -360 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.5 }, '-=1');
    tl.fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, '-=1');
    tl.fromTo(infoRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 }, '-=1');

    gsap.fromTo(formRef.current.children, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
    });

    gsap.fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, {
      opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: buttonRef.current, start: 'top 80%' },
    });

    gsap.fromTo(linkRef.current, { opacity: 1, y: 20 }, {
      opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: linkRef.current, start: 'top 80%' },
    });

    gsap.fromTo(arrowRef.current, { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: arrowRef.current, start: 'top 80%' },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const user = { userMail: email, userPassword: password };

    fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(response => response.text())
      .then(message => {
        if (message === "Login successful!") {
          toast.success("Login successful!");
          navigate('/home');
        } else {
          toast.error(message);
        }
      })
      .catch(error => {
        toast.error("An error occurred during login. Please try again.");
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <div ref={bgImageRef} className="hidden lg:flex w-2/3 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original//ySgY4jBvZ6qchrxKnBg4M8tZp8V.jpg")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-55"></div>
        <div className="absolute bottom-8 left-8 text-white space-y-4 p-4 rounded-lg bg-opacity-30" ref={infoRef}>
          <h1 className="leading-5 text-5xl font-extrabold font-jose1">You are in Vybe!</h1>
          <p className="text-lg max-w-md font-semibold font-jose2">Discover and stream your favorite movies seamlessly.</p>
        </div>
      </div>

      <div ref={loginContainerRef} className="w-full lg:w-1/3 flex items-center justify-center p-6 mr-10">
        <div className="bg-[#252833] bg-opacity-40 backdrop-blur-xs p-10 rounded-3xl shadow-2xl text-white max-w-md w-full space-y-8">
          <img src="logo.svg" alt="Logo" className="mx-auto w-[3rem] h-auto mb-6" ref={logoRef} />
          <h1 className="text-4xl font-extrabold text-center mb-8 font-jose1" ref={headingRef}>Vybe in</h1>
          <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
            <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <button ref={buttonRef} type="submit" className="w-full bg-[#009FFD] hover:bg-[#00a0fde7] text-white font-bold py-3 rounded-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#009FFD] focus:ring-opacity-50 transform hover:scale-105">Sign In</button>
          </form>
          <div className="flex justify-between text-sm mt-4 text-zinc-500">
            <span className="text-zinc-100">Not registered yet?</span>
            <Link to="/myspace/sign" className="text-blue-500 hover:underline mt-[-1rem]" ref={linkRef}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
