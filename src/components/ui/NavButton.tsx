import { motion } from "motion/react";
import React from "react";
import { hexToRgba } from "../../utils/colorUtils";

interface NavButtonProps {
  label: string;
  onClick: () => void;
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  nodeType?: "Access_Node" | "Return_Node";
  themeColor?: string;
  className?: string;
}

export function NavButton({
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  nodeType = "Access_Node",
  themeColor = "#d0bcff",
  className = "",
}: NavButtonProps) {
  const rgbaColor = (opacity: number) => hexToRgba(themeColor, opacity);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        opacity: isHovered ? 0 : 1,
        scale: isHovered ? 0.9 : 1,
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center group transition-all duration-500 ${className}`}
    >
      <div
        className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border transition-all duration-500 group-hover:bg-white/[0.05]"
        style={{
          clipPath:
            "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          borderColor: rgbaColor(0.2),
        }}
      />

      <div
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors"
        style={{ borderColor: rgbaColor(0.4) }}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors"
        style={{ borderColor: rgbaColor(0.4) }}
      />

      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-[1px]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${rgbaColor(
            0.3
          )}, transparent)`,
        }}
      />
      <div
        className="absolute right-0 top-1/4 bottom-1/4 w-[1px]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${rgbaColor(
            0.3
          )}, transparent)`,
        }}
      />

      <span
        className="absolute -top-2 left-4 text-[7px] font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase"
        style={{ color: rgbaColor(0.4) }}
      >
        {nodeType}
      </span>

      <span
        className="relative z-10 font-bold tracking-[0.2em] text-xs uppercase transition-all duration-300 group-hover:tracking-[0.3em]"
        style={{ color: themeColor }}
      >
        {label}
      </span>
    </motion.button>
  );
}
