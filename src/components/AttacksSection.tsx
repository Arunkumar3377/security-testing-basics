import React, { useState } from 'react';
import { COMMON_ATTACKS } from '../data/securityData';
import {
  ShieldAlert,
  Code2,
  CheckCircle,
  AlertTriangle,
  Copy,
  Check,
  Info
} from 'lucide-react';

export const AttacksSection: React.FC = () => {
  const [activeAttackId, setActiveAttackId] = useState<string>(COMMON_ATTACKS[0].id);
  const [codeTab, setCodeTab] = useState<'vulnerable' | 'prevented'>('vulnerable');
  const [copiedCode, setCopiedCode] = useState(false);

  const activeAttack = COMMON_ATTACKS.find((a) => a.id === activeAttackId) || COMMON_ATTACKS[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-white/10';
    }
  };

  return (
    <section id="attacks" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Common Cyber Attacks & Prevention
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Inspect OWASP vulnerabilities, vulnerable code patterns, and secure mitigations
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 03
          </span>
        </div>

        {/* Attack Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COMMON_ATTACKS.map((attack) => {
            const isActive = attack.id === activeAttackId;
            return (
              <button
                key={attack.id}
                onClick={() => {
                  setActiveAttackId(attack.id);
                  setCodeTab('vulnerable');
                }}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-900/20'
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
                id={`attack-tab-${attack.id}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{attack.shortName}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 font-mono rounded border ${getSeverityBadge(attack.severity)}`}>
                    {attack.severity}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1">{attack.category}</p>
              </button>
            );
          })}
        </div>

        {/* Active Attack View Deck */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{activeAttack.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border ${getSeverityBadge(activeAttack.severity)}`}>
                  {activeAttack.severity} Severity
                </span>
              </div>
              <p className="text-xs text-blue-400 font-mono mt-1">Category: {activeAttack.category}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 max-w-md">
              <span className="font-bold text-blue-400 font-mono">Summary: </span>
              {activeAttack.description}
            </div>
          </div>

          {/* Explanation & Real World Example */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4" /> How It Works
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeAttack.explanation}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Real-World Scenario
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeAttack.realWorldExample}
              </p>
            </div>
          </div>

          {/* Interactive Code Switcher */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setCodeTab('vulnerable')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    codeTab === 'vulnerable'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  id="tab-vulnerable-code"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Vulnerable Code</span>
                </button>

                <button
                  onClick={() => setCodeTab('prevented')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    codeTab === 'prevented'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  id="tab-prevented-code"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Prevented / Secure Code</span>
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopyCode(
                    codeTab === 'vulnerable'
                      ? activeAttack.vulnerableCode.code
                      : activeAttack.preventedCode.code
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-white/5 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Snippet Container */}
            <div className="relative rounded-2xl bg-slate-950 border border-white/5 overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/5 text-slate-400">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Language: {activeAttack.vulnerableCode.language}</span>
                </span>
                <span className={`text-[11px] font-bold ${codeTab === 'vulnerable' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {codeTab === 'vulnerable' ? 'UNSECURE CODE' : 'SECURE IMPLEMENTATION'}
                </span>
              </div>

              <pre className="p-4 sm:p-5 text-slate-200 overflow-x-auto leading-relaxed">
                <code>
                  {codeTab === 'vulnerable'
                    ? activeAttack.vulnerableCode.code
                    : activeAttack.preventedCode.code}
                </code>
              </pre>

              <div className="p-3.5 bg-slate-900/60 border-t border-white/5 text-slate-300 text-xs">
                <span className="font-bold text-blue-400">Analysis: </span>
                {codeTab === 'vulnerable'
                  ? activeAttack.vulnerableCode.explanation
                  : activeAttack.preventedCode.explanation}
              </div>
            </div>
          </div>

          {/* Prevention Methods List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Prevention & Remediation Steps
              </h4>
              <ul className="space-y-2">
                {activeAttack.preventionMethods.map((method, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950 border border-white/5">
                    <span className="text-blue-400 font-mono font-bold">•</span>
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Potential Impact if Unpatched
              </h4>
              <ul className="space-y-2">
                {activeAttack.impact.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950 border border-white/5">
                    <span className="text-red-400 font-mono font-bold">!</span>
                    <span>{imp}</span>
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
