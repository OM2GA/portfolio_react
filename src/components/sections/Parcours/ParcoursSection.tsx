import { motion } from "motion/react";
import { timelineData } from "../../../data/portfolioData";
import { hexToRgba } from "../../../utils/colorUtils";

// UI Components
import { NavButton } from "../../ui/NavButton";
import { TimelineItem } from "./TimelineItem";

interface ParcoursSectionProps {
  parcoursContainerRef: React.RefObject<HTMLElement | null>;
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
    <section className="w-1/3 h-full relative overflow-hidden bg-transparent">
      {/* Overlay UI (Fixe par rapport à la section, mais bouge avec le slider) */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="absolute top-10 right-10 z-50 pointer-events-auto">
          <NavButton
            label="Retour →"
            onClick={() => handleSectionChange('home')}
            onMouseEnter={(e) => handleMouseEnter(e, 'retour')}
            onMouseLeave={() => { 
              setHoveredButton(null); 
              setButtonCenter(null); 
            }}
            isHovered={hoveredButton === 'retour'}
            nodeType="Return_Node"
            themeColor={activeThemeColor}
            className="px-8 py-3 min-w-[160px] h-12"
          />
        </div>

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

        {/* Flèches de navigation verticale */}
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

      {/* Contenu scrollable */}
      <div 
        ref={parcoursContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden no-scrollbar snap-y snap-mandatory scroll-smooth"
      >
        {timelineData.map((step, index) => (
          <TimelineItem key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
