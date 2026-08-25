import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Terminal, 
  Sparkles, 
  Check, 
  Play, 
  Copy, 
  Laptop, 
  Box,
  FileCode
} from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive Live Component snippet for high-end dev demonstration
  const [interactiveCount, setInteractiveCount] = useState(42);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const allCategories = ['All', ...categories.map((c) => c.name)];

  const filteredSkills =
    activeCategory === 'All'
      ? categories.flatMap((cat) =>
          cat.skills.map((skill) => ({ ...skill, categoryName: cat.name }))
        )
      : (
          categories.find((c) => c.name === activeCategory)?.skills || []
        ).map((skill) => ({ ...skill, categoryName: activeCategory }));

  const sampleTypeScriptCode = `import React, { useState } from 'react';

export const InteractiveExperience: React.FC = () => {
  const [metric, setMetric] = useState<number>(${interactiveCount});
  
  return (
    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <h4 className="text-cyan-400 font-mono text-xs">NK_ENGINE_READY</h4>
      <p className="text-zinc-200 font-bold">Metric Value: {metric}</p>
    </div>
  );
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleTypeScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#050505] dark:bg-[#050505] light:bg-[#f4f1ea] border-t border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase mb-3">
            <Cpu className="w-3 h-3" />
            <span>02 // ARCHITECTURE & TOOLING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 font-heading mb-4">
            Skills & Technology Matrix
          </h2>
          <p className="text-sm sm:text-base text-white/50 dark:text-white/50 light:text-zinc-600 leading-relaxed font-light">
            [Editable Stack Placeholders] Competencies structured by domain without misleading percentage ratings. Categorized by development workflows, interface design systems, and modern web infrastructure.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A059] text-black font-bold shadow-lg shadow-[#C5A059]/20 border border-[#C5A059]'
                    : 'bg-white/[0.03] dark:bg-white/[0.03] light:bg-white text-white/60 dark:text-white/60 light:text-zinc-700 hover:text-[#C5A059] border border-white/10 dark:border-white/10 light:border-zinc-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={`${skill.name}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                className={`group relative p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white/80 border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                  selectedSkill === skill.name
                    ? 'border-[#C5A059] bg-white/[0.08] shadow-xl shadow-[#C5A059]/10'
                    : 'border-white/10 dark:border-white/10 light:border-zinc-200 hover:border-[#C5A059]/40 hover:bg-white/[0.05] hover:-translate-y-1'
                }`}
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 group-hover:bg-[#C5A059]/15 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] dark:bg-white/[0.05] light:bg-zinc-100 flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-all">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white dark:text-white light:text-zinc-900 group-hover:text-[#C5A059] transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-white/40">
                        {skill.tag}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                      skill.level === 'Core Focus'
                        ? 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/40 font-semibold'
                        : 'bg-white/[0.04] text-white/50 border-white/10'
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>

                <p className="text-xs text-white/60 dark:text-white/60 light:text-zinc-600 leading-relaxed font-light">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Live Interactive Code & Component Terminal */}
        <div className="rounded-2xl bg-black/90 border border-white/10 shadow-2xl overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-white/40 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>nangyal-interactive-lab.tsx</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-full bg-black p-0.5 border border-white/10">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Interactive Demo
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                    activeTab === 'code'
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Source Code
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:text-[#C5A059] transition-colors"
                title="Copy code"
                aria-label="Copy TypeScript code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8">
            {activeTab === 'preview' ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="space-y-2 text-left w-full md:w-auto">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block">
                    Interactive Component State
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">
                    Live UI Reactivity Demonstration
                  </h4>
                  <p className="text-xs text-white/50 max-w-md font-light">
                    Testing state transitions, clean TypeScript hooks, and instant DOM updates.
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-end">
                  <div className="px-5 py-2.5 rounded-xl bg-black border border-white/10 text-center min-w-[110px]">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">State Value</span>
                    <span className="text-2xl font-mono font-bold text-[#C5A059]">
                      {interactiveCount}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setInteractiveCount((c) => c + 1)}
                      className="px-4 py-2 rounded-lg bg-white text-black hover:bg-[#C5A059] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Increment (+1)
                    </button>
                    <button
                      onClick={() => setInteractiveCount(42)}
                      className="px-4 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60 text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer"
                    >
                      Reset (42)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <pre className="text-xs font-mono text-white/80 overflow-x-auto p-4 bg-black rounded-xl border border-white/10 leading-relaxed">
                <code>{sampleTypeScriptCode}</code>
              </pre>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
