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
  const [selectedProject, setSelectedProject] = useState<any>(null);
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
            setSelectedProject={setSelectedProject}
          />
        </div>
      </motion.div>

      {/* Modal Projet - Sorti du flux transformé pour éviter les coupures */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md overflow-y-auto custom-scrollbar p-4 md:p-12 lg:p-20 flex justify-center items-start"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-[#1a1a2e] border border-white/10 rounded-[2.5rem] w-full max-w-5xl relative shadow-2xl mb-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-64 md:h-[30rem] w-full overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 w-14 h-14 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-all z-20 border border-white/10 backdrop-blur-md text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 md:p-16 lg:p-20 relative">
                <div className="mb-12">
                  <span className="text-[#d0bcff] font-bold tracking-[0.3em] uppercase text-xs md:text-sm block mb-4">
                    {selectedProject.type}
                  </span>
                  <h2 className="text-4xl md:text-7xl font-black leading-tight text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8 text-white/80 leading-relaxed">
                    <section>
                      <h4 className="text-[#d0bcff] font-bold uppercase tracking-wider text-sm mb-3">Le Défi</h4>
                      <p>{selectedProject.details.problem}</p>
                    </section>
                    <section>
                      <h4 className="text-[#d0bcff] font-bold uppercase tracking-wider text-sm mb-3">Solution & Design</h4>
                      <p>{selectedProject.details.solution}</p>
                    </section>
                    {selectedProject.details.tech && (
                      <section>
                        <h4 className="text-[#d0bcff] font-bold uppercase tracking-wider text-sm mb-3">Développement</h4>
                        <p>{selectedProject.details.tech}</p>
                      </section>
                    )}
                    {selectedProject.details.images && selectedProject.details.images.map((img: any, i: number) => (
                      <div key={i} className="space-y-3">
                        <img src={img.url} alt={img.caption} className="rounded-xl border border-white/10 w-full" />
                        <p className="text-center text-xs text-white/40 italic">{img.caption}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <h4 className="text-white font-bold mb-4">Infos</h4>
                      <div className="space-y-4 text-sm">
                        {selectedProject.details.stats?.map((stat: any, i: number) => (
                          <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-white/40">{stat.label}</span>
                            <span className="text-[#d0bcff] font-bold">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#d0bcff] text-black font-bold rounded-xl hover:scale-105 transition-transform">
                          Voir le site
                        </a>
                      )}
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                          Code source
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
