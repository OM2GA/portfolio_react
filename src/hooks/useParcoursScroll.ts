import { useState, useEffect, type RefObject } from 'react';
import { timelineData } from '../data/portfolioData';

export const useParcoursScroll = (containerRef: RefObject<HTMLElement | null>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeThemeColor, setActiveThemeColor] = useState('#d0bcff');

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const index = Math.round(scrollTop / window.innerHeight);
        setCurrentIndex(index);
        if (timelineData[index]) {
          setActiveThemeColor(timelineData[index].color);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial call to set color
      handleScroll();
    }
    
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current || !timelineData[index]) return;
    
    containerRef.current.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return {
    currentIndex,
    activeThemeColor,
    scrollToIndex
  };
};
