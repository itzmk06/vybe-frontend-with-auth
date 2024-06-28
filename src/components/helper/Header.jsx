import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const Header = ({ data }) => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (headerRef.current && titleRef.current && descriptionRef.current && buttonRef.current && data) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=1'
      );
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=1.2'
      );
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.8'
      );
      tl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
        '-=0.8'
      );

      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: 'power3.out' });
      });
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' });
      });

      gsap.to(headerRef.current, {
        backgroundPositionX: '50%',
        duration: 2,
        ease: 'power1.out',
      });

      const titleText = titleRef.current.textContent;
      titleRef.current.textContent = '';
      gsap.to(titleRef.current, {
        duration: 1,
        text: titleText,
        ease: 'none',
        onComplete: () => {
          const titleChars = titleRef.current.querySelectorAll('.char');
          if (titleChars.length > 0) {
            gsap.from(titleChars, {
              duration: 1.5,
              y: 'random(-50, 50)',
              opacity: 0,
              stagger: 0.05,
              ease: 'power3.out',
            });
          }
        },
      });

      gsap.fromTo(
        Array.from(descriptionRef.current.children),
        { opacity: 0, y: 20 },
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          delay: 1.5,
          ease: 'power3.out',
          stagger: 0.1, 
        }
      );
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div
      ref={headerRef}
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.1), 
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.9)
          ), 
          url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
      }}
      className="w-full h-[60vh] mt-[-10.5vh] flex flex-col justify-end p-[2%] items-start"
    >
      <h1 ref={titleRef} className="text-white font-jose font-bold text-3xl w-[50%] mb-2">
        {data.title || data.name || data.original_title || data.original_name}
      </h1>
      <p ref={descriptionRef} className="text-zinc-300 font-semibold text-lg w-[60%] font-jose2">
        {data.overview?.slice(0, 300)}...{' '}
        <Link to={`${data.media_type}/details/${data.id}`} className="text-blue-500 ml-1">
          more
        </Link>
      </p>
      <Link
        ref={buttonRef}
        to={`/${data.media_type}/details/${data.id}`}
        className="flex justify-center items-center px-4 py-2 bg-[#009FFD] rounded-lg text-white text-sm font-bold mt-4 transform hover:scale-110 transition-transform duration-300 ease-in-out"
        style={{ overflow: 'hidden' }}
      >
        <i className="text-lg text-zinc-800 mr-2 ri-play-circle-fill"></i>Watch Trailer
        <span
          className="absolute top-0 left-0 w-full h-full bg-[#009FFD] rounded-lg opacity-25"
          style={{ transform: 'translateX(-110%)', zIndex: -1 }}
        ></span>
        <span
          className="absolute top-0 left-0 w-full h-full bg-[#fff] rounded-lg opacity-25"
          style={{ transform: 'translateX(110%)', zIndex: -1 }}
        ></span>
      </Link>
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    backdrop_path: PropTypes.string,
    profile_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    original_title: PropTypes.string,
    original_name: PropTypes.string,
    overview: PropTypes.string,
    media_type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default Header;
