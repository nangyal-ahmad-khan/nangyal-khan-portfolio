import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Check, 
  Mail, 
  Terminal, 
  Globe2, 
  Layers, 
  Cpu, 
  ChevronDown 
} from 'lucide-react';

interface HeroProps {
  name: string;
  supportingHeadline: string;
  bioIntroduction: string;
  email: string;
  isAvailable: boolean;
  availabilityStatus: string;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  supportingHeadline,
  bioIntroduction,
  email,
  isAvailable,
  availabilityStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Subtle interactive particle canvas for luxury futuristic feel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const particleCount = Math.min(Math.floor(window.innerWidth / 28), 50);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle particles and connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(197, 160, 89, ${0.09 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-tech-grid"
    >
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-40 light:opacity-20"
        aria-hidden="true"
      />

      {/* Atmospheric Radial Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#C5A059]/15 via-[#8E713E]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          id="hero-availability-pill"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.04] border border-white/10 dark:border-white/10 light:border-[#C5A059]/30 shadow-inner backdrop-blur-md mb-8"
        >
          <img
            src="/images/profile.jpg"
            alt={name}
            className="w-5 h-5 rounded-full object-cover object-[50%_14%] border border-[#C5A059]/40 ring-1 ring-[#C5A059]/20"
          />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-medium text-white/50 dark:text-white/50 light:text-zinc-700">
            {availabilityStatus}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#C5A059]">Creative Technologist</span>
        </motion.div>

        {/* Primary Headline: Nangyal Khan with Elegant Gradient */}
        <motion.h1
          id="hero-name-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white dark:text-white light:text-zinc-950 mb-4 font-heading leading-[0.95]"
        >
          <span>Nangyal</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e7d3] to-[#C5A059]">
            Khan
          </span>
        </motion.h1>

        {/* Supporting Headline */}
        <motion.h2
          id="hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white/80 dark:text-white/80 light:text-zinc-800 max-w-3xl mb-6 font-heading"
        >
          {supportingHeadline}
        </motion.h2>

        {/* Short Professional Introduction */}
        <motion.p
          id="hero-intro-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white/60 dark:text-white/60 light:text-zinc-600 max-w-2xl font-light leading-relaxed mb-10"
        >
          {bioIntroduction}
        </motion.p>

        {/* Two Premium CTA Buttons matching Elegant Dark Archetype */}
        <motion.div
          id="hero-cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
        >
          {/* View My Work CTA */}
          <button
            id="hero-btn-view-work"
            onClick={() => scrollTo('projects')}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#C5A059] transition-all transform hover:-translate-y-0.5 shadow-xl shadow-white/5 cursor-pointer"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Let's Work Together CTA */}
          <button
            id="hero-btn-collaborate"
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/20 hover:border-[#C5A059] text-white hover:text-[#C5A059] font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-white/[0.04] transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>GET IN TOUCH</span>
          </button>
        </motion.div>

        {/* Quick Email Interaction Chip */}
        <motion.div
          id="hero-quick-email-chip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.03] border border-white/10 dark:border-white/10 light:border-[#C5A059]/30 text-xs font-mono text-white/50 dark:text-white/50 light:text-zinc-600"
        >
          <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{email}</span>
          <button
            id="hero-copy-email-btn"
            onClick={handleCopyEmail}
            className="p-1 hover:text-[#C5A059] rounded transition-colors"
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span className="text-[10px]">Copied!</span>
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          id="hero-scroll-indicator"
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.8 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className="mt-14 p-2 text-white/30 hover:text-[#C5A059] transition-colors focus:outline-none"
          aria-label="Scroll down to About section"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};
