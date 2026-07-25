import React, { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Terminal,
  Award
} from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  onOpenSearch: () => void;
  completedCount: number;
  totalPractices: number;
  quizScore: number | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onOpenSearch,
  completedCount,
  totalPractices,
  quizScore
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Types', href: '#types' },
    { name: 'Attacks', href: '#attacks' },
    { name: 'Process', href: '#process' },
    { name: 'Tools', href: '#tools' },
    { name: 'Checklist', href: '#bestpractices' },
    { name: 'Demo Lab', href: '#demolab' },
    { name: 'Quiz', href: '#quiz' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const progressPercent = Math.round((completedCount / (totalPractices || 1)) * 100);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-xl shadow-slate-950/50'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-slate-950/40 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-3 group cursor-pointer"
            id="nav-logo-link"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-sans">
              SEC_LAB <span className="text-blue-500">BASICS</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section: Progress & Actions */}
          <div className="flex items-center space-x-3">
            {/* Progress Bar Display */}
            <div className="hidden sm:flex items-center gap-3 pr-2 border-r border-white/10">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Checklist</div>
                <div className="w-20 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quiz Score Badge if attempted */}
            {quizScore !== null && (
              <a
                href="#quiz"
                onClick={(e) => handleNavClick(e, '#quiz')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono"
                title="Quiz Score"
              >
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>{quizScore}/10</span>
              </a>
            )}

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-lg border text-xs sm:text-sm flex items-center gap-2 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-white/10 text-slate-300 hover:border-blue-500/50 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-blue-400'
              }`}
              title="Search topics, attacks & tools (Ctrl+K)"
              id="search-trigger-btn"
            >
              <Search className="w-4 h-4 text-blue-400" />
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-white/10">
                Ctrl K
              </kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-white/10 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-white/10 px-4 pt-2 pb-6 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between py-2 border-b border-white/10 mb-2">
            <span className="text-xs font-mono text-blue-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> Course Modules
            </span>
            <span className="text-xs text-slate-400">
              Progress: {completedCount}/{totalPractices} ({progressPercent}%)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 border border-white/5 hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/30 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
