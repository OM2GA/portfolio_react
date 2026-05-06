import { motion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "../../../data/portfolioData";

// UI Components
import { NavButton } from "../../ui/NavButton";
import { CentralSun } from "./CentralSun";
import { SkillAsteroid } from "./SkillAsteroid";

interface SkillsSectionProps {
  isTraveling: boolean;
  isLoading: boolean;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences') => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void;
  setHoveredButton: (label: string | null) => void;
  setButtonCenter: (center: { x: number; y: number } | null) => void;
}

export function SkillsSection({
  isTraveling,
  isLoading,
  hoveredButton,
  handleSectionChange,
  handleMouseEnter,
  setHoveredButton,
  setButtonCenter
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [listSide, setListSide] = useState<{ x: 'left' | 'right', y: 'top' | 'bottom' }>({ x: 'right', y: 'top' });

  const handleAsteroidHover = (e: React.MouseEvent, id: string | null) => {
    if (!id) {
      setHoveredCategory(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const xSide = rect.left + rect.width / 2 < centerX ? 'left' : 'right';
    const ySide = rect.top + rect.height / 2 < centerY ? 'top' : 'bottom';

    setListSide({ x: xSide, y: ySide });
    setHoveredCategory(id);
  };

  const handleAsteroidClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (activeCategory === id) {
      setActiveCategory(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const xSide = rect.left + rect.width / 2 < centerX ? 'left' : 'right';
      const ySide = rect.top + rect.height / 2 < centerY ? 'top' : 'bottom';

      setListSide({ x: xSide, y: ySide });
      setActiveCategory(id);
    }
  };

  return (
    <section className="w-1/3 h-full flex items-center justify-center p-6 bg-transparent relative overflow-hidden">
      <div className="absolute top-10 left-10 z-50">
        <NavButton
          label="← Retour"
          onClick={() => handleSectionChange('home')}
          onMouseEnter={(e) => handleMouseEnter(e, 'retour')}
          onMouseLeave={() => { 
            setHoveredButton(null); 
            setButtonCenter(null); 
          }}
          isHovered={hoveredButton === 'retour'}
          nodeType="Return_Node"
          themeColor="#8b5cf6"
          className="px-8 py-3 min-w-[160px] h-12"
        />
      </div>

      <div 
        className="relative w-full h-full flex items-center justify-center" 
        onClick={() => setActiveCategory(null)}
      >
        <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] pointer-events-none" />

        <CentralSun isTraveling={isTraveling} isLoading={isLoading} />

        {/* Orbit Rings */}
        {skillGroups.map((group) => (
          <div
            key={`orbit-${group.id}`}
            className="absolute border border-white/5 rounded-full pointer-events-none"
            style={{ 
              width: group.radius * 2, 
              height: group.radius * 2,
            }}
          />
        ))}
        
        {skillGroups.map((group, groupIndex) => (
          <SkillAsteroid
            key={group.id}
            group={group}
            startRotation={groupIndex * (360 / skillGroups.length)}
            activeCategory={activeCategory}
            hoveredCategory={hoveredCategory}
            listSide={listSide}
            handleAsteroidHover={handleAsteroidHover}
            handleAsteroidClick={handleAsteroidClick}
          />
        ))}
      </div>
    </section>
  );
}
