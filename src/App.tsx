import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/portfolioData';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state: dark mode as default primary experience
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const portfolioData = initialPortfolioData;
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServicePreset(serviceTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-slate-50 text-zinc-100 dark:text-zinc-100 light:text-zinc-900 transition-colors duration-300 relative selection:bg-cyan-500/30 selection:text-cyan-200`}>
      {/* Interactive Cursor Glow */}
      <CursorGlow />

      {/* Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        name={portfolioData.personal.name}
        isAvailable={portfolioData.personal.isAvailableForWork}
      />

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        {/* Cinematic Hero */}
        <Hero
          name={portfolioData.personal.name}
          supportingHeadline={portfolioData.personal.supportingHeadline}
          bioIntroduction={portfolioData.personal.bioIntroduction}
          email={portfolioData.personal.email}
          isAvailable={portfolioData.personal.isAvailableForWork}
          availabilityStatus={portfolioData.personal.availabilityStatus}
        />

        {/* Key Metrics / Highlights */}
        <Stats stats={portfolioData.stats} />

        {/* About Nangyal Khan */}
        <About personal={portfolioData.personal} />

        {/* Skills & Architecture Matrix */}
        <Skills categories={portfolioData.skillCategories} />

        {/* Featured Projects Showcase */}
        <Projects projects={portfolioData.projects} />

        {/* Career & Learning Milestones Timeline */}
        <Experience experience={portfolioData.experience} />

        {/* Services & Focus Disciplines */}
        <Services
          services={portfolioData.services}
          onSelectService={handleSelectService}
        />

        {/* Direct Contact & Collaboration */}
        <Contact
          email={portfolioData.personal.email}
          name={portfolioData.personal.name}
          location={portfolioData.personal.location}
          whatsappNumber={portfolioData.personal.whatsappNumber}
          selectedServicePreset={selectedServicePreset}
        />
      </main>

      {/* Minimal Footer */}
      <Footer
        name={portfolioData.personal.name}
        socials={portfolioData.socials}
      />
    </div>
  );
}
