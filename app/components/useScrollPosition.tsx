import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setIsAtTop(position <= 10); // Changed from 50 to 10 for instant response
    };

    // Use requestAnimationFrame for smoother updates
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { scrollPosition, isAtTop };
};