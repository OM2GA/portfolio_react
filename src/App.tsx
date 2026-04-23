import { StarryBackground } from "./components/StarryBackground"
import { motion } from "motion/react"
import { useState } from "react"

type GravityType = 'left' | 'down' | 'right' | null;

interface TimelineStep {
  title: string;
  company: string;
  date: string;
  description: string;
  color: string;
  planetColor: string;
}

const timelineData: TimelineStep[] = [
  {
    title: "Stage Développement Web",
    company: "BNP Paribas",
    date: "07/04 AU 01/06 2026",
    description: "Chargé du développement d'assets front-end en environnement de test. Récréation de la structure et du design de la page d'accueil BNP Paribas sous Angular, Tailwind et Bootstrap.",
    color: "#00a082", // Vert BNP
    planetColor: "radial-gradient(circle at 30% 30%, #00a082, #004a3d)"
  },
  {
    title: "BUT MMI (2ème année)",
    company: "Université Gustave Eiffel",
    date: "2024 - Maintenant",
    description: "Métiers du Multimédia et de l'Internet. Spécialisation en développement web et design interactif.",
    color: "#d0bcff", // Votre mauve
    planetColor: "radial-gradient(circle at 30% 30%, #d0bcff, #4f378b)"
  },
  {
    title: "Stage Assistant UX Designer",
    company: "Société Générale",
    date: "04/07 AU 01/08 2025",
    description: "Conception d'un film explicatif pour une application interne. Analyse des besoins, adaptation du script, montage vidéo et respect des normes UX/UI.",
    color: "#ff0000", // Rouge SocGen
    planetColor: "radial-gradient(circle at 30% 30%, #ff0000, #4a0000)"
  },
  {
    title: "Bac Général NSI",
    company: "Lycée Jules Ferry",
    date: "2024",
    description: "Spécialité Mathématiques et Numérique et Sciences Informatiques.",
    color: "#3b82f6", // Bleu
    planetColor: "radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)"
  }
];

function App() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [buttonCenter, setButtonCenter] = useState<{ x: number; y: number } | null>(null);
  const [currentSection, setCurrentSection] = useState<'home' | 'parcours'>('home');
  const [isTraveling, setIsTraveling] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonCenter({
      x: ((rect.left + rect.right) / 2 / window.innerWidth) * 100,
      y: ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100,
    });
    setHoveredButton(label);
  };

  const handleSectionChange = (section: 'home' | 'parcours') => {
    setIsTraveling(true);
    // On change de section presque immédiatement
    setTimeout(() => {
      setCurrentSection(section);
      // Le flou commence à disparaître à mi-chemin du voyage (800ms)
      setTimeout(() => setIsTraveling(false), 800);
    }, 50);
  };

  const getGravity = (): GravityType => {
    if (isTraveling || currentSection === 'parcours') return null;
    if (hoveredButton === 'parcours') return 'left';
    if (hoveredButton === 'expériences') return 'down';
    if (hoveredButton === 'compétences') return 'right';
    return null;
  };

  return (
    <main className="relative h-screen w-full text-white overflow-hidden">
      <StarryBackground gravity={getGravity()} center={buttonCenter} isTraveling={isTraveling} />
      
      {/* Container pour le scroll horizontal */}
      <motion.div 
        initial={{ x: "-50%" }}
        animate={{ 
          x: currentSection === 'home' ? "-50%" : "0%",
          scale: isTraveling ? 0.95 : 1, // Moins de dézoom pour garder de la clarté
          filter: isTraveling ? "blur(4px)" : "blur(0px)" // Flou divisé par 2
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full w-[200%]"
      >
        {/* SECTION PARCOURS (à GAUCHE) */}
        <section className="w-1/2 h-full relative overflow-y-auto overflow-x-hidden no-scrollbar snap-y snap-mandatory bg-[#000814]/40 backdrop-blur-[2px]">
          <button 
            onClick={() => handleSectionChange('home')}
            className="fixed top-8 right-8 z-50 flex items-center gap-2 text-[#d0bcff] uppercase tracking-widest text-sm hover:translate-x-[4px] transition-transform"
          >
            Retour →
          </button>

          {timelineData.map((step, index) => (
            <div key={index} className="h-screen w-full flex items-center justify-center p-12 snap-start relative">
              <div className={`max-w-6xl w-full flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                
                {/* Planète 3D-ish */}
                <div className="relative w-64 h-64 flex-shrink-0">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      scale: { duration: 1 },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    style={{ background: step.planetColor }}
                    className="w-full h-full rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                  </motion.div>
                </div>

                {/* Contenu Texte */}
                <motion.div 
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className={`flex-1 space-y-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
                >
                  <span className="text-sm font-bold tracking-widest uppercase opacity-60" style={{ color: step.color }}>{step.date}</span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ color: step.color }}>{step.company}</h3>
                  <h4 className="text-xl md:text-2xl font-light text-white/90">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed max-w-xl ml-auto mr-auto md:ml-0 md:mr-0">{step.description}</p>
                </motion.div>
              </div>

              {index < timelineData.length - 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#d0bcff]/40 uppercase tracking-[0.3em] text-[10px] flex flex-col items-center gap-2">
                  <span>Scroll</span>
                  <div className="w-px h-12 bg-gradient-to-b from-[#d0bcff]/50 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* SECTION ACCUEIL (à DROITE) */}
        <section className="w-1/2 h-full flex items-center justify-center p-6 bg-transparent">
          <div className="max-w-4xl w-full z-10">
            <motion.div 
              animate={{ opacity: isTraveling ? 0 : 1 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="space-y-0 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#d0bcff] leading-none uppercase">Développeur</h2>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">Front-End</h2>
                <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-[#d0bcff]/70 mt-4 uppercase">Maxence Coste</h1>
              </div>

              <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#d0bcff] to-transparent" />

              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
                Passionné par la création multimédia et l'innovation numérique, je souhaite mettre en œuvre mes compétences dans la conception et le développement de projets visuels et interactifs. Je suis prêt à relever les défis qui me permettront de progresser et d'acquérir une plus grande expérience pratique. Mon objectif est de m’impliquer à 100% dans des projets alliant créativité et technologie.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {["parcours", "expériences", "compétences"].map((label) => (
                  <motion.button
                    key={label}
                    onClick={() => label === 'parcours' && handleSectionChange('parcours')}
                    onMouseEnter={(e) => handleMouseEnter(e, label)}
                    onMouseLeave={() => { setHoveredButton(null); setButtonCenter(null); }}
                    animate={{ 
                      opacity: hoveredButton === label ? 0 : 1,
                      scale: hoveredButton === label ? 0.9 : 1,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center px-8 py-3 rounded-full border border-[#d0bcff]/30 backdrop-blur-sm text-sm md:text-base font-medium tracking-widest uppercase h-[50px] min-w-[160px] transition-colors hover:border-[#d0bcff]/60"
                  >
                    <span>{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}

export default App;