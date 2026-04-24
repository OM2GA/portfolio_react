import { StarryBackground } from "./components/StarryBackground"
import { motion } from "motion/react"
import { useState, useRef, useEffect } from "react"
import eiffelLogo from "./assets/Logo_universite_gustave_eiffel.png"
import socgenLogo from "./assets/logo-societe-generale.png"
import bnpLogo from "./assets/bnp-paribas-logo.webp"

type GravityType = 'left' | 'down' | 'right' | null;

interface TimelineStep {
  title: string;
  company: string;
  date: string;
  description: React.ReactNode;
  color: string;
  planetColor: string;
  logo?: string;
}

const timelineData: TimelineStep[] = [
  {
    title: "Bac Général NSI",
    company: "Lycée Jules Ferry",
    date: "2024",
    description: "Spécialité Mathématiques et Numérique et Sciences Informatiques.",
    color: "#3b82f6", // Bleu
    planetColor: "radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)"
  },
  {
    title: "BUT MMI (2ème année)",
    company: "Université Gustave Eiffel",
    date: "2024 - Maintenant",
    description: "Métiers du Multimédia et de l'Internet. Spécialisation en développement web et design interactif.",
    color: "#d0bcff",
    planetColor: "radial-gradient(circle at 30% 30%, #ffffff, #ffffff)",
    logo: eiffelLogo
  },
  {
    title: "Stage Assistant UX Designer",
    company: "Société Générale",
    date: "04/07 AU 01/08 2025",
    description: (
      <div className="space-y-2">
        <p>Rattaché à l'équipe UX/UI du centre de solutions Trésorerie & Risques Structurels, j'ai contribué à la conception d'un film explicatif pour présenter une fonctionnalité d'une application interne. Mes missions incluaient :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>L'analyse des besoins utilisateurs et l'appropriation du fonctionnement de l'application.</li>
          <li>L'adaptation du script et des maquettes Figma pour le film.</li>
          <li>Le montage vidéo et la finalisation du produit, en collaboration avec des équipes pluridisciplinaires (UX/UI, informatique, métiers financiers).</li>
          <li>Le respect des bonnes pratiques de production et de confidentialité en milieu professionnel.</li>
        </ul>
        <p className="pt-2 italic text-sm opacity-80">Environnement : Figma, outils de montage vidéo, méthodologies UX/UI, travail en équipe pluridisciplinaire.</p>
      </div>
    ),
    color: "#ff0000", // Rouge SocGen
    planetColor: "radial-gradient(circle at 30% 30%, #ff0000, #4a0000)",
    logo: socgenLogo
  },
  {
    title: "Stage Développement Web",
    company: "BNP Paribas",
    date: "07/04 AU 01/06 2026",
    description: "Chargé du développement d'assets front-end en environnement de test pour les squads BNPP et Hello Bank, j'ai recréé la structure et le design de la page d'accueil BNP Paribas. Cette intégration sous VS Code a mobilisé HTML, CSS et les frameworks Angular, Tailwind et Bootstrap, confirmant ma polyvalence technique sur les outils de référence du marché.",
    color: "#00a082", // Vert BNP
    planetColor: "radial-gradient(circle at 30% 30%, #00a082, #004a3d)",
    logo: bnpLogo
  }
];

