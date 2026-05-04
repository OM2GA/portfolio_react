import { StarryBackground } from "./components/StarryBackground";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomeSection } from "./components/sections/HomeSection";
import { ParcoursSection } from "./components/sections/ParcoursSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import type { GravityType } from "./types";
import { timelineData } from "./data/portfolioData";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [buttonCenter, setButtonCenter] = useState<{ x: number; y: number } | null>(null);
  const [currentSection, setCurrentSection] = useState<'home' | 'parcours' | 'competences'>('home');
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelDirection, setTravelDirection] = useState<'left' | 'right'>('left');

  const [activeThemeColor, setActiveThemeColor] = useState('#d0bcff');
  const [currentIndex, setCurrentIndex] = useState(0);
  const parcoursContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simulation de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const handleScroll = () => {
      if (parcoursContainerRef.current) {
        const scrollTop = parcoursContainerRef.current.scrollTop;
        const index = Math.round(scrollTop / window.innerHeight);
        setCurrentIndex(index);
        if (timelineData[index]) {
          setActiveThemeColor(timelineData[index].color);
        }
      }
    };

    const container = parcoursContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      clearTimeout(timer);
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (!parcoursContainerRef.current || !timelineData[index]) return;
    
    parcoursContainerRef.current.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonCenter({
      x: ((rect.left + rect.right) / 2 / window.innerWidth) * 100,
      y: ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100,
    });
    setHoveredButton(label);
  };

  const handleSectionChange = (section: 'home' | 'parcours' | 'competences') => {
    const sections = ['parcours', 'home', 'competences'];
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

  return (
    <main className="relative h-screen w-full text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <StarryBackground 
        gravity={getGravity()} 
        center={buttonCenter} 
        isTraveling={isTraveling} 
        travelDirection={travelDirection}
        themeColor={currentSection === 'home' ? '#4f378b' : (currentSection === 'parcours' ? activeThemeColor : '#8b5cf6')}
      />
      
      <motion.div 
        initial={{ x: "-33.333%" }}
        animate={{ 
          x: currentSection === 'parcours' ? "0%" : (currentSection === 'home' ? "-33.333%" : "-66.666%"),
          scale: isTraveling ? 0.95 : 1, 
          filter: isTraveling ? "blur(4px)" : "blur(0px)" 
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full w-[300%]"
      >
        <ParcoursSection 
          parcoursContainerRef={parcoursContainerRef}
          currentIndex={currentIndex}
          activeThemeColor={activeThemeColor}
          hoveredButton={hoveredButton}
          handleSectionChange={handleSectionChange}
          handleMouseEnter={handleMouseEnter}
          setHoveredButton={setHoveredButton}
          setButtonCenter={setButtonCenter}
          scrollToIndex={scrollToIndex}
        />

        <HomeSection 
          isTraveling={isTraveling}
          isLoading={isLoading}
          hoveredButton={hoveredButton}
          handleSectionChange={handleSectionChange}
          handleMouseEnter={handleMouseEnter}
          setHoveredButton={setHoveredButton}
          setButtonCenter={setButtonCenter}
        />

        <SkillsSection 
          isTraveling={isTraveling}
          isLoading={isLoading}
          hoveredButton={hoveredButton}
          handleSectionChange={handleSectionChange}
          handleMouseEnter={handleMouseEnter}
          setHoveredButton={setHoveredButton}
          setButtonCenter={setButtonCenter}
        />
      </motion.div>
    </main>
  );
}

export default App;
