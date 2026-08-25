import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Info,
  Sparkles
} from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#050505] dark:bg-[#050505] light:bg-[#f4f1ea] border-t border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase mb-3">
            <Briefcase className="w-3 h-3" />
            <span>04 // CAREER & EDUCATION MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 font-heading mb-4">
            Experience & Journey
          </h2>
          <p className="text-sm sm:text-base text-white/50 dark:text-white/50 light:text-zinc-600 leading-relaxed font-light">
            [Editable Timeline Placeholders] Structured history layout preserving strict personal honesty. Designed so you can quickly populate with real professional milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 dark:border-white/10 light:border-[#C5A059]/30 space-y-12 max-w-4xl">
          {experience.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#050505] dark:bg-[#050505] light:bg-white border-2 border-[#C5A059] flex items-center justify-center shadow-lg shadow-[#C5A059]/20 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
              </div>

              {/* Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 group-hover:border-[#C5A059]/40 group-hover:bg-white/[0.05] transition-all backdrop-blur-md shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white dark:text-white light:text-zinc-900 font-heading">
                        {item.role}
                      </h3>
                      {item.isPlaceholder && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/80 text-amber-300 border border-amber-500/20">
                          Placeholder Entry
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-medium">
                      {item.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/60 dark:text-white/60 light:text-zinc-600 leading-relaxed mb-4 font-light">
                  {item.description}
                </p>

                {/* Achievements Highlights */}
                <div className="space-y-2 mb-4">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 dark:text-white/80 light:text-zinc-700 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 dark:border-white/5 light:border-zinc-100">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-white/70 dark:text-white/70 light:text-zinc-700 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
