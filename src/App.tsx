import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TestingTypesSection } from './components/TestingTypesSection';
import { AttacksSection } from './components/AttacksSection';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { ToolsSection } from './components/ToolsSection';
import { BestPracticesSection } from './components/BestPracticesSection';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { DemoLabSection } from './components/DemoLabSection';
import { ContactSection } from './components/ContactSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedPracticesCount, setCompletedPracticesCount] = useState(0);
  const [totalPracticesCount, setTotalPracticesCount] = useState(7);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    // Sync dark class on document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        completedCount={completedPracticesCount}
        totalPractices={totalPracticesCount}
        quizScore={quizScore}
      />

      {/* Main Content Area */}
      <main>
        {/* 1. Hero */}
        <Hero
          onGetStarted={() => handleScrollToSection('about')}
          onTryLab={() => handleScrollToSection('demolab')}
        />

        {/* 2. About Security Testing */}
        <AboutSection />

        {/* 3. Types of Security Testing */}
        <TestingTypesSection />

        {/* 4. Common Cyber Attacks */}
        <AttacksSection />

        {/* 5. Security Testing Process Timeline */}
        <ProcessTimelineSection />

        {/* 6. Security Testing Tools */}
        <ToolsSection />

        {/* 7. Best Practices Checklist */}
        <BestPracticesSection
          onUpdateCount={(completed, total) => {
            setCompletedPracticesCount(completed);
            setTotalPracticesCount(total);
          }}
        />

        {/* 8. Demo Lab Safe Simulation */}
        <DemoLabSection />

        {/* 9. Interactive Quiz */}
        <InteractiveQuiz onScoreSave={(score) => setQuizScore(score)} />

        {/* 10. Contact & Resources */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back To Top Floating Action Button */}
      <BackToTop />

      {/* Global Search Overlay Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
