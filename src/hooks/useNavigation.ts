import { useState } from 'react';

export type SectionType = 'home' | 'parcours' | 'competences' | 'projets';

export const useNavigation = (initialSection: SectionType = 'home') => {
  const [currentSection, setCurrentSection] = useState<SectionType>(initialSection);
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelDirection, setTravelDirection] = useState<'left' | 'right' | 'up' | 'down'>('left');

  const handleSectionChange = (section: SectionType) => {
    if (section === currentSection) return;

    // Déterminer la direction
    if (section === 'projets') {
      setTravelDirection('down');
    } else if (currentSection === 'projets') {
      setTravelDirection('up');
    } else {
      const sections: SectionType[] = ['parcours', 'home', 'competences'];
      const currentIndexVal = sections.indexOf(currentSection);
      const nextIndexVal = sections.indexOf(section);
      
      if (nextIndexVal > currentIndexVal) {
        setTravelDirection('right');
      } else {
        setTravelDirection('left');
      }
    }

    setIsTraveling(true);
    setTimeout(() => {
      setCurrentSection(section);
      setTimeout(() => setIsTraveling(false), 800);
    }, 50);
  };

  return {
    currentSection,
    isTraveling,
    travelDirection,
    handleSectionChange
  };
};
