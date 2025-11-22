import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're not on the home page
    // On home page, sections handle their own scrolling
    if (pathname !== '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // If on home page, scroll to top initially
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;

