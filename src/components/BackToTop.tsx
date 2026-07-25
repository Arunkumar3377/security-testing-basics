import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage(Math.min(100, Math.round((scrolled / totalHeight) * 100)));
      }
      setVisible(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-slate-900 border border-cyan-800/80 text-cyan-300 hover:text-white hover:bg-cyan-950/80 hover:border-cyan-500 shadow-2xl transition-all flex items-center justify-center group cursor-pointer"
      title={`Back to top (${scrollPercentage}%)`}
      id="back-to-top-btn"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};
