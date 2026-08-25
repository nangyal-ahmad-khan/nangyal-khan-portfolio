import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Code2, 
  Layers, 
  Layers3 
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 shadow-2xl shadow-black/80 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 transition-all z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Project Hero Banner Image */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-black border-b border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/80 text-[#C5A059] border border-[#C5A059]/40 backdrop-blur-md">
                  {project.category}
                </span>
                {project.isPlaceholder && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    Editable Sample Template
                  </span>
                )}
              </div>
              <h3
                id="modal-project-title"
                className="text-2xl sm:text-4xl font-extrabold text-white font-heading"
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Tagline & Long Description */}
            <div>
              <h4 className="text-[10px] font-semibold text-[#C5A059] mb-2 font-mono uppercase tracking-widest">
                Case Study Overview
              </h4>
              <p className="text-sm sm:text-base text-white/70 dark:text-white/70 light:text-zinc-700 leading-relaxed mb-4 font-light">
                {project.longDescription}
              </p>
            </div>

            {/* Metrics if present */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-200">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-xl font-bold font-mono text-[#C5A059] block">
                      {m.value}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Highlights */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Technical Highlights & Architecture</span>
              </h4>
              <div className="space-y-2.5">
                {project.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 dark:text-white/80 light:text-zinc-700 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] dark:bg-white/[0.04] light:bg-zinc-100 text-white/80 dark:text-white/80 light:text-zinc-800 border border-white/10 dark:border-white/10 light:border-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-white/40">
                Detailed showcase and tech breakdown
              </span>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black hover:bg-[#C5A059] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                  >
                    <span>Launch Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
