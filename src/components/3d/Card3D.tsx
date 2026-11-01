import React, { useState, useRef, MouseEvent, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // Tilt intensity (default: 12)
  glareOpacity?: number;
  depth?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 10,
  glareOpacity = 0.15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top;  // y position within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: '1200px' }}
      className="inline-block w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered 
            ? `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)` 
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
