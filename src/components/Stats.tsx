import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Activity, Layers, Award } from 'lucide-react';
import { PortfolioData } from '../types';

interface StatsProps {
  stats: PortfolioData['stats'];
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <section className="relative py-16 bg-[#050505] dark:bg-[#050505] light:bg-[#f4f1ea] border-y border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white/80 border border-white/10 dark:border-white/10 light:border-[#C5A059]/20 text-center flex flex-col items-center justify-center group hover:border-[#C5A059]/50 hover:bg-white/[0.05] transition-all shadow-xl backdrop-blur-md"
            >
              {/* Top glow dot */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#C5A059] opacity-70 group-hover:scale-150 transition-transform" />

              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e7d3] to-[#C5A059] dark:from-white dark:via-[#f3e7d3] dark:to-[#C5A059] light:from-zinc-900 light:via-[#8E713E] light:to-[#C5A059] mb-2 font-heading tracking-tight">
                {stat.value}
              </div>

              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 dark:text-zinc-200 light:text-zinc-800 mb-1">
                {stat.label}
              </div>

              <div className="text-[11px] font-light text-zinc-500 max-w-[170px] leading-tight">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
