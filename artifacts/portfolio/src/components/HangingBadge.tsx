import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import idPhoto from '@/assets/id-photo.png';

export function HangingBadge({ className = '' }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 40, damping: 6, mass: 1 });
  const springY = useSpring(y, { stiffness: 40, damping: 6, mass: 1 });

  const rotateZ = useTransform(springX, [-200, 200], [-35, 35]); 
  const rotateXBase = useTransform(springY, [-200, 200], [25, -25]); 
  const rotateY = useTransform(springX, [-200, 200], [-15, 15]);

  const hoverTilt = useSpring(0, { stiffness: 100, damping: 15 });
  
  useEffect(() => {
    hoverTilt.set(isHovered && !isDragging ? -15 : 0);
  }, [isHovered, isDragging, hoverTilt]);

  const finalRotateX = useTransform(() => rotateXBase.get() + hoverTilt.get());

  useEffect(() => {
    let animX: any;
    if (!isHovered && !isDragging && !isSettling) {
      animX = animate(x, [x.get(), 20, -20, 20], { 
        duration: 8, 
        ease: "easeInOut", 
        repeat: Infinity 
      });
    } else if (isHovered && !isDragging && !isSettling) {
      animX = animate(x, 0, { type: "spring", stiffness: 40, damping: 6 });
    }
    return () => {
      if (animX) animX.stop();
    };
  }, [isHovered, isDragging, isSettling, x]);

  const handlePanStart = () => {
    setIsDragging(true);
    setIsSettling(false);
  };
  
  const handlePan = (e: any, info: any) => {
    x.set(x.get() + info.delta.x);
    y.set(y.get() + info.delta.y);
  };

  const handlePanEnd = (e: any, info: any) => {
    setIsDragging(false);
    setIsSettling(true);
    
    const xAnimation = animate(x, 0, { type: "spring", stiffness: 40, damping: 5, mass: 1, velocity: info.velocity.x });
    animate(y, 0, { type: "spring", stiffness: 40, damping: 5, mass: 1, velocity: info.velocity.y });
    
    if (xAnimation && typeof xAnimation.then === 'function') {
      xAnimation.then(() => setIsSettling(false));
    } else {
      setTimeout(() => setIsSettling(false), 2000);
    }
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ perspective: "1000px" }}>
      <motion.div
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing touch-none"
        style={{ 
          transformOrigin: "50% -150px",
          rotateZ,
          rotateX: finalRotateX,
          rotateY,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {/* Lanyard Strap */}
        <div className="w-5 h-[150px] bg-[#121220] flex flex-col justify-end items-center overflow-hidden border-x border-white/5 relative z-0 mt-[-150px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <div 
            className="text-[9px] font-bold text-primary/70 tracking-[0.3em] mb-4 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
          >
            GERALD JAY ABIERA
          </div>
        </div>

        {/* Clip */}
        <div className="w-8 h-6 -mt-1 bg-[#1a1a2e] rounded-md border border-white/10 flex flex-col items-center justify-center z-10 shadow-neu-sm">
          <div className="w-4 h-1.5 rounded-full border border-primary/50 mb-0.5"></div>
          <div className="w-3 h-2 bg-white/5 border border-white/10 rounded-sm"></div>
        </div>

        {/* Badge Card */}
        <div className="w-64 -mt-1 neu-panel p-2 rounded-2xl z-20 shadow-neu-flat border border-white/10 bg-[#1a1a2e] group">
          <div className="bg-[#121220] rounded-xl overflow-hidden p-4 border border-white/5 relative flex flex-col h-[340px]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] pointer-events-none" />
            
            {/* Logo/Header */}
            <div className="flex justify-between items-center mb-3 relative z-10">
              <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full">
                Developer
              </div>
              <div className="text-primary font-bold text-base">G<span className="text-white">.</span></div>
            </div>

            {/* Photo Container */}
            <div className="w-full flex-1 mb-3 rounded-lg overflow-hidden relative">
              <img 
                src={idPhoto} 
                alt="Gerald Jay Abiera" 
                className="w-full h-full object-cover object-top pointer-events-none" 
              />
            </div>

            {/* Details */}
            <div className="relative z-10 text-center pb-1">
              <h3 className="font-bold text-white text-lg tracking-tight">GERALD J. ABIERA</h3>
              <p className="text-primary text-[11px] font-mono mt-0.5">ID: GJA-8091</p>
              
              {/* Barcode */}
              <div className="mt-3 flex justify-center items-end h-5 gap-[1px] opacity-40">
                {Array.from({length: 24}).map((_, i) => (
                  <div key={i} className="bg-white rounded-t-sm" style={{ width: i % 3 === 0 ? '2px' : '1px', height: `${40 + (i * 7 % 60)}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
