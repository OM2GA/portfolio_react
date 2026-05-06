import { motion } from "motion/react";

export function CVButton() {
  const handleViewCV = () => {
    window.open('/CV Maxence Coste.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleViewCV}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "rgba(208, 188, 255, 0.05)",
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-2.5 px-6 py-2 bg-transparent border border-[#d0bcff]/30 rounded-md overflow-hidden transition-all duration-300"
    >
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-[#d0bcff]/60 group-hover:text-[#d0bcff] transition-colors"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>

      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d0bcff]/60 group-hover:text-[#d0bcff] transition-colors">
        Consulter mon CV
      </span>
      
      {/* Subtle hover line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-[#d0bcff]/40 group-hover:w-3/4 transition-all duration-500 ease-out" />
    </motion.button>
  );
}
