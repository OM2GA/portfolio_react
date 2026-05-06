import { motion } from "motion/react";
import { useState } from "react";
import type { ContactInfo } from "../../../types";
import { getContactInfo } from "../../../data/portfolioData";

// UI Components
import { NavButton } from "../../ui/NavButton";
import { ContactItem } from "../../ui/ContactItem";
import { HeroHeader } from "./HeroHeader";
import { CVButton } from "../../ui/CVButton";

interface HomeSectionProps {
  isTraveling: boolean;
  isLoading: boolean;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences' | 'projets') => void;
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
        <motion.div 
          animate={{ opacity: (isTraveling || isLoading) ? 0 : 1 }} 
          className="flex flex-col items-center text-center gap-6"
        >
          <HeroHeader />

          <div className="flex flex-wrap justify-center gap-8 pt-4">
            {["parcours", "projets", "compétences"].map((label) => (
              <NavButton
                key={label}
                label={label}
                onClick={() => {
                  if (label === 'parcours') handleSectionChange('parcours');
                  if (label === 'compétences') handleSectionChange('competences');
                  if (label === 'projets') handleSectionChange('projets');
                }}
                onMouseEnter={(e) => handleMouseEnter(e, label)}
                onMouseLeave={() => { 
                  setHoveredButton(null); 
                  setButtonCenter(null); 
                }}
                isHovered={hoveredButton === label}
                className="px-10 py-4 min-w-[200px] h-14"
              />
            ))}
          </div>

          <div className="pt-4">
            <CVButton />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 px-6 py-3 bg-white/[0.01] backdrop-blur-sm border-t border-white/5 w-full max-w-2xl opacity-60 hover:opacity-100 transition-opacity duration-500">
            {contactInfo.map((info) => (
              <ContactItem
                key={info.label}
                info={info}
                onClick={handleContactAction}
                isCopied={copyFeedback === info.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
