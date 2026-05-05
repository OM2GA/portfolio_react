import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

// Components
import { StarryBackground } from "./components/layout/StarryBackground";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { HomeSection } from "./components/sections/Home/HomeSection";
import { ParcoursSection } from "./components/sections/Parcours/ParcoursSection";
import { SkillsSection } from "./components/sections/Skills/SkillsSection";

// Hooks
import { useNavigation } from "./hooks/useNavigation";
import { useParcoursScroll } from "./hooks/useParcoursScroll";
import { useInteractionTracker } from "./hooks/useInteractionTracker";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const parcoursContainerRef = useRef<HTMLElement>(null);

  // Custom Hooks
  const { 
    currentSection, 
    isTraveling, 
    travelDirection, 
    handleSectionChange 
  } = useNavigation('home');

  const { 
    currentIndex, 
    activeThemeColor, 
    scrollToIndex 
  } = useParcoursScroll(parcoursContainerRef);

  const {
    hoveredButton,
    buttonCenter,
    setHoveredButton,
    setButtonCenter,
    handleMouseEnter,
    getGravity
  } = useInteractionTracker(currentSection, isTraveling);

  useEffect(() => {
    // Simulation de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const themeColor = currentSection === 'home' 
    ? '#4f378b' 
    : (currentSection === 'parcours' ? activeThemeColor : '#8b5cf6');

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
        themeColor={themeColor}
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
