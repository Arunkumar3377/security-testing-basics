import React, { useState } from 'react';
import { SECURITY_TOOLS } from '../data/securityData';
import {
  Shield,
  Layers,
  Server,
  Network,
  Activity,
  Terminal,
  ExternalLink,
  Code,
  Check
} from 'lucide-react';

export const ToolsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Scanner', 'Proxy', 'Network', 'Sniffer', 'Framework'];

  const filteredTools =
    selectedCategory === 'All'
      ? SECURITY_TOOLS
      : SECURITY_TOOLS.filter((t) => t.category === selectedCategory);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-indigo-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-red-400" />;
      default:
        return <Shield className="w-5 h-5 text-blue-400" />;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-white/10';
    }
  };

  return (
    <section id="tools" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Popular Security Testing Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Industry-standard toolkits used by security analysts, penetration testers, and QA engineers
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 05
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-lg shadow-blue-900/30'
                  : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
              id={`tool-filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/30 transition-all shadow-xl flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-4">
                {/* Card Top Row */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 group-hover:border-blue-500/20 transition-all">
                    {getToolIcon(tool.logoIcon)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getDifficultyBadge(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-white/5 uppercase">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Tool Name & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {tool.description}
                  </p>
                </div>

                {/* Primary Use Box */}
                <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">Primary Use:</span>
                  <p className="text-xs text-slate-300">{tool.primaryUse}</p>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Key Features:</span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                    {tool.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Command Line Snippet */}
                {tool.sampleCommand && (
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-white/5 font-mono text-[11px] text-slate-300 flex items-center gap-2 overflow-x-auto">
                    <Code className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-slate-500">$</span>
                    <span className="truncate">{tool.sampleCommand}</span>
                  </div>
                )}
              </div>

              {/* Official Link */}
              <div className="pt-4 border-t border-white/5">
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-blue-600/10 text-xs font-mono text-slate-300 hover:text-white border border-white/5 hover:border-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  id={`tool-link-${tool.id}`}
                >
                  <span>Official Site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
