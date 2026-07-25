import React from 'react';
import { ABOUT_SECURITY_TESTING } from '../data/securityData';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Lock,
  Server,
  CheckCircle,
  Flame
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Sleek Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                About Security Testing
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fundamentals of web application security, risk mitigation, and CIA pillars
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 01
          </span>
        </div>

        {/* What & Why Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: What is Security Testing */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/30 transition-all shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">What is Security Testing?</h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {ABOUT_SECURITY_TESTING.definition}
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 leading-relaxed font-mono">
              <span className="text-blue-400 font-bold">// Analogy:</span> Security testing is like inspecting a building's locks, windows, and alarm systems before moving in—making sure intruders cannot break in or tamper with data.
            </div>
          </div>

          {/* Card 2: Why is it Important */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/30 transition-all shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Why is it Important?</h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {ABOUT_SECURITY_TESTING.whyImportant}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center gap-2">
                <span className="text-red-400 font-bold">$4.4M+</span>
                <span className="text-slate-400">Avg Breach Cost</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center gap-2">
                <span className="text-amber-400 font-bold">30k+</span>
                <span className="text-slate-400">Websites Hacked Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Core Objectives of Security Testing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_SECURITY_TESTING.goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/30 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {idx === 0 && <ShieldAlert className="w-5 h-5" />}
                  {idx === 1 && <FileCheck className="w-5 h-5" />}
                  {idx === 2 && <Lock className="w-5 h-5" />}
                  {idx === 3 && <Server className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-bold text-white">{goal.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CIA Triad Pillar Cards */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Foundational Security Model
              </span>
              <h3 className="text-xl font-bold text-white mt-2">The CIA Triad</h3>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">Confidentiality, Integrity, and Availability benchmark for every application asset.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ABOUT_SECURITY_TESTING.ciaTriad.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-400 font-mono">0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400 border border-white/5 font-mono">Pillar</span>
                </div>
                <h4 className="text-base font-bold text-white">{pillar.name}</h4>
                <p className="text-xs text-slate-300">{pillar.desc}</p>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-400 font-mono">
                  <span className="text-blue-400 font-semibold">e.g. </span> {pillar.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            Key Benefits of Implementing Security Testing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ABOUT_SECURITY_TESTING.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
