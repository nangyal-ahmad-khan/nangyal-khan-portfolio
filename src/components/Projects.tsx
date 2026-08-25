import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Layers, 
  Info 
} from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Web App', 'UI/UX & Concepts', 'Creative Tech'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#050505] dark:bg-[#050505] light:bg-[#fcfbfa] border-t border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase mb-3">
              <FolderGit2 className="w-3 h-3" />
              <span>03 // SELECTED BUILDS & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 font-heading">
              Featured Projects
            </h2>
            <p className="text-sm text-white/50 dark:text-white/50 light:text-zinc-600 mt-2 max-w-2xl font-light">
              Architectural builds, applications, and digital products crafted with precision. Click any card to explore the full case study and technical breakdown.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C5A059] text-black font-bold shadow-lg shadow-[#C5A059]/20 border border-[#C5A059]'
                    : 'bg-white/[0.03] dark:bg-white/[0.03] light:bg-white text-white/60 dark:text-white/60 light:text-zinc-700 hover:text-[#C5A059] border border-white/10 dark:border-white/10 light:border-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 overflow-hidden shadow-2xl hover:border-[#C5A059]/50 dark:hover:border-[#C5A059]/50 light:hover:border-[#C5A059]/50 hover:shadow-2xl hover:shadow-[#C5A059]/10 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  {/* Project Image & Overlay */}
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="relative w-full aspect-video overflow-hidden cursor-pointer bg-black"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

                    {/* Category & Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/80 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/40">
                        {project.category}
                      </span>
                      {project.isPlaceholder && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/80 backdrop-blur-md text-amber-300/90 border border-amber-500/30">
                          Template
                        </span>
                      )}
                    </div>

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[3px] bg-black/40">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider shadow-2xl hover:bg-[#C5A059] transition-all transform hover:scale-105 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Explore Case Study</span>
                      </button>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="p-6 sm:p-7">
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-xl font-bold text-white dark:text-white light:text-zinc-900 group-hover:text-[#C5A059] transition-colors cursor-pointer font-heading mb-2 flex items-center justify-between"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#C5A059] shrink-0" />
                    </h3>

                    <p className="text-xs sm:text-sm text-white/60 dark:text-white/60 light:text-zinc-600 leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] dark:bg-white/[0.04] light:bg-zinc-100 text-white/70 dark:text-white/70 light:text-zinc-700 border border-white/10 dark:border-white/10 light:border-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-white/5 dark:border-white/5 light:border-zinc-100">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-[#C5A059] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 transition-colors"
                        title="Source Code"
                        aria-label="View Source Code on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-[#C5A059] text-xs font-semibold uppercase tracking-wider transition-all"
                        title="Live Demo"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
};
