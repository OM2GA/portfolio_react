import { motion } from "motion/react";
import { NavButton } from "../../ui/NavButton";
import { projectsData } from "../../../data/portfolioData";
import type { Project } from "../../../types";

interface ProjetsSectionProps {
  isTraveling: boolean;
  isLoading: boolean;
  hoveredButton: string | null;
  handleSectionChange: (section: 'home' | 'parcours' | 'competences' | 'projets') => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void;
  setHoveredButton: (label: string | null) => void;
  setButtonCenter: (center: { x: number; y: number } | null) => void;
  setSelectedProject: (project: Project | null) => void;
}

export function ProjetsSection({
  isTraveling,
  isLoading,
  hoveredButton,
  handleSectionChange,
  handleMouseEnter,
  setHoveredButton,
  setButtonCenter,
  setSelectedProject
}: ProjetsSectionProps) {
  return (
    <section className="w-full h-full flex flex-col items-center justify-start p-10 bg-transparent relative overflow-y-auto custom-scrollbar">
      <motion.div 
        animate={{ opacity: (isTraveling || isLoading) ? 0 : 1 }} 
        className="flex flex-col items-center gap-12 z-10 w-full max-w-6xl"
      >
        <h2 className="text-4xl font-black tracking-[0.5em] uppercase text-[#d0bcff]/40 mt-10">
          Projets
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#d0bcff]/50 transition-colors"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#d0bcff]">
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#d0bcff] transition-colors">{project.title}</h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-white/10 rounded-full border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <NavButton
          label="Retour"
          onClick={() => handleSectionChange('home')}
          onMouseEnter={(e) => handleMouseEnter(e, 'Retour')}
          onMouseLeave={() => { 
            setHoveredButton(null); 
            setButtonCenter(null); 
          }}
          isHovered={hoveredButton === 'Retour'}
          nodeType="Return_Node"
          className="px-10 py-4 min-w-[200px] h-14 mt-8 mb-20"
        />
      </motion.div>
    </section>
  );
}
