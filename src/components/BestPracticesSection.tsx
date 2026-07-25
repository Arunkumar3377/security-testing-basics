import React, { useState, useEffect } from 'react';
import { BEST_PRACTICES } from '../data/securityData';
import {
  ShieldCheck,
  RotateCcw,
  Download,
  Check
} from 'lucide-react';

interface BestPracticesProps {
  onUpdateCount: (completed: number, total: number) => void;
}

export const BestPracticesSection: React.FC<BestPracticesProps> = ({ onUpdateCount }) => {
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sec_completed_practices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterCategory, setFilterCategory] = useState<string>('All');

  useEffect(() => {
    try {
      localStorage.setItem('sec_completed_practices', JSON.stringify(completedIds));
    } catch (e) {
      console.error(e);
    }
    onUpdateCount(completedIds.length, BEST_PRACTICES.length);
  }, [completedIds, onUpdateCount]);

  const togglePractice = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    if (window.confirm('Reset all checklist items?')) {
      setCompletedIds([]);
    }
  };

  const categories = ['All', 'Authentication', 'Input Handling', 'Data Protection', 'Infrastructure', 'Auditing'];

  const filteredPractices =
    filterCategory === 'All'
      ? BEST_PRACTICES
      : BEST_PRACTICES.filter((b) => b.category === filterCategory);

  const percentage = Math.round((completedIds.length / BEST_PRACTICES.length) * 100);

  const handleExportChecklist = () => {
    const text = `SECURITY TESTING BEST PRACTICES CHECKLIST
Readiness Score: ${percentage}% (${completedIds.length}/${BEST_PRACTICES.length} Completed)

` + BEST_PRACTICES.map((item) => {
      const isDone = completedIds.includes(item.id);
      return `[${isDone ? 'X' : ' '}] ${item.title} (${item.category})\n    - ${item.description}\n    Tip: ${item.implementationTip}\n`;
    }).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Security-Best-Practices-Checklist.txt`;
    a.click();
  };

  return (
    <section id="bestpractices" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Security Best Practices Checklist
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interactive compliance checklist. Mark guidelines as completed to calculate system readiness
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 06
          </span>
        </div>

        {/* Readiness Meter Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              <span>Security Readiness Score</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                {completedIds.length} / {BEST_PRACTICES.length} Items
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {percentage === 100
                ? 'All security baseline standards completed!'
                : 'Complete the items below to fortify your application posture.'}
            </p>
          </div>

          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between text-xs font-mono text-blue-400 font-bold">
              <span>PROGRESS</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/50"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportChecklist}
              className="px-3.5 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download text report"
              id="export-practices-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset items"
              id="reset-practices-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-lg shadow-blue-900/30'
                  : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Checklist List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPractices.map((item) => {
            const isCompleted = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => togglePractice(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isCompleted
                    ? 'bg-slate-900 border-emerald-500/30 shadow-lg shadow-emerald-950/10'
                    : 'bg-slate-900 border-white/5 hover:border-blue-500/30'
                }`}
                id={`practice-item-${item.id}`}
              >
                {/* Checkbox Icon */}
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border border-white/20 bg-slate-950" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-bold transition-colors ${
                      isCompleted ? 'text-emerald-400 line-through' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-blue-400 border border-white/5 shrink-0 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-400 font-mono mt-2">
                    <span className="text-blue-400 font-semibold">Tip: </span> {item.implementationTip}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
