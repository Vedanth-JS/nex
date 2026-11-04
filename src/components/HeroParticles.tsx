import React, { useMemo } from 'react';

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export const HeroParticles: React.FC = () => {
  // Generate 25 deterministic, subtle floating particles in Midnight Aurora palette
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(124, 92, 255, 0.5)',  // aurora violet
      'rgba(225, 75, 255, 0.45)', // aurora magenta
      'rgba(255, 181, 71, 0.5)',  // aurora amber
      'rgba(245, 243, 255, 0.4)', // aurora text
    ];
    
    const list: Particle[] = [];
    for (let i = 0; i < 25; i++) {
      const top = (10 + ((i * 37) % 80)).toFixed(1) + '%';
      const left = (5 + ((i * 43) % 90)).toFixed(1) + '%';
      const size = 2 + (i % 3);
      const color = colors[i % colors.length];
      const duration = 6 + (i % 5) * 2;
      const delay = ((i * 1.3) % 5);
      list.push({ id: i, top, left, size, color, duration, delay });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;
