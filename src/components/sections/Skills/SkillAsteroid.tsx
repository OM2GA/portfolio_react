import { motion } from "motion/react";
import React from "react";
import type { SkillGroup } from "../../../types";

interface SkillAsteroidProps {
  group: SkillGroup;
  startRotation: number;
  activeCategory: string | null;
  hoveredCategory: string | null;
  listSide: { x: "left" | "right"; y: "top" | "bottom" };
  handleAsteroidHover: (e: React.MouseEvent, id: string | null) => void;
  handleAsteroidClick: (e: React.MouseEvent, id: string) => void;
}

export function SkillAsteroid({
  group,
  startRotation,
  activeCategory,
  hoveredCategory,
  listSide,
  handleAsteroidHover,
  handleAsteroidClick,
}: SkillAsteroidProps) {
  const isHoveredOrActive = activeCategory === group.id || hoveredCategory === group.id;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
      initial={{ rotate: startRotation }}
      animate={{ rotate: startRotation + 360 }}
      transition={{
        duration: isHoveredOrActive ? 1000000 : group.duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ width: group.radius * 2, height: group.radius * 2 }}
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-auto">
        <motion.div
          onMouseEnter={(e) => handleAsteroidHover(e, group.id)}
          onMouseLeave={() => handleAsteroidHover(null as any, null)}
          onClick={(e) => handleAsteroidClick(e, group.id)}
          className="relative cursor-pointer group"
          initial={{ rotate: -startRotation }}
          animate={{ rotate: -(startRotation + 360) }}
          transition={{
            duration: isHoveredOrActive ? 1000000 : group.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              scale: isHoveredOrActive ? 1.2 : 1,
            }}
            transition={{
              scale: { duration: 0.3 },
            }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-center p-2 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(0,0,0,0.3)] overflow-hidden relative"
            style={{ 
              background: group.planetColor || group.color,
              border: `1px solid ${group.color}44`,
              borderRadius: '50%'
            }}
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter leading-tight drop-shadow-lg z-10 text-white">
              {group.name}
            </span>
            
            {/* Atmospheric Glow */}
            <motion.div
              animate={{ 
                opacity: isHoveredOrActive ? 0.8 : 0.4,
                scale: isHoveredOrActive ? 1.2 : 1.1
              }}
              className="absolute inset-0 rounded-full blur-md -z-10"
              style={{ backgroundColor: group.color }}
            />

            {/* Shine/Highlight */}
            <div className="absolute top-2 left-4 w-1/3 h-1/4 bg-white/20 rounded-[100%] blur-sm -rotate-45" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHoveredOrActive ? 1 : 0,
              scale: isHoveredOrActive ? 1 : 0.8,
              x: isHoveredOrActive
                ? listSide.x === "left"
                  ? -40
                  : 40
                : listSide.x === "left"
                ? -20
                : 20,
              pointerEvents: isHoveredOrActive ? "auto" : "none",
            }}
            className={`absolute flex flex-col gap-2 z-[100] min-w-[180px]
              ${listSide.x === "left" ? "right-full mr-4" : "left-full ml-4"}
              ${listSide.y === "bottom" ? "bottom-0" : "top-0"}
            `}
          >
            {group.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveredOrActive ? 1 : 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-black/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-2xl"
                style={{ borderLeft: `3px solid ${group.color}` }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <span className="text-xs md:text-sm font-medium whitespace-nowrap text-white/90">
                  {skill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
