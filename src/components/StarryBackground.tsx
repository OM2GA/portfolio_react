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
}

export const StarryBackground = ({ gravity, center, isTraveling }: StarryBackgroundProps) => {
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
      // Pendant le voyage, on décale légèrement les étoiles et on les étire
      // sans les faire sortir de l'écran
      return { 
        left: `${star.x + 15}%`, 
        top: `${star.y}%`,
        width: star.size * 12, // Étirement warp drive
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
      <motion.div 
        animate={{ 
          x: isTraveling ? "-10%" : "0%", // Parallaxe plus doux
          scale: isTraveling ? 1.2 : 1
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 opacity-40"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#001f3f]/30 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4f378b]/20 blur-[120px] rounded-full" />
      </motion.div>

      {stars.map((star) => {
        const targetPos = getTargetPosition(star);
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            initial={{ opacity: 0 }}
            animate={{
              left: targetPos.left,
              top: targetPos.top,
              width: targetPos.width,
              opacity: isTraveling ? 0.6 : [0.4, 1, 0.4],
            }}
            transition={{
              left: isTraveling 
                ? { duration: 0.8, ease: "easeInOut" }
                : { type: "spring", stiffness: 300, damping: 25 },
              top: isTraveling 
                ? { duration: 0.8, ease: "easeInOut" }
                : { type: "spring", stiffness: 300, damping: 25 },
              width: { duration: 0.8, ease: "easeInOut" },
              opacity: isTraveling 
                ? { duration: 0.5 } 
                : { duration: star.duration, repeat: Infinity, delay: star.delay }
            }}
            style={{
              height: star.size,
              width: star.size,
            }}
          />
        );
      })}
    </div>
  );
};
