import { motion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "../../data/portfolioData";

interface SkillsSectionProps {
  isTraveling: boolean;
  isLoading: boolean;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences') => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void;
  setHoveredButton: (label: string | null) => void;
  setButtonCenter: (center: { x: number; y: number } | null) => void;
}

export function SkillsSection({
  isTraveling,
  isLoading,
  hoveredButton,
  handleSectionChange,
  handleMouseEnter,
  setHoveredButton,
  setButtonCenter
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [listSide, setListSide] = useState<{ x: 'left' | 'right', y: 'top' | 'bottom' }>({ x: 'right', y: 'top' });

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

  return (
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
            scale: (isTraveling || isLoading) ? 0.5 : [1, 1.05, 1], 
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
  );
}
