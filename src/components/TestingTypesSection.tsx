import React, { useState } from 'react';
import { SECURITY_TYPES } from '../data/securityData';
import { SecurityTypeInfo } from '../types';
import {
  Search,
  Bug,
  KeyRound,
  ShieldCheck,
  Timer,
  Database,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';

export const TestingTypesSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<SecurityTypeInfo | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5 text-blue-400" />;
      case 'Bug':
        return <Bug className="w-5 h-5 text-amber-400" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-indigo-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Timer':
        return <Timer className="w-5 h-5 text-purple-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="types" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Types of Security Testing
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                6 core methodologies used to identify and fix vulnerabilities across software layers
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 02
          </span>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURITY_TYPES.map((typeItem) => (
            <div
              key={typeItem.id}
              className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/30 transition-all shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 group-hover:border-blue-500/20 transition-all">
                    {getIcon(typeItem.iconName)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-white/5 uppercase tracking-wider">
                    Category
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {typeItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {typeItem.shortDesc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5">
                <button
                  onClick={() => setSelectedType(typeItem)}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-950 hover:bg-blue-600/10 text-blue-400 hover:text-white border border-white/5 hover:border-blue-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  id={`learn-more-${typeItem.id}`}
                >
                  <span>Explore Methodology</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Detailed Security Type Info */}
      {selectedType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  {getIcon(selectedType.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedType.title}</h3>
                  <p className="text-xs text-blue-400 font-mono">Security Testing Breakdown</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedType(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                id="close-type-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-blue-400 tracking-wider uppercase">Overview</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedType.fullDesc}</p>
            </div>

            {/* Key Activities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-blue-400 tracking-wider uppercase">Key Activities</h4>
              <ul className="grid grid-cols-1 gap-2">
                {selectedType.keyActivities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When & Who */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 uppercase">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Execution Phase
                </span>
                <p className="text-xs text-slate-200 font-medium">{selectedType.whenToPerform}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 uppercase">
                  <Users className="w-3.5 h-3.5 text-blue-400" /> Target Roles
                </span>
                <p className="text-xs text-slate-200 font-medium">{selectedType.targetAudience}</p>
              </div>
            </div>

            {/* Best Tools */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-blue-400 tracking-wider uppercase">Recommended Security Tools</h4>
              <div className="flex flex-wrap gap-2">
                {selectedType.bestTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setSelectedType(null)}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-blue-900/20"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
