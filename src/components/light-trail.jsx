import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LightTrail = ({ theme }) => {
  const containerRef = useRef(null);
  const activeAnimationsRef = useRef([]);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    isFirstRenderRef.current = false;

    const container = containerRef.current;

    const colors = [
      'rgb(99, 102, 241)',  // Indigo
      'rgb(79, 70, 229)',   // Deep indigo
      'rgb(67, 56, 202)',   // Darker indigo
      'rgb(124, 58, 237)',  // Purple
      'rgb(109, 40, 217)',  // Deep purple
    ];

    let isKilled = false;

    // Set initial container background
    container.style.backgroundColor = theme === 'dark' ? '#111827' : '#ffffff';
    container.style.opacity = 1;

    const createBlockAnimation = () => {
      if (isKilled) return null;

      const block = document.createElement('div');
      const trail = document.createElement('div');
      const wrapper = document.createElement('div');

      const startX = -200;
      const startY = Math.random() * window.innerHeight;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const width = 100 + Math.random() * 150;
      const height = 30 + Math.random() * 20;
      const duration = 0.3 + Math.random() * 0.2;
      const skewX = -20 - Math.random() * 10;

      wrapper.style.opacity = 1;

      block.style.cssText = `
        position: absolute;
        left: ${startX}px;
        top: ${startY}px;
        width: ${width}px;
        height: ${height}px;
        background-color: ${color};
        transform: skewX(${skewX}deg);
        opacity: 0;
        filter: blur(1px);
      `;

      trail.style.cssText = `
        position: absolute;
        left: ${startX - 50}px;
        top: ${startY}px;
        width: ${width + 100}px;
        height: ${height}px;
        background-color: ${color};
        transform: skewX(${skewX - 10}deg);
        opacity: 0;
        filter: blur(6px);
      `;

      wrapper.appendChild(trail);
      wrapper.appendChild(block);
      container.appendChild(wrapper);

      activeAnimationsRef.current.push(wrapper);

      // Animate block from left to right
      gsap.fromTo([block, trail],
        {
          opacity: 0,
          x: 0
        },
        {
          opacity: (i) => i === 0 ? 0.8 : 0.2,
          x: window.innerWidth + 400,
          duration: duration,
          ease: "power1.inOut",
          onComplete: () => {
            wrapper.remove();
            activeAnimationsRef.current = activeAnimationsRef.current.filter(w => w !== wrapper);
          }
        }
      );
    };

    // Create initial batch of blocks
    for (let i = 0; i < 30; i++) {
      setTimeout(createBlockAnimation, i * 50);
    }

    // Continue creating blocks until killed
    const interval = setInterval(() => {
      if (!isKilled && document.visibilityState !== 'hidden') {
        createBlockAnimation();
      }
    }, 50);

    // Start fading out the entire container after a delay
    gsap.to(container, {
      opacity: 0,
      duration: 1.2, // Longer duration for smoother fade
      ease: "power1.inOut",
      delay: .3, // Start fading after blocks have started
      onStart: () => {
        // Keep creating blocks during fade out
        setTimeout(() => {
          isKilled = true;
        }, 800);
      },
      onComplete: () => {
        container.style.display = 'none';
        activeAnimationsRef.current.forEach(wrapper => wrapper.remove());
        activeAnimationsRef.current = [];
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ opacity: 1 }}
    />
  );
};

export default LightTrail;