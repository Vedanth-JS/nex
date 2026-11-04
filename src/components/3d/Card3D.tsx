import React, { useState, useRef, useEffect, MouseEvent, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // Tilt intensity (capped at max 8 degrees)
  glareOpacity?: number;
  depth?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 8,
  glareOpacity = 0.15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionMedia.addEventListener('change', motionListener);

    const touchMedia = window.matchMedia('(pointer: coarse)');
    const touchListener = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    touchMedia.addEventListener('change', touchListener);

    const handleResize = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      motionMedia.removeEventListener('change', motionListener);
      touchMedia.removeEventListener('change', touchListener);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // On touch devices or reduced motion, disable tilt to prevent layout distortion & scroll lag
  const disableTilt = prefersReducedMotion || isTouchDevice;

  // Cap intensity at max 8 degrees as per performance & design rules
  const effectiveIntensity = Math.min(intensity, 8);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * effectiveIntensity;
    const rotY = ((x - centerX) / centerX) * effectiveIntensity;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    if (!disableTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // On mobile/touch, render clean, fluid static container with zero 3D overhead
  if (disableTilt) {
    return (
      <div className={`w-full h-full relative rounded-3xl ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: '1000px' }}
      className="inline-block w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)` 
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered 
            ? 'transform 0.1s ease-out' 
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-3xl will-change-transform ${className}`}
      >
        {/* Holographic Specular Glare Layer */}
        {isHovered && (
          <div
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 60%)`,
              pointerEvents: 'none',
              transform: 'translateZ(25px)',
            }}
            className="absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
          />
        )}

        {/* Content with 3D Depth support */}
        <div style={{ transformStyle: 'preserve-3d' }} className="w-full h-full relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card3D;
