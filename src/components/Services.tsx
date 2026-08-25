import React from 'react';
import { 
  Code2, 
  Palette, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Wrench 
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Layers':
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#050505] dark:bg-[#050505] light:bg-[#fcfbfa] border-t border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase mb-3">
            <Wrench className="w-3 h-3" />
            <span>05 // CAPABILITIES & DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 font-heading mb-4">
            Services & Focus Areas
          </h2>
          <p className="text-sm sm:text-base text-white/50 dark:text-white/50 light:text-zinc-600 leading-relaxed font-light">
            [Areas of Technical Practice & Solutions] Available for freelance engagements, custom web engineering, bespoke portfolio builds, and design system consulting.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 hover:border-[#C5A059]/40 hover:bg-white/[0.05] transition-all duration-300 shadow-2xl flex flex-col justify-between backdrop-blur-md"
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 group-hover:bg-[#C5A059]/15 rounded-full blur-3xl transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-zinc-100 text-[#C5A059] flex items-center justify-center border border-white/10 dark:border-white/10 light:border-zinc-300 group-hover:border-[#C5A059]/60 group-hover:scale-105 transition-all">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    FOCUS AREA
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-zinc-900 mb-2 font-heading group-hover:text-[#C5A059] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#C5A059] mb-4">
                  {service.tagline}
                </p>
                <p className="text-sm text-white/60 dark:text-white/60 light:text-zinc-600 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/5 dark:border-white/5 light:border-zinc-100">
                  {service.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-white/80 dark:text-white/80 light:text-zinc-700 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquire Action Button */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.highlightTech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-white/50 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#C5A059] hover:underline group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
