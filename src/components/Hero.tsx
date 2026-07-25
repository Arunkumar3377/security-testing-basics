import React from 'react';
import {
  ShieldCheck,
  Lock,
  Terminal,
  ArrowRight,
  FlaskConical,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onTryLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onTryLab }) => {
  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-16 lg:pb-20 overflow-hidden bg-slate-950">
      {/* Subtle Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Sleek Blue Radial Glows */}
      <div className="absolute right-10 top-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-10 top-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Banner Box */}
          <div className="lg:col-span-8 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900/90 rounded-3xl border border-white/10 p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>Interactive Security Course</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-sans tracking-tight">
              Learn Security <br />
              <span className="text-blue-400">Testing Basics</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
              Master the foundations of cybersecurity. Protect web applications from OWASP Top 10 vulnerabilities like SQLi, XSS, IDOR, and Broken Auth through interactive labs and checklists.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2 cursor-pointer"
                id="hero-get-started-btn"
              >
                <span>Resume Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTryLab}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
                id="hero-try-lab-btn"
              >
                <FlaskConical className="w-4 h-4 text-blue-400" />
                <span>Launch Attack Lab</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/60 rounded-2xl border border-white/5 p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-white/10 transition-colors">
              <span className="text-3xl font-bold text-blue-400 font-mono">12</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-mono">Security Tools</span>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-white/5 p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-white/10 transition-colors">
              <span className="text-3xl font-bold text-emerald-400 font-mono">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-mono">Safe Sandbox</span>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-white/5 p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-white/10 transition-colors">
              <span className="text-3xl font-bold text-amber-400 font-mono">08</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-mono">Lab Scenarios</span>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-white/5 p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-white/10 transition-colors">
              <span className="text-3xl font-bold text-violet-400 font-mono">10</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-mono">Quiz Quest</span>
            </div>
          </div>

        </div>

        {/* Feature Highlights Banner */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">OWASP Top 10 Aligned</p>
              <p className="text-[11px] text-slate-400">Industry standard curriculum</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Safe Interactive Simulations</p>
              <p className="text-[11px] text-slate-400">Zero-risk environment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Developer Best Practices</p>
              <p className="text-[11px] text-slate-400">Prevention & code mitigation</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
