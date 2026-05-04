import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { StarryBackground } from "../layout/StarryBackground";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 100;
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      <StarryBackground gravity={null} center={null} isTraveling={true} travelDirection="left" themeColor="#4f378b" />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 md:w-40 md:h-40 border-t-2 border-r-2 border-[#d0bcff] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-b-2 border-l-2 border-[#d0bcff]/40 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-black text-[#d0bcff] tracking-tighter">MC</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d0bcff]/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d0bcff]/60">Initialisation du système</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d0bcff]/40" />
          </div>
          
          <div className="w-48 h-1 bg-white/5 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#d0bcff]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#d0bcff] blur-sm"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <span className="text-[10px] font-mono text-[#d0bcff]/40">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      
      {/* Lignes de scan HUD */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </motion.div>
  );
}
