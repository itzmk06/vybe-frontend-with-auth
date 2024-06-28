import  { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

  const toggleScrollToTopButton = () => {
    if (window.scrollY > 300) {
      setScrollToTopVisible(true);
    } else {
      setScrollToTopVisible(false);
    }
  };

  window.addEventListener('scroll', toggleScrollToTopButton);

  return (
    <ScrollContext.Provider value={{ isScrollToTopVisible }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
