import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white font-mono tracking-tight">
                Security Testing <span className="text-blue-400">Basics</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              An open interactive educational platform built for students, software developer interns, and beginners to learn cybersecurity, web vulnerability prevention, and safe testing techniques.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1 text-xs font-medium">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Security Testing</a></li>
              <li><a href="#types" className="hover:text-blue-400 transition-colors">Types of Testing</a></li>
              <li><a href="#attacks" className="hover:text-blue-400 transition-colors">Common Cyber Attacks</a></li>
              <li><a href="#tools" className="hover:text-blue-400 transition-colors">Security Tools</a></li>
            </ul>
          </div>

          {/* Interactive Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Interactive Modules</h4>
            <ul className="space-y-1 text-xs font-medium">
              <li><a href="#demolab" className="hover:text-blue-400 transition-colors">Demo Lab Simulations</a></li>
              <li><a href="#quiz" className="hover:text-blue-400 transition-colors">10-Question Quiz</a></li>
              <li><a href="#bestpractices" className="hover:text-blue-400 transition-colors">Best Practices Checklist</a></li>
              <li><a href="#process" className="hover:text-blue-400 transition-colors">7-Phase Lifecycle</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact & Cheat Sheet</a></li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Security Testing Basics. Built for Educational & Authorized Testing Purposes Only.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              Made for Students & Interns
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
