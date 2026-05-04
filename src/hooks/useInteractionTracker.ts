import { useState, MouseEvent } from 'react';
import type { GravityType } from '../types';
import type { SectionType } from './useNavigation';

export const useInteractionTracker = (currentSection: SectionType, isTraveling: boolean) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [buttonCenter, setButtonCenter] = useState<{ x: number; y: number } | null>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonCenter({
      x: ((rect.left + rect.right) / 2 / window.innerWidth) * 100,
      y: ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100,
    });
    setHoveredButton(label);
  };

  const getGravity = (): GravityType => {
    if (isTraveling) return null;
    if (currentSection === 'home') {
      if (hoveredButton === 'parcours') return 'left';
      if (hoveredButton === 'projets') return 'down';
      if (hoveredButton === 'compétences') return 'right';
    } else if (hoveredButton === 'retour') {
      return currentSection === 'parcours' ? 'right' : 'left';
    }
    return null;
  };

  return {
    hoveredButton,
    buttonCenter,
    setHoveredButton,
    setButtonCenter,
    handleMouseEnter,
    getGravity
  };
};
