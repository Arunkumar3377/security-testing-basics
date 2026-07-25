import React, { useState } from 'react';
import { PROCESS_TIMELINE } from '../data/securityData';
import { ProcessPhase } from '../types';
import {
  FileText,
  Radar,
  Scan,
  Crosshair,
  ClipboardList,
  Wrench,
  CheckCircle2,
  ChevronRight,
  ListCheck,
  PackageCheck
} from 'lucide-react';

export const ProcessTimelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const selectedPhase: ProcessPhase =
    PROCESS_TIMELINE.find((p) => p.stepNumber === activeStep) || PROCESS_TIMELINE[0];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'Radar':
        return <Radar className="w-5 h-5 text-blue-400" />;
      case 'Scan':
        return <Scan className="w-5 h-5 text-indigo-400" />;
      case 'Crosshair':
        return <Crosshair className="w-5 h-5 text-amber-400" />;
      case 'ClipboardList':
        return <ClipboardList className="w-5 h-5 text-purple-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-cyan-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="process" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Security Testing Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                7 structured phases for auditing, analyzing, patching, and verifying software security
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 04
          </span>
        </div>

        {/* Timeline Desktop & Mobile Steps Bar */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center min-w-[700px] justify-between relative px-4">
            
            {/* Horizontal Line behind icons */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-white/5 z-0" />

            {PROCESS_TIMELINE.map((phase) => {
              const isCurrent = phase.stepNumber === activeStep;
              const isPast = phase.stepNumber < activeStep;

              return (
                <button
                  key={phase.stepNumber}
                  onClick={() => setActiveStep(phase.stepNumber)}
                  className={`relative z-10 flex flex-col items-center gap-2 group cursor-pointer transition-all ${
                    isCurrent ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  id={`process-step-btn-${phase.stepNumber}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all border shadow-lg ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-400 shadow-blue-900/40'
                        : isPast
                        ? 'bg-slate-900 text-blue-400 border-blue-500/30'
                        : 'bg-slate-900 text-slate-400 border-white/5'
                    }`}
                  >
                    0{phase.stepNumber}
                  </div>
                  <span className={`text-[11px] font-mono max-w-[90px] text-center line-clamp-1 ${
                    isCurrent ? 'text-blue-400 font-bold' : 'text-slate-400'
                  }`}>
                    {phase.phaseName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Detailed Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/5">
                {getStepIcon(selectedPhase.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono text-blue-400">Phase 0{selectedPhase.stepNumber} of 07</span>
                <h3 className="text-xl font-bold text-white">{selectedPhase.phaseName}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs font-medium text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500/30 cursor-pointer"
              >
                Previous Step
              </button>
              <button
                disabled={activeStep === 7}
                onClick={() => setActiveStep((prev) => Math.min(7, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer shadow-lg shadow-blue-900/20"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedPhase.detailedDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Key Tasks */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-3">
              <h4 className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <ListCheck className="w-4 h-4" /> Core Activities
              </h4>
              <ul className="space-y-2">
                {selectedPhase.keyTasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-3">
              <h4 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <PackageCheck className="w-4 h-4" /> Phase Deliverables
              </h4>
              <ul className="space-y-2">
                {selectedPhase.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-xl bg-slate-900 border border-white/5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
