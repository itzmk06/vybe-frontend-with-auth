import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import './SideNav.css';
import { toast } from 'react-hot-toast';

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState === 'open') {
      setIsOpen(true);
      openSidebar();
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape') closeSidebar();
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.burger-menu')) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    closeSidebar(); 
  }, [location.pathname]); 

  const openSidebar = () => {
    gsap.to(sidebarRef.current, { duration: 0.5, x: 0, ease: 'power2.out' });
    gsap.to(backdropRef.current, { duration: 0.5, opacity: 0.6, ease: 'power2.out' });
  };

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, { duration: 0.5, x: '0%', ease: 'power2.inOut' });
    gsap.to(backdropRef.current, { duration: 0.5, opacity: 0, ease: 'power2.inOut' });
    setIsOpen(false); 
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarState', newState ? 'open' : 'closed');
    if (newState) {
      openSidebar();
    } else {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    toast.success('Successfully logged out');
    navigate('/myspace');
    console.log('Logged out');
    closeSidebar();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className={`burger-menu ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        role="button"
      >
        <i className="ri-menu-line text-[1.7rem]"></i>
        <i className="ri-close-line"></i>
      </div>
      <div className={`backdrop ${isOpen ? 'visible' : ''}`} onClick={closeSidebar}></div>
      <div ref={sidebarRef} className={`navChange ${isOpen ? 'open' : ''}`}>
        <div className="header">
          <a href="https://great-taxes-cheat.loca.lt" target="_blank" rel="noopener noreferrer">
            <h1 className='logo p-4 flex items-center'>
              <i className="ml-[-6%] fi fi-sr-play-alt text-[#009FFD] text-3xl rounded-lg"></i>
              <span className='ml-3 font-jose1 text-3xl'>Vybe</span>
            </h1>
          </a>
        </div>
        <nav className='flex flex-col gap-3 mt-4 text-lg font-bold'>
          <Link to={'/home'} className={`nav-item ${isActive('home') ? 'active' : ''}`} onClick={closeSidebar}>
            <i className="fi fi-sr-home text-xl mr-4 ml-1 mt-[1.3%]"></i>
            <span className="nav-text">Home</span>
            {isActive('/home') && (
              <div className="green-dot-container">
                <span className="green-dot"></span>
                <span className="ripple"></span>
              </div>
            )}
          </Link>
          <Link to={"/trending"} className={`nav-item ${isActive('/trending') ? 'active' : ''}`} onClick={closeSidebar}>
            <i className="ri-fire-fill text-2xl mr-3"></i>
            <span className="nav-text">Trending</span>
            {isActive('/trending') && (
              <div className="green-dot-container">
                <span className="green-dot"></span>
                <span className="ripple"></span>
              </div>
            )}
          </Link>
          <Link to={'/popular'} className={`nav-item ${isActive('/popular') ? 'active' : ''}`} onClick={closeSidebar}>
            <i className="ri-sparkling-2-fill text-2xl mr-3"></i>
            <span className="nav-text">Popular</span>
            {isActive('/popular') && (
              <div className="green-dot-container">
                <span className="green-dot"></span>
                <span className="ripple"></span>
              </div>
            )}
          </Link>
          <Link to={'/movie'} className={`nav-item ${isActive('/movie') ? 'active' : ''}`} onClick={closeSidebar}>
            <i className="fi fi-sr-clapperboard-play text-2xl mr-4  mt-[1.3%]"></i>
            <span className="nav-text">Movies</span>
            {isActive('/movie') && (
              <div className="green-dot-container">
                <span className="green-dot"></span>
                <span className="ripple"></span>
              </div>
            )}
          </Link>
          <Link to={'/tv'} className={`nav-item ${isActive('/tv') ? 'active' : ''}`} onClick={closeSidebar}>
            <i className="fi fi-sr-screen text-2xl mr-3  mt-[1.5%]"></i>
            <span className="nav-text">Tv Shows</span>
            {isActive('/tv') && (
              <div className="green-dot-container">
                <span className="green-dot"></span>
                <span className="ripple"></span>
              </div>
            )}
          </Link>
          <Link to={'/person'} className={`nav-item ${isActive('/person') ? 'active' : ''}`} onClick={() =>('/person')}>
            <i className="ri-group-fill text-2xl mr-3"></i>
            <span className="nav-text">People</span>
            <span className="text-xs ml-3 bg-purple-600 px-1 py-1 rounded-lg font-black text-white">Coming Soon</span>
            {isActive('/person') && (
              <div className="green-dot-container">
                <span className="green-dot"></span>
                <span className="ripple"></span>
              </div>
            )}
          </Link>
        </nav>
        <button className='nav-item logout font-bold' onClick={handleLogout}>
          <i className="ri-logout-box-r-line text-2xl mr-3"></i>
          Logout
        </button>
      </div>
    </>
  );
}

export default SideNav;
