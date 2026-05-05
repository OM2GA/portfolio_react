import { motion } from "motion/react";
import type { TimelineStep } from "../../../types";

interface TimelineItemProps {
  step: TimelineStep;
  index: number;
}

export function TimelineItem({ step, index }: TimelineItemProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center p-12 snap-start relative">
      <div
        className={`max-w-6xl w-full flex flex-col ${
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-12`}
      >
        <div className="relative w-64 h-64 flex-shrink-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            animate={{ rotate: 360 }}
            transition={{
              scale: { duration: 1 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            style={{ background: step.planetColor }}
            className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </motion.div>
          {step.logo && (
            <div className="relative z-10 w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
              <img
                src={step.logo}
                alt={step.company}
                className="max-w-full max-h-full object-contain opacity-90"
              />
            </div>
          )}
        </div>
        <motion.div
          initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className={`flex-1 space-y-4 ${
            index % 2 === 0 ? "text-left" : "text-right"
          }`}
        >
          <span
            className="text-sm font-bold tracking-widest uppercase opacity-60"
            style={{ color: step.color }}
          >
            {step.date}
          </span>
          <h3
            className="text-3xl md:text-5xl font-black uppercase leading-tight"
            style={{ color: step.color }}
          >
            {step.company}
          </h3>
          <h4 className="text-xl md:text-2xl font-light text-white/90">
            {step.title}
          </h4>
          <div
            className={`text-slate-400 leading-relaxed max-w-xl ml-auto mr-auto text-left ${
              index % 2 === 0 ? "md:ml-0" : "md:mr-0"
            }`}
          >
            {step.description}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
