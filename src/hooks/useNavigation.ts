import { useState } from 'react';

export type SectionType = 'home' | 'parcours' | 'competences';

export const useNavigation = (initialSection: SectionType = 'home') => {
  const [currentSection, setCurrentSection] = useState<SectionType>(initialSection);
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelDirection, setTravelDirection] = useState<'left' | 'right'>('left');

  const handleSectionChange = (section: SectionType) => {
    const sections: SectionType[] = ['parcours', 'home', 'competences'];
    const currentIndexVal = sections.indexOf(currentSection);
    const nextIndexVal = sections.indexOf(section);
    
    if (nextIndexVal > currentIndexVal) {
      setTravelDirection('right');
    } else {
      setTravelDirection('left');
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
