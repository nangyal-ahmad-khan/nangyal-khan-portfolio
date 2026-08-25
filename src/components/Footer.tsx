import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  ArrowUp, 
  Sparkles, 
  Clock 
} from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  name: string;
  socials: PortfolioData['socials'];
}

export const Footer: React.FC<FooterProps> = ({ name, socials }) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' UTC'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative py-16 bg-[#050505] dark:bg-[#050505] light:bg-[#0c0c0e] border-t border-white/10 text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          
          {/* Brand and Philosophy */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-black border border-[#C5A059]/40 flex items-center justify-center font-mono font-bold text-xs text-[#C5A059] rotate-45 group-hover:rotate-0 transition-transform">
                <span className="-rotate-45">NK</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading ml-1">
                {name}
              </h3>
            </div>
            <p className="text-xs text-white/40 max-w-sm font-light">
              Building digital experiences with curiosity, creativity, and technology.
            </p>
          </div>

          {/* Social Links List */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/60 hover:text-[#C5A059] transition-all hover:scale-105"
                title={`${social.platform} (${social.handle})`}
                aria-label={`Visit ${social.platform}`}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>

          {/* Back to top & Live Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-mono text-white/40">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{timeString || 'UTC'}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-[#C5A059] text-white hover:text-black border border-white/10 transition-all cursor-pointer shadow-md"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Engineered with React 19, TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
