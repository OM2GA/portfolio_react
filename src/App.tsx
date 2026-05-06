import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

// Components
import { StarryBackground } from "./components/layout/StarryBackground";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { HomeSection } from "./components/sections/Home/HomeSection";
import { ParcoursSection } from "./components/sections/Parcours/ParcoursSection";
import { SkillsSection } from "./components/sections/Skills/SkillsSection";
import { ProjetsSection } from "./components/sections/Projets/ProjetsSection";

// Hooks
import { useNavigation } from "./hooks/useNavigation";
import { useParcoursScroll } from "./hooks/useParcoursScroll";
import { useInteractionTracker } from "./hooks/useInteractionTracker";

// Constants
import { COLORS } from "./constants/theme";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const parcoursContainerRef = useRef<HTMLDivElement>(null);

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
    ? COLORS.primaryDark 
    : (currentSection === 'parcours' ? activeThemeColor : (currentSection === 'projets' ? "#2d1b4e" : COLORS.secondary));

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
        animate={{ 
          y: currentSection === 'projets' ? "-50%" : "0%",
          scale: isTraveling ? 0.95 : 1, 
          filter: isTraveling ? "blur(4px)" : "blur(0px)" 
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="h-[200%] w-full"
      >
        {/* Niveau 1: Horizontal (Parcours, Home, Skills) */}
        <motion.div 
          animate={{ 
            x: currentSection === 'parcours' ? "0%" : (currentSection === 'home' || currentSection === 'projets' ? "-33.333%" : "-66.666%"),
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-1/2 w-[300%]"
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

        {/* Niveau 2: Projets (Verticalement sous la Home) */}
        <div className="h-1/2 w-full">
          <ProjetsSection 
            isTraveling={isTraveling}
            isLoading={isLoading}
            hoveredButton={hoveredButton}
            handleSectionChange={handleSectionChange}
            handleMouseEnter={handleMouseEnter}
            setHoveredButton={setHoveredButton}
            setButtonCenter={setButtonCenter}
          />
        </div>
      </motion.div>
    </main>
  );
}

export default App;
