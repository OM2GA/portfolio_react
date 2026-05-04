import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface StarryBackgroundProps {
  gravity: 'left' | 'right' | 'down' | null;
  center?: { x: number; y: number } | null;
  isTraveling?: boolean;
  travelDirection?: 'left' | 'right';
  themeColor?: string;
}

export const StarryBackground = ({ gravity, center, isTraveling, travelDirection = 'left', themeColor = "#4f378b" }: StarryBackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const getTargetPosition = (star: Star) => {
    if (isTraveling) {
      return { 
        left: `${star.x}%`, 
        top: `${star.y}%`,
        width: star.size * 15,
        opacity: 0.7
      };
    }
    if (!gravity || !center || star.id >= 60) return { left: `${star.x}%`, top: `${star.y}%`, width: star.size, opacity: 1 };
    
    const id = star.id;
    const spread = 0.5; 
    const rx = Math.sin(id * 1.1) * spread;
    const ry = Math.cos(id * 1.3) * spread;

    let tx = center.x, ty = center.y;
    const arrowSize = 8;

    if (gravity === 'left') {
      if (id < 35) {
        tx = center.x - arrowSize/2 + (id / 35) * arrowSize;
        ty = center.y;
      } else if (id < 48) {
        const t = (id - 35) / 13;
        tx = center.x - arrowSize/2 + t * (arrowSize/2.5);
        ty = center.y - t * (arrowSize/2.5);
      } else {
        const t = (id - 48) / 12;
        tx = center.x - arrowSize/2 + t * (arrowSize/2.5);
        ty = center.y + t * (arrowSize/2.5);
      }
    } else if (gravity === 'right') {
      if (id < 35) {
        tx = center.x + arrowSize/2 - (id / 35) * arrowSize;
        ty = center.y;
      } else if (id < 48) {
        const t = (id - 35) / 13;
        tx = center.x + arrowSize/2 - t * (arrowSize/2.5);
        ty = center.y - t * (arrowSize/2.5);
      } else {
        const t = (id - 48) / 12;
        tx = center.x + arrowSize/2 - t * (arrowSize/2.5);
        ty = center.y + t * (arrowSize/2.5);
      }
    } else if (gravity === 'down') {
      if (id < 40) {
        tx = center.x;
        ty = (center.y + arrowSize/2) - (id / 40) * (arrowSize * 1.5);
      } else if (id < 50) {
        const t = (id - 40) / 10;
        tx = center.x - t * (arrowSize/2.5);
        ty = (center.y + arrowSize/2) - t * (arrowSize/2.5);
      } else {
        const t = (id - 50) / 10;
        tx = center.x + t * (arrowSize/2.5);
        ty = (center.y + arrowSize/2) - t * (arrowSize/2.5);
      }
    }

    return { left: `${tx + rx}%`, top: `${ty + ry}%`, width: star.size, opacity: 1 };
  };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#000814]">
      {/* Fond atmosphérique dynamique - INCHANGÉ */}
      <motion.div 
        animate={{ backgroundColor: themeColor }}
        transition={{ duration: 2 }}
        className="absolute inset-0 opacity-[0.08]"
      />

      {/* Nébuleuses et Halo - RÉTABLIS À L'ORIGINAL (fixes) */}
      <motion.div 
        animate={{ 
          x: isTraveling ? (travelDirection === 'left' ? "10%" : "-10%") : "0%",
          scale: isTraveling ? 1.2 : 1
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <motion.div 
          animate={{ backgroundColor: themeColor, scale: [1, 1.2, 1] }}
          transition={{ backgroundColor: { duration: 2 }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] blur-[150px] rounded-full opacity-40" 
        />
        <motion.div 
          animate={{ backgroundColor: themeColor, scale: [1.2, 1, 1.2] }}
          transition={{ backgroundColor: { duration: 2 }, scale: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full opacity-30" 
        />
        <motion.div 
          animate={{ backgroundColor: themeColor }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[180px] rounded-full opacity-10"
        />
      </motion.div>

      {/* ÉTOILES UNIQUEMENT - Système de boucle infinie */}
      <motion.div 
        animate={{ 
          x: isTraveling ? (travelDirection === 'left' ? ["0%", "-50%"] : ["0%", "50%"]) : "0%",
        }}
        transition={{ 
          x: isTraveling ? { duration: 10, repeat: Infinity, ease: "linear" } : { duration: 1.5, ease: "easeInOut" },
        }}
        className="absolute top-0 bottom-0 left-0 w-[200%] h-full"
        style={{ x: travelDirection === 'left' ? '0%' : '-50%' }}
      >
        {[0, 1].map((blockIndex) => (
          <div 
            key={blockIndex} 
            className="absolute top-0 bottom-0 w-1/2" 
            style={{ left: `${blockIndex * 50}%` }}
          >
            {stars.map((star) => {
              const targetPos = getTargetPosition(star);
              return (
                <motion.div
                  key={`${star.id}-${blockIndex}`}
                  className="absolute rounded-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{
                    left: targetPos.left,
                    top: targetPos.top,
                    width: targetPos.width,
                    opacity: isTraveling ? 0.6 : [0.4, 1, 0.4],
                  }}
                  transition={{
                    left: isTraveling ? { duration: 0 } : { type: "spring", stiffness: 130, damping: 18 },
                    top: isTraveling ? { duration: 0 } : { type: "spring", stiffness: 130, damping: 18 },
                    width: { duration: 0.8, ease: "easeInOut" },
                    opacity: isTraveling 
                      ? { duration: 0.5 } 
                      : { duration: star.duration, repeat: Infinity, delay: star.delay }
                  }}
                  style={{ height: star.size, width: star.size }}
                />
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
