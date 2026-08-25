import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Terminal, 
  Code2, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { PortfolioData } from '../types';

interface AboutProps {
  personal: PortfolioData['personal'];
}

export const About: React.FC<AboutProps> = ({ personal }) => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#050505] dark:bg-[#050505] light:bg-[#fcfbfa] border-t border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase mb-3">
              <Compass className="w-3 h-3" />
              <span>01 // PERSPECTIVE & CRAFT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 font-heading">
              About Nangyal Khan
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-4 py-2 rounded-full border border-[#C5A059]/30 self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Technologist & Builder</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Modern Profile Frame / Monogram Studio */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-[#C5A059]/20 shadow-2xl backdrop-blur-md relative overflow-hidden group">
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl group-hover:bg-[#C5A059]/20 transition-all duration-700 pointer-events-none" />

            <div>
              {/* Profile Image Frame - Permanent Static Portrait */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[420px] rounded-2xl overflow-hidden border border-white/15 dark:border-white/15 light:border-zinc-300 bg-black/60 dark:bg-black/60 light:bg-zinc-100 flex items-center justify-center mb-6 shadow-2xl group/photo">
                <img
                  src="/images/profile.jpg"
                  alt={`${personal.name} — Professional Portrait`}
                  className="w-full h-full object-cover object-[50%_14%] filter brightness-[1.02] contrast-[1.03] group-hover/photo:scale-[1.03] transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle Inner Gradient for Depth at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-80" />

                {/* Aesthetic Status Overlay */}
                <div className="absolute bottom-3.5 left-3.5 px-3.5 py-1.5 rounded-full bg-black/80 dark:bg-black/80 light:bg-white/95 border border-white/20 dark:border-white/20 light:border-zinc-300 backdrop-blur-md flex items-center gap-2 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white dark:text-white light:text-zinc-900 font-medium">
                    {personal.name}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-zinc-900 font-heading">
                    {personal.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] px-2.5 py-0.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30">
                    Technologist
                  </span>
                </div>
                <p className="text-sm text-white/60 dark:text-white/60 light:text-zinc-600 font-light">
                  {personal.title}
                </p>
              </div>
            </div>

            {/* Quick Core Strengths Matrix */}
            <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/10 light:border-[#C5A059]/20">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block mb-3">
                Key Competencies
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {personal.strengths.slice(0, 4).map((strength, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80 dark:text-white/80 light:text-zinc-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Bento Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Dynamic About Narrative Cards */}
            {personal.aboutSections.map((section, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-[#C5A059]/20 hover:border-[#C5A059]/40 hover:bg-white/[0.05] transition-all backdrop-blur-md relative group shadow-xl"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#C5A059]">
                    {idx === 0 ? (
                      <Terminal className="w-4 h-4" />
                    ) : idx === 1 ? (
                      <Code2 className="w-4 h-4" />
                    ) : (
                      <Target className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white dark:text-white light:text-zinc-900 font-heading">
                      {section.title}
                    </h4>
                    <p className="text-[11px] text-white/40 font-mono tracking-wider uppercase">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/60 dark:text-white/60 light:text-zinc-600 leading-relaxed font-light">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Creative & Technical Interests Tags */}
            <div className="p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.03] border border-white/10 dark:border-white/10 light:border-[#C5A059]/20 backdrop-blur-md">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block mb-3">
                Areas of Passion & Exploration
              </span>
              <div className="flex flex-wrap gap-2">
                {personal.passions.map((passion, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/[0.04] dark:bg-white/[0.04] light:bg-white text-white/80 dark:text-white/80 light:text-zinc-700 border border-white/10 dark:border-white/10 light:border-zinc-300 hover:border-[#C5A059]/50 hover:text-[#C5A059] transition-colors"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
