import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ArrowUpRight, 
  Sparkles,
  Mail,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  name: string;
  isAvailable: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  name,
  isAvailable,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', number: '01' },
    { name: 'About', href: '#about', number: '02' },
    { name: 'Skills', href: '#skills', number: '03' },
    { name: 'Projects', href: '#projects', number: '04' },
    { name: 'Experience', href: '#experience', number: '05' },
    { name: 'Services', href: '#services', number: '06' },
    { name: 'Contact', href: '#contact', number: '07' },
  ];

  // Prevent background scrolling when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Animation variants for full-screen overlay
  const overlayVariants = {
    closed: {
      opacity: 0,
      clipPath: 'circle(0% at top right)',
      transition: {
        duration: 0.45,
        ease: [0.32, 0, 0.67, 0],
      },
    },
    open: {
      opacity: 1,
      clipPath: 'circle(150% at top right)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const navListVariants = {
    closed: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 28,
      filter: 'blur(4px)',
      transition: {
        duration: 0.25,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#050505]/90 dark:bg-[#050505]/90 light:bg-[#fcfbfa]/90 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-[#C5A059]/20 shadow-xl shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Monogram */}
            <a
              id="brand-logo"
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="group flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-lg"
              aria-label={`${name} Home`}
            >
              {/* Elegant Rotated Diamond Monogram */}
              <div className="relative flex items-center justify-center w-8 h-8 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#8E713E] transform rotate-45 shadow-lg shadow-[#C5A059]/20 group-hover:scale-105 transition-transform duration-300">
                <span className="transform -rotate-45 font-mono font-bold text-[11px] text-black">
                  NK
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-light tracking-[0.25em] uppercase text-zinc-100 dark:text-zinc-100 light:text-zinc-900 group-hover:text-[#C5A059] transition-colors">
                  {name}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'
                    }`}
                  />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-400 light:text-zinc-500">
                    {isAvailable ? 'Available' : 'Engaged'}
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              id="desktop-nav"
              className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.04] border border-white/10 dark:border-white/10 light:border-[#C5A059]/20 backdrop-blur-md"
              aria-label="Primary Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    id={`nav-link-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-[11px] uppercase tracking-widest transition-all duration-200 ${
                      isActive
                        ? 'text-[#C5A059] font-semibold'
                        : 'text-zinc-400 dark:text-white/50 light:text-zinc-600 hover:text-[#C5A059] dark:hover:text-[#C5A059] light:hover:text-[#8E713E]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Theme Switcher */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.05] border border-white/10 dark:border-white/10 light:border-[#C5A059]/30 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-[#C5A059] hover:border-[#C5A059]/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-zinc-800" />
                )}
              </button>

              {/* Let's Talk CTA (Desktop) */}
              <a
                id="nav-cta-talk"
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2 text-[11px] uppercase tracking-wider font-semibold rounded-full border border-[#C5A059]/40 text-[#C5A059] bg-[#C5A059]/5 hover:bg-[#C5A059] hover:text-black shadow-lg shadow-[#C5A059]/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
              >
                <Sparkles className="w-3 h-3 opacity-90" />
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3 h-3 opacity-80" />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.05] border border-white/10 dark:border-white/10 light:border-zinc-300 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-50 w-full h-full min-h-screen bg-[#050505] text-white flex flex-col justify-between overflow-y-auto px-6 py-6 md:hidden select-none"
          >
            {/* Background luxury ambient glow */}
            <div className="absolute top-1/4 -right-24 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -left-20 w-72 h-72 bg-[#8E713E]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar inside Overlay */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#8E713E] transform rotate-45">
                  <span className="transform -rotate-45 font-mono font-bold text-[10px] text-black">
                    NK
                  </span>
                </div>
                <span className="text-sm font-light tracking-[0.25em] uppercase text-white">
                  {name}
                </span>
              </a>

              <div className="flex items-center gap-3">
                {/* Theme toggle in mobile overlay */}
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-[#C5A059] transition-colors"
                  aria-label="Toggle color theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-[#C5A059]" />
                  ) : (
                    <Moon className="w-4 h-4 text-white" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  id="mobile-menu-close"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group p-2.5 rounded-full bg-white/[0.08] hover:bg-[#C5A059] border border-white/15 text-white hover:text-black transition-all cursor-pointer shadow-lg"
                  aria-label="Close mobile navigation menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Navigation Links with Staggered Entrance */}
            <motion.nav
              variants={navListVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative z-10 my-auto py-8 flex flex-col space-y-2"
              aria-label="Mobile Navigation"
            >
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059]/70 mb-2 pl-3">
                // NAVIGATION DIRECTORY
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <a
                      id={`mobile-nav-item-${link.name.toLowerCase()}`}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                        isActive
                          ? 'bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#C5A059]'
                          : 'text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-[#C5A059]/60 font-light">
                          {link.number}
                        </span>
                        <span className="text-2xl font-light tracking-wider font-heading uppercase group-hover:translate-x-1.5 transition-transform duration-200">
                          {link.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-sm shadow-[#C5A059]" />
                        )}
                        <ArrowUpRight className={`w-4 h-4 transition-all duration-200 ${
                          isActive ? 'text-[#C5A059] opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`} />
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom Actions & Status in Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="relative z-10 pt-5 border-t border-white/10 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                    {isAvailable ? 'Available for new opportunities' : 'Engaged in Projects'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#C5A059]">Remote / Global</span>
              </div>

              {/* Direct Let's Talk CTA */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-black hover:bg-[#C5A059] text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Start a Project Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

