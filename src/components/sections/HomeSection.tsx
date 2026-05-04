import { motion } from "motion/react";
import { useState } from "react";
import type { ContactInfo } from "../../types";
import { getContactInfo } from "../../data/portfolioData";

interface HomeSectionProps {
  isTraveling: boolean;
  isLoading: boolean;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences') => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void;
  setHoveredButton: (label: string | null) => void;
  setButtonCenter: (center: { x: number; y: number } | null) => void;
}

export function HomeSection({
  isTraveling,
  isLoading,
  hoveredButton,
  handleSectionChange,
  handleMouseEnter,
  setHoveredButton,
  setButtonCenter
}: HomeSectionProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const contactInfo = getContactInfo();

  const handleContactAction = (info: ContactInfo) => {
    if (info.type === 'copy') {
      navigator.clipboard.writeText(info.value);
      setCopyFeedback(info.label);
      setTimeout(() => setCopyFeedback(null), 2000);
    } else if (info.type === 'link' && info.href) {
      window.open(info.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="w-1/3 h-full flex items-center justify-center p-6 bg-transparent">
      <div className="max-w-4xl w-full z-10">
        <motion.div animate={{ opacity: (isTraveling || isLoading) ? 0 : 1 }} className="flex flex-col items-center text-center gap-8">
          <div className="space-y-0 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#d0bcff] leading-none uppercase">Développeur</h2>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">Front-End</h2>
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-[#d0bcff]/70 mt-4 uppercase">Maxence Coste</h1>
          </div>
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#d0bcff] to-transparent" />
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
            Passionné par la création multimédia et l'innovation numérique, je souhaite mettre en œuvre mes compétences dans la conception et le développement de projets visuels et interactifs. Je suis prêt à relever les défis qui me permettront de progresser et de réaliser de nombreux projets. Mon objectif est de m’impliquer à 100% dans des projets alliant créativité et technologie.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            {["parcours", "projets", "compétences"].map((label) => (
              <motion.button
                key={label}
                onClick={() => {
                  if (label === 'parcours') handleSectionChange('parcours');
                  if (label === 'compétences') handleSectionChange('competences');
                }}
                onMouseEnter={(e) => handleMouseEnter(e, label)}
                onMouseLeave={() => { setHoveredButton(null); setButtonCenter(null); }}
                animate={{ 
                  opacity: hoveredButton === label ? 0 : 1,
                  scale: hoveredButton === label ? 0.9 : 1,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center px-10 py-4 group transition-all duration-500 min-w-[200px] h-14"
              >
                <div 
                  className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-[#d0bcff]/20 transition-all duration-500 group-hover:bg-[#d0bcff]/5 group-hover:border-[#d0bcff]/50"
                  style={{ 
                    clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" 
                  }}
                />
                
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" />
                
                <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#d0bcff]/30 to-transparent" />
                <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#d0bcff]/30 to-transparent" />
                
                <span className="absolute -top-2 left-6 text-[8px] font-black text-[#d0bcff]/40 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                  Access_Node
                </span>

                <span className="relative z-10 text-[#d0bcff] font-bold tracking-[0.25em] text-sm md:text-base uppercase transition-all duration-300 group-hover:tracking-[0.35em]">
                  {label}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 px-6 py-4 bg-[#d0bcff]/[0.02] backdrop-blur-sm border-y border-[#d0bcff]/10 w-full max-w-3xl">
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                onClick={() => handleContactAction(info)}
                className="flex items-center gap-2.5 group/item transition-all duration-300 cursor-pointer relative"
              >
                <div className="text-[#d0bcff]/60 group-hover/item:text-[#d0bcff] group-hover/item:scale-110 transition-all">
                  {info.icon}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[7px] uppercase tracking-[0.2em] text-[#d0bcff]/30 font-black leading-none mb-1">{info.label}</span>
                  <div className="flex items-center">
                    <span className="text-[10px] font-bold tracking-widest text-white/50 group-hover/item:text-[#d0bcff] transition-colors">{info.value}</span>
                    
                    <div className="ml-2 opacity-20 group-hover/item:opacity-60 transition-opacity text-[#d0bcff]">
                      {info.type === 'copy' ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: copyFeedback === info.label ? 1 : 0,
                    y: copyFeedback === info.label ? -20 : 10
                  }}
                  className="absolute left-1/2 -translate-x-1/2 bg-[#d0bcff] text-[#4f378b] text-[8px] font-black px-2 py-0.5 rounded pointer-events-none uppercase tracking-tighter shadow-[0_0_10px_rgba(208,188,255,0.5)]"
                >
                  Copié !
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
