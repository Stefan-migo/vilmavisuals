import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface GlareHoverProps {
  children: ReactNode;
  className?: string;
}

const GlareHover = ({ children, className = '' }: GlareHoverProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const calculatedAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    
    setAngle(calculatedAngle);
    
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      cardRef.current.style.setProperty('--angle', `${calculatedAngle}deg`);
    }
    
    // Allow event to propagate to child SpotlightCard
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glare-hover ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        width: '100%',
        borderRadius: '0.5rem',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      {isHovered && (
        <>
          <div
            ref={glareRef}
            className="glare-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.7), transparent 70%)`,
              pointerEvents: 'none',
              opacity: 1,
              transition: 'opacity 0.15s ease',
              zIndex: 2,
              mixBlendMode: 'overlay',
            }}
          />
          <div
            className="glare-gradient"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(${angle}deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)`,
              pointerEvents: 'none',
              opacity: 1,
              transition: 'opacity 0.15s ease',
              zIndex: 3,
              mixBlendMode: 'soft-light',
            }}
          />
        </>
      )}
    </div>
  );
};

export default GlareHover;
