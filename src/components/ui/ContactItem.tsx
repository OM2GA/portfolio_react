import { motion } from "motion/react";
import type { ContactInfo } from "../../types";

interface ContactItemProps {
  info: ContactInfo;
  onClick: (info: ContactInfo) => void;
  isCopied: boolean;
}

export function ContactItem({ info, onClick, isCopied }: ContactItemProps) {
  return (
    <motion.div
      onClick={() => onClick(info)}
      className="flex items-center gap-2.5 group/item transition-all duration-300 cursor-pointer relative"
    >
      <div className="text-[#d0bcff]/60 group-hover/item:text-[#d0bcff] group-hover/item:scale-110 transition-all">
        {info.icon}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[7px] uppercase tracking-[0.2em] text-[#d0bcff]/30 font-black leading-none mb-1">
          {info.label}
        </span>
        <div className="flex items-center">
          <span className="text-[10px] font-bold tracking-widest text-white/50 group-hover/item:text-[#d0bcff] transition-colors">
            {info.value}
          </span>

          <div className="ml-2 opacity-20 group-hover/item:opacity-60 transition-opacity text-[#d0bcff]">
            {info.type === "copy" ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isCopied ? 1 : 0,
          y: isCopied ? -20 : 10,
        }}
        className="absolute left-1/2 -translate-x-1/2 bg-[#d0bcff] text-[#4f378b] text-[8px] font-black px-2 py-0.5 rounded pointer-events-none uppercase tracking-tighter shadow-[0_0_10px_rgba(208,188,255,0.5)]"
      >
        Copié !
      </motion.div>
    </motion.div>
  );
}
