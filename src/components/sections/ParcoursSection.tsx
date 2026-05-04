import { motion } from "motion/react";
import { timelineData } from "../../data/portfolioData";
import { hexToRgba } from "../../utils/colorUtils";

interface ParcoursSectionProps {
  parcoursContainerRef: React.RefObject<HTMLElement>;
  currentIndex: number;
  activeThemeColor: string;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences') => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void;
  setHoveredButton: (label: string | null) => void;
  setButtonCenter: (center: { x: number; y: number } | null) => void;
  scrollToIndex: (index: number) => void;
}

export function ParcoursSection({
  parcoursContainerRef,
  currentIndex,
  activeThemeColor,
  hoveredButton,
  handleSectionChange,
  handleMouseEnter,
  setHoveredButton,
  setButtonCenter,
  scrollToIndex
}: ParcoursSectionProps) {
  return (
    <section 
      ref={parcoursContainerRef}
      className="w-1/3 h-full relative overflow-y-auto overflow-x-hidden no-scrollbar bg-transparent snap-y snap-mandatory"
    >
      <div className="fixed inset-0 pointer-events-none z-50 w-full md:w-1/3">
        <motion.button 
          onClick={() => handleSectionChange('home')}
          onMouseEnter={(e) => handleMouseEnter(e, 'retour')}
          onMouseLeave={() => { setHoveredButton(null); setButtonCenter(null); }}
          animate={{ 
            opacity: hoveredButton === 'retour' ? 0 : 1,
            scale: hoveredButton === 'retour' ? 0.9 : 1,
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 right-8 -translate-y-1/2 pointer-events-auto flex items-center justify-center px-8 py-3 group transition-all duration-500 min-w-[160px] h-12 z-50"
        >
          <div 
            className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-[#d0bcff]/20 transition-all duration-500 group-hover:bg-[#d0bcff]/5 group-hover:border-[#d0bcff]/50"
            style={{ 
              clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              borderColor: hexToRgba(activeThemeColor, 0.4)
            }}
          />
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" style={{ borderColor: hexToRgba(activeThemeColor, 0.4) }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" style={{ borderColor: hexToRgba(activeThemeColor, 0.4) }} />
          <span className="absolute -top-2 left-4 text-[7px] font-black text-[#d0bcff]/40 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase">
            Return_Node
          </span>
          <span className="relative z-10 font-bold tracking-[0.2em] text-xs uppercase" style={{ color: activeThemeColor }}>
            Retour →
          </span>
        </motion.button>

        {/* Pagination latérale */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 pointer-events-auto z-50">
          {timelineData.map((step, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className="group relative flex items-center"
            >
              <motion.div
                animate={{
                  height: currentIndex === index ? 32 : 8,
                  width: currentIndex === index ? 4 : 2,
                  backgroundColor: currentIndex === index ? activeThemeColor : "rgba(255,255,255,0.2)",
                  boxShadow: currentIndex === index ? `0 0 15px ${activeThemeColor}` : "none"
                }}
                className="rounded-full transition-all duration-300"
              />
              <div 
                className="absolute left-6 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: activeThemeColor }}>
                  {step.company}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto">
          {currentIndex > 0 && (
            <motion.button 
              onClick={() => scrollToIndex(currentIndex - 1)}
              style={{ 
                borderColor: hexToRgba(activeThemeColor, 0.4),
                backgroundColor: hexToRgba(activeThemeColor, 0.1),
                color: activeThemeColor
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                backgroundColor: hexToRgba(activeThemeColor, 0.2),
                boxShadow: `0 0 20px ${hexToRgba(activeThemeColor, 0.4)}`
              }}
              whileTap={{ scale: 0.9, y: 0 }}
              className="flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:drop-shadow-[0_0_8px_currentColor]">
                <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}
          
          <div 
            className="w-px h-6 bg-gradient-to-b from-transparent to-transparent" 
            style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${hexToRgba(activeThemeColor, 0.4)}, transparent)` }}
          />
          
          {currentIndex < timelineData.length - 1 && (
            <motion.button 
              onClick={() => scrollToIndex(currentIndex + 1)}
              style={{ 
                borderColor: hexToRgba(activeThemeColor, 0.4),
                backgroundColor: hexToRgba(activeThemeColor, 0.1),
                color: activeThemeColor
              }}
              whileHover={{ 
                scale: 1.1, 
                y: 2,
                backgroundColor: hexToRgba(activeThemeColor, 0.2),
                boxShadow: `0 0 20px ${hexToRgba(activeThemeColor, 0.4)}`
              }}
              whileTap={{ scale: 0.9, y: 0 }}
              className="flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:drop-shadow-[0_0_8px_currentColor]">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}
        </div>
      </div>

      {timelineData.map((step, index) => (
        <div key={index} className="h-screen w-full flex items-center justify-center p-12 snap-start relative">
          <div className={`max-w-6xl w-full flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
            <div className="relative w-64 h-64 flex-shrink-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  scale: { duration: 1 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                style={{ background: step.planetColor }}
                className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
              </motion.div>
              {step.logo && (
                <div className="relative z-10 w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
                  <img src={step.logo} alt={step.company} className="max-w-full max-h-full object-contain opacity-90" />
                </div>
              )}
            </div>
            <motion.div 
              initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className={`flex-1 space-y-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
            >
              <span className="text-sm font-bold tracking-widest uppercase opacity-60" style={{ color: step.color }}>{step.date}</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ color: step.color }}>{step.company}</h3>
              <h4 className="text-xl md:text-2xl font-light text-white/90">{step.title}</h4>
              <div className={`text-slate-400 leading-relaxed max-w-xl ml-auto mr-auto text-left ${index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}>{step.description}</div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
