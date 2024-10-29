"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
  
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    return (
      <button
        className={`fixed bottom-4 right-4 p-3 bg-[#FFE047] text-white rounded-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={scrollToTop}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <Image
            src="/assets/images/icons/flecha-arriba.svg"
            width={30}
            height={30}
            alt="Picture of the author"
        />
      </button>
    );
  };
  
  export default ScrollToTopButton;