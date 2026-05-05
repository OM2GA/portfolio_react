import { motion } from "motion/react";

interface CentralSunProps {
  isTraveling: boolean;
  isLoading: boolean;
}

export function CentralSun({ isTraveling, isLoading }: CentralSunProps) {
  return (
    <motion.div
      animate={{
        scale: isTraveling || isLoading ? 0.5 : [1, 1.05, 1],
        rotate: 360,
        boxShadow: [
          "0 0 80px rgba(245,158,11,0.6), 0 0 150px rgba(234,88,12,0.4), 0 0 300px rgba(245,158,11,0.2)",
          "0 0 120px rgba(245,158,11,0.8), 0 0 200px rgba(234,88,12,0.5), 0 0 400px rgba(245,158,11,0.3)",
          "0 0 80px rgba(245,158,11,0.6), 0 0 150px rgba(234,88,12,0.4), 0 0 300px rgba(245,158,11,0.2)",
        ],
      }}
      transition={{
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-200 via-orange-400 to-red-500 flex items-center justify-center"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_60%)] opacity-40" />
      <div className="absolute inset-[-20px] rounded-full bg-orange-500/20 blur-2xl animate-pulse" />
      <div className="absolute inset-[-40px] rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="z-20"
      >
        <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Compétences
        </h2>
      </motion.div>
    </motion.div>
  );
}
