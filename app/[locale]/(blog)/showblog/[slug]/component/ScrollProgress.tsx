'use client';

import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const updateScrollProgress = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.documentElement.style.setProperty(
        '--scroll-progress',
        `${scrolled}%`
      );
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return null;
}