import { motion } from "motion/react";
import { NavButton } from "../../ui/NavButton";

interface ProjetsSectionProps {
  isTraveling: boolean;
  isLoading: boolean;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences' | 'projets') => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void;
  setHoveredButton: (label: string | null) => void;
  setButtonCenter: (center: { x: number; y: number } | null) => void;
}

export function ProjetsSection({
  isTraveling,
  isLoading,
  hoveredButton,
  handleSectionChange,
  handleMouseEnter,
  setHoveredButton,
  setButtonCenter
}: ProjetsSectionProps) {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-6 bg-transparent relative">
      <motion.div 
        animate={{ opacity: (isTraveling || isLoading) ? 0 : 1 }} 
        className="flex flex-col items-center gap-12 z-10"
      >
        <h2 className="text-4xl font-black tracking-[0.5em] uppercase text-[#d0bcff]/40">
          Projets
        </h2>
        
        {/* Placeholder pour les projets futurs */}
        <div className="h-64 flex items-center justify-center">
          <p className="text-[#d0bcff]/20 italic tracking-widest">Zone en construction...</p>
        </div>

        <NavButton
          label="Retour"
          onClick={() => handleSectionChange('home')}
          onMouseEnter={(e) => handleMouseEnter(e, 'Retour')}
          onMouseLeave={() => { 
            setHoveredButton(null); 
            setButtonCenter(null); 
          }}
          isHovered={hoveredButton === 'Retour'}
          nodeType="Return_Node"
          className="px-10 py-4 min-w-[200px] h-14 mt-8"
        />
      </motion.div>
    </section>
  );
}