const skillGroups = [
  {
    id: "tech",
    name: "Technique",
    color: "#61dafb",
    radius: 260,
    duration: 60, // Même durée pour tout le monde
    skills: ["React", "Angular", "Tailwind CSS", "Bootstrap", "JavaScript", "PHP", "HTML/CSS"]
  },
  {
    id: "soft",
    name: "Points Forts",
    color: "#e91e63",
    radius: 360,
    duration: 60, // Même durée pour tout le monde
    skills: ["Agilité", "Trello", "Créatif", "Polyvalent", "Curieux", "Dynamique", "Esprit d'équipe"]
  },
  {
    id: "lang",
    name: "Langues",
    color: "#4b8bbe",
    radius: 420,
    duration: 60, // Même durée pour tout le monde
    skills: ["Français (Maternel)", "Anglais (B1)", "Espagnol (A2)"]
  }
];
function App() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [buttonCenter, setButtonCenter] = useState<{ x: number; y: number } | null>(null);
  const [currentSection, setCurrentSection] = useState<'home' | 'parcours' | 'competences'>('home');
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelDirection, setTravelDirection] = useState<'left' | 'right'>('left');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [listSide, setListSide] = useState<{ x: 'left' | 'right', y: 'top' | 'bottom' }>({ x: 'right', y: 'top' });

  const [activeThemeColor, setActiveThemeColor] = useState('#d0bcff');
  const [currentIndex, setCurrentIndex] = useState(0);
  const parcoursContainerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
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
    return () => container?.removeEventListener('scroll', handleScroll);
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
      if (hoveredButton === 'expériences') return 'down';
      if (hoveredButton === 'compétences') return 'right';
    } else if (hoveredButton === 'retour') {
      return currentSection === 'parcours' ? 'right' : 'left';
    }
    return null;
  };

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <main className="relative h-screen w-full text-white overflow-hidden">
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
        {/* SECTION PARCOURS */}
        <section 
          ref={parcoursContainerRef}
          className="w-1/3 h-full relative overflow-y-auto overflow-x-hidden no-scrollbar bg-transparent snap-y snap-mandatory"
        >
          <div className="fixed inset-0 pointer-events-none z-50 w-full md:w-1/3">
            <motion.button 
              onClick={() => handleSectionChange('home')}
              onMouseEnter={(e) => handleMouseEnter(e, 'retour')}
              onMouseLeave={() => { setHoveredButton(null); setButtonCenter(null); }}
              animate={{ 
                opacity: hoveredButton === 'retour' ? 0 : 1,
                scale: hoveredButton === 'retour' ? 0.9 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 right-8 -translate-y-1/2 pointer-events-auto flex items-center justify-center px-8 py-3 group transition-all duration-500 min-w-[160px] h-12 z-50"
            >
              <div 
                className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-[#d0bcff]/20 transition-all duration-500 group-hover:bg-[#d0bcff]/5 group-hover:border-[#d0bcff]/50"
                style={{ 
                  clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  borderColor: hexToRgba(activeThemeColor, 0.4)
                }}
              />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" style={{ borderColor: hexToRgba(activeThemeColor, 0.4) }} />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" style={{ borderColor: hexToRgba(activeThemeColor, 0.4) }} />
              <span className="absolute -top-2 left-4 text-[7px] font-black text-[#d0bcff]/40 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                Return_Node
              </span>
              <span className="relative z-10 font-bold tracking-[0.2em] text-xs uppercase" style={{ color: activeThemeColor }}>
                Retour →
              </span>
            </motion.button>

            {/* Pagination latérale */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 pointer-events-auto z-50">
              {timelineData.map((step, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className="group relative flex items-center"
                >
                  <motion.div
                    animate={{
                      height: currentIndex === index ? 32 : 8,
                      width: currentIndex === index ? 4 : 2,
                      backgroundColor: currentIndex === index ? activeThemeColor : "rgba(255,255,255,0.2)",
                      boxShadow: currentIndex === index ? `0 0 15px ${activeThemeColor}` : "none"
                    }}
                    className="rounded-full transition-all duration-300"
                  />
                  <div 
                    className="absolute left-6 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: activeThemeColor }}>
                      {step.company}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto">
              {currentIndex > 0 && (
                <motion.button 
                  onClick={() => scrollToIndex(currentIndex - 1)}
                  style={{ 
                    borderColor: hexToRgba(activeThemeColor, 0.4),
                    backgroundColor: hexToRgba(activeThemeColor, 0.1),
                    color: activeThemeColor
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    backgroundColor: hexToRgba(activeThemeColor, 0.2),
                    boxShadow: `0 0 20px ${hexToRgba(activeThemeColor, 0.4)}`
                  }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 group"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:drop-shadow-[0_0_8px_currentColor]">
                    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              )}
              
              <div 
                className="w-px h-6 bg-gradient-to-b from-transparent to-transparent" 
                style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${hexToRgba(activeThemeColor, 0.4)}, transparent)` }}
              />
              
              {currentIndex < timelineData.length - 1 && (
                <motion.button 
                  onClick={() => scrollToIndex(currentIndex + 1)}
                  style={{ 
                    borderColor: hexToRgba(activeThemeColor, 0.4),
                    backgroundColor: hexToRgba(activeThemeColor, 0.1),
                    color: activeThemeColor
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: 2,
                    backgroundColor: hexToRgba(activeThemeColor, 0.2),
                    boxShadow: `0 0 20px ${hexToRgba(activeThemeColor, 0.4)}`
                  }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 group"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:drop-shadow-[0_0_8px_currentColor]">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              )}
            </div>
          </div>

          {timelineData.map((step, index) => (
            <div key={index} className="h-screen w-full flex items-center justify-center p-12 snap-start relative">
              <div className={`max-w-6xl w-full flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                <div className="relative w-64 h-64 flex-shrink-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      scale: { duration: 1 },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    style={{ background: step.planetColor }}
                    className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                  >
                    <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                  </motion.div>
                  {step.logo && (
                    <div className="relative z-10 w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
                      <img src={step.logo} alt={step.company} className="max-w-full max-h-full object-contain opacity-90" />
                    </div>
                  )}
                </div>
                <motion.div 
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className={`flex-1 space-y-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
                >
                  <span className="text-sm font-bold tracking-widest uppercase opacity-60" style={{ color: step.color }}>{step.date}</span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ color: step.color }}>{step.company}</h3>
                  <h4 className="text-xl md:text-2xl font-light text-white/90">{step.title}</h4>
                  <div className={`text-slate-400 leading-relaxed max-w-xl ml-auto mr-auto text-left ${index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}>{step.description}</div>
                </motion.div>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION ACCUEIL */}
        <section className="w-1/3 h-full flex items-center justify-center p-6 bg-transparent">
          <div className="max-w-4xl w-full z-10">
            <motion.div animate={{ opacity: isTraveling ? 0 : 1 }} className="flex flex-col items-center text-center gap-8">
              <div className="space-y-0 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#d0bcff] leading-none uppercase">Développeur</h2>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">Front-End</h2>
                <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-[#d0bcff]/70 mt-4 uppercase">Maxence Coste</h1>
              </div>
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#d0bcff] to-transparent" />
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
                Passionné par la création multimédia et l'innovation numérique, je souhaite mettre en œuvre mes compétences dans la conception et le développement de projets visuels et interactifs. Je suis prêt à relever les défis qui me permettront de progresser et d'acquérir une plus grande expérience pratique. Mon objectif est de m’impliquer à 100% dans des projets alliant créativité et technologie.
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-8">
                {["parcours", "expériences", "compétences"].map((label) => (
                  <motion.button
                    key={label}
                    onClick={() => {
                      if (label === 'parcours') handleSectionChange('parcours');
                      if (label === 'compétences') handleSectionChange('competences');
                    }}
                    onMouseEnter={(e) => handleMouseEnter(e, label)}
                    onMouseLeave={() => { setHoveredButton(null); setButtonCenter(null); }}
                    animate={{ 
                      opacity: hoveredButton === label ? 0 : 1,
                      scale: hoveredButton === label ? 0.9 : 1,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center px-10 py-4 group transition-all duration-500 min-w-[200px] h-14"
                  >
                    {/* Fond géométrique avec clip-path */}
                    <div 
                      className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-[#d0bcff]/20 transition-all duration-500 group-hover:bg-[#d0bcff]/5 group-hover:border-[#d0bcff]/50"
                      style={{ 
                        clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" 
                      }}
                    />
                    
                    {/* Bordures décoratives (angles) */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" />
                    
                    {/* Lignes de scan HUD latérales */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#d0bcff]/30 to-transparent" />
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#d0bcff]/30 to-transparent" />
                    
                    {/* Petite décoration textuelle HUD */}
                    <span className="absolute -top-2 left-6 text-[8px] font-black text-[#d0bcff]/40 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                      Access_Node
                    </span>

                    <span className="relative z-10 text-[#d0bcff] font-bold tracking-[0.25em] text-sm md:text-base uppercase transition-all duration-300 group-hover:tracking-[0.35em]">
                      {label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION COMPÉTENCES */}
        <section className="w-1/3 h-full flex items-center justify-center p-6 bg-transparent relative overflow-hidden">
          <motion.button 
            onClick={() => handleSectionChange('home')}
            onMouseEnter={(e) => handleMouseEnter(e, 'retour')}
            onMouseLeave={() => { setHoveredButton(null); setButtonCenter(null); }}
            animate={{ 
              opacity: hoveredButton === 'retour' ? 0 : 1,
              scale: hoveredButton === 'retour' ? 0.9 : 1,
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-auto flex items-center justify-center px-8 py-3 group transition-all duration-500 min-w-[160px] h-12 z-50"
          >
            <div 
              className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-[#d0bcff]/20 transition-all duration-500 group-hover:bg-[#d0bcff]/5 group-hover:border-[#d0bcff]/50"
              style={{ 
                clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
              }}
            />
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#d0bcff]/40 transition-colors group-hover:border-[#d0bcff]" />
            <span className="absolute -top-2 left-4 text-[7px] font-black text-[#d0bcff]/40 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase">
              Return_Node
            </span>
            <span className="relative z-10 text-[#d0bcff] font-bold tracking-[0.2em] text-xs uppercase">
              ← Retour
            </span>
          </motion.button>

          <div className="relative w-full h-full flex items-center justify-center" onClick={() => setActiveCategory(null)}>
            <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] pointer-events-none" />

            <motion.div 
              animate={{ 
                scale: isTraveling ? 0.5 : [1, 1.05, 1], 
                rotate: 360,
                boxShadow: [
                  "0 0 80px rgba(245,158,11,0.6), 0 0 150px rgba(234,88,12,0.4), 0 0 300px rgba(245,158,11,0.2)",
                  "0 0 120px rgba(245,158,11,0.8), 0 0 200px rgba(234,88,12,0.5), 0 0 400px rgba(245,158,11,0.3)",
                  "0 0 80px rgba(245,158,11,0.6), 0 0 150px rgba(234,88,12,0.4), 0 0 300px rgba(245,158,11,0.2)"
                ]
              }}
              transition={{ 
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }, 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-200 via-orange-400 to-red-500 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_60%)] opacity-40" />
              <div className="absolute inset-[-20px] rounded-full bg-orange-500/20 blur-2xl animate-pulse" />
              <div className="absolute inset-[-40px] rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="z-20"
              >
                <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Compétences</h2>
              </motion.div>
            </motion.div>

            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] border border-purple-500/10 rounded-full"
            />
            
            {skillGroups.map((group, groupIndex) => {
              const startRotation = groupIndex * (360 / skillGroups.length);
              
              return (
                <motion.div
                  key={group.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                  initial={{ rotate: startRotation }}
                  animate={{ rotate: startRotation + 360 }}
                  transition={{ 
                    duration: (activeCategory || hoveredCategory) ? 1000000 : group.duration, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ width: group.radius * 2, height: group.radius * 2 }}
                >
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-auto">
                    <motion.div
                      onMouseEnter={(e) => handleAsteroidHover(e, group.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={(e) => handleAsteroidClick(e, group.id)}
                      className="relative cursor-pointer group"
                      initial={{ rotate: -startRotation }}
                      animate={{ rotate: -(startRotation + 360) }}
                      transition={{ 
                        duration: (activeCategory || hoveredCategory) ? 1000000 : group.duration, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <motion.div
                        animate={{ 
                          scale: (activeCategory === group.id || hoveredCategory === group.id) ? 1.2 : 1,
                          borderRadius: ["40% 60% 70% 30% / 50% 40% 60% 50%", "60% 40% 30% 70% / 40% 50% 50% 60%", "40% 60% 70% 30% / 50% 40% 60% 50%"]
                        }}
                        transition={{ borderRadius: { duration: 5, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.3 } }}
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-slate-700 via-slate-800 to-black border-2 border-slate-600/30 flex items-center justify-center text-center p-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
                        style={{ borderColor: (activeCategory === group.id || hoveredCategory === group.id) ? group.color : undefined }}
                      >
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter leading-tight drop-shadow-md">{group.name}</span>
                        <motion.div 
                          animate={{ opacity: (activeCategory === group.id || hoveredCategory === group.id) ? 0.6 : 0.2 }}
                          className="absolute inset-0 blur-md"
                          style={{ backgroundColor: group.color }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: (activeCategory === group.id || hoveredCategory === group.id) ? 1 : 0,
                          scale: (activeCategory === group.id || hoveredCategory === group.id) ? 1 : 0.8,
                          x: (activeCategory === group.id || hoveredCategory === group.id) 
                            ? (listSide.x === 'left' ? -40 : 40) // S'éloigne du centre
                            : (listSide.x === 'left' ? -20 : 20),
                          pointerEvents: (activeCategory === group.id || hoveredCategory === group.id) ? "auto" : "none"
                        }}
                        className={`absolute flex flex-col gap-2 z-50 min-w-[180px]
                          ${listSide.x === 'left' ? 'right-full mr-4' : 'left-full ml-4'}
                          ${listSide.y === 'bottom' ? 'bottom-0' : 'top-0'}
                        `}
                      >
                        {group.skills.map((skill, i) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: (activeCategory === group.id || hoveredCategory === group.id) ? 1 : 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-black/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-2xl"
                            style={{ borderLeft: `3px solid ${group.color}` }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                            <span className="text-xs md:text-sm font-medium whitespace-nowrap text-white/90">{skill}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </motion.div>
    </main>
  );
}

export default App;