import { useEffect } from 'react';

const Loader = () => {
  useEffect(() => {
    import('@dotlottie/player-component');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='absolute flex justify-center items-center w-screen h-screen left-7 bottom-10 sm:left-7 top-1 '>
      <dotlottie-player 
        src="https://lottie.host/9ba17c43-4851-48eb-a81c-a8486a9fd498/5Y4eFlDzAS.json"
        background="transparent"
        speed="1"
        style={{ width: '200px', height: '200px' }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default Loader;
