import React, { useState } from 'react';
import {
  FlaskConical,
  Database,
  Code2,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const DemoLabSection: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'sqli' | 'xss' | 'password'>('sqli');

  // --- SQLi Lab State ---
  const [sqliInput, setSqliInput] = useState<string>("admin' --");
  const [isSqliSecureMode, setIsSqliSecureMode] = useState<boolean>(false);

  // --- XSS Lab State ---
  const [xssInput, setXssInput] = useState<string>("<script>alert('XSS Attack!')</script>");
  const [isXssSanitized, setIsXssSanitized] = useState<boolean>(true);

  // --- Password Strength State ---
  const [passwordInput, setPasswordInput] = useState<string>('P@ssw0rd2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // SQLi Simulated Query Result Generator
  const getSqliResult = () => {
    if (isSqliSecureMode) {
      if (sqliInput === 'admin') {
        return [
          { id: 1, username: 'admin', role: 'Administrator', email: 'admin@sec.local' }
        ];
      }
      return [];
    } else {
      if (
        sqliInput.includes("' OR '1'='1") ||
        sqliInput.includes("' OR 1=1") ||
        sqliInput.includes("admin' --") ||
        sqliInput.includes("'--")
      ) {
        return [
          { id: 1, username: 'admin', role: 'Administrator', email: 'admin@sec.local' },
          { id: 2, username: 'john_doe', role: 'User', email: 'john@example.com' },
          { id: 3, username: 'alice_smith', role: 'Manager', email: 'alice@company.com' }
        ];
      }
      if (sqliInput === 'admin') {
        return [
          { id: 1, username: 'admin', role: 'Administrator', email: 'admin@sec.local' }
        ];
      }
      return [];
    }
  };

  // Password Strength Calculation Helper
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 20;
    if (/[a-z]/.test(pass)) score += 15;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;

    const commonWeak = ['password', '123456', 'admin', 'welcome', 'qwerty', 'pass123'];
    const isWeakDictionary = commonWeak.some((w) => pass.toLowerCase().includes(w));
    if (isWeakDictionary) score = Math.min(score, 25);

    let crackTime = 'Instantly';
    if (score > 85) crackTime = 'Over 400 Years';
    else if (score > 65) crackTime = '3 Months';
    else if (score > 40) crackTime = '2 Hours';
    else if (score > 20) crackTime = '12 Seconds';

    return { score, crackTime, isWeakDictionary };
  };

  const passStats = calculatePasswordStrength(passwordInput);

  return (
    <section id="demolab" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Interactive Security Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Safe educational sandbox to test vulnerabilities and visualize sanitization mechanisms
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 07
          </span>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveLabTab('sqli')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
              activeLabTab === 'sqli'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/30'
                : 'bg-slate-900 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
            }`}
            id="lab-tab-sqli"
          >
            <Database className="w-4 h-4" />
            <span>1. SQL Injection Sandbox</span>
          </button>

          <button
            onClick={() => setActiveLabTab('xss')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
              activeLabTab === 'xss'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/30'
                : 'bg-slate-900 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
            }`}
            id="lab-tab-xss"
          >
            <Code2 className="w-4 h-4" />
            <span>2. XSS Output Sanitization</span>
          </button>

          <button
            onClick={() => setActiveLabTab('password')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
              activeLabTab === 'password'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/30'
                : 'bg-slate-900 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
            }`}
            id="lab-tab-password"
          >
            <Lock className="w-4 h-4" />
            <span>3. Password Entropy Tester</span>
          </button>
        </div>

        {/* LAB CONTAINER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl">
          
          {/* TAB 1: SQL INJECTION SIMULATOR */}
          {activeLabTab === 'sqli' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    SQL Injection Query Simulator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Toggle between raw vulnerable concatenation vs secure prepared statements
                  </p>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-white/5 shrink-0">
                  <button
                    onClick={() => setIsSqliSecureMode(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      !isSqliSecureMode
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Vulnerable Mode
                  </button>
                  <button
                    onClick={() => setIsSqliSecureMode(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSqliSecureMode
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Secure Prepared Mode
                  </button>
                </div>
              </div>

              {/* Input & Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold font-mono text-slate-300">
                  Simulated Search Input (`username` parameter):
                </label>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={sqliInput}
                    onChange={(e) => setSqliInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-sm font-mono focus:border-blue-500 focus:outline-none"
                    placeholder="Enter username parameter..."
                  />
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSqliInput("admin' --")}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 hover:border-blue-500/30 text-xs text-blue-400 font-mono"
                    >
                      Preset: `admin' --`
                    </button>
                    <button
                      onClick={() => setSqliInput("' OR '1'='1")}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 hover:border-blue-500/30 text-xs text-blue-400 font-mono"
                    >
                      Preset: `' OR '1'='1`
                    </button>
                    <button
                      onClick={() => setSqliInput('john_doe')}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 hover:border-blue-500/30 text-xs text-slate-300 font-mono"
                    >
                      Normal: `john_doe`
                    </button>
                  </div>
                </div>
              </div>

              {/* Generated SQL Query Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 font-mono text-xs space-y-2">
                <div className="text-slate-400 flex items-center justify-between">
                  <span>EXECUTED BACKEND SQL QUERY:</span>
                  <span className={isSqliSecureMode ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {isSqliSecureMode ? '✓ Parameterized (Safe)' : 'UNSECURE STRING CONCATENATION'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-200">
                  {!isSqliSecureMode ? (
                    <p className="text-red-300">
                      SELECT * FROM users WHERE username = '<span className="text-amber-400 font-bold">{sqliInput}</span>';
                    </p>
                  ) : (
                    <p className="text-emerald-300">
                      SELECT * FROM users WHERE username = <span className="text-blue-400 font-bold">?</span>; <span className="text-slate-500">// Params: ["{sqliInput}"]</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Query Result View */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono text-slate-300">
                  Database Query Output: ({getSqliResult().length} Records Returned)
                </h4>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 overflow-x-auto">
                  {getSqliResult().length > 0 ? (
                    <table className="w-full text-left text-xs font-mono text-slate-300">
                      <thead>
                        <tr className="border-b border-white/5 text-blue-400">
                          <th className="py-2 px-3">ID</th>
                          <th className="py-2 px-3">Username</th>
                          <th className="py-2 px-3">Role</th>
                          <th className="py-2 px-3">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSqliResult().map((u) => (
                          <tr key={u.id} className="border-b border-white/5 hover:bg-slate-900">
                            <td className="py-2 px-3 text-slate-400">{u.id}</td>
                            <td className="py-2 px-3 font-bold text-white">{u.username}</td>
                            <td className="py-2 px-3 text-blue-300">{u.role}</td>
                            <td className="py-2 px-3 text-slate-400">{u.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-xs text-slate-400 font-mono py-2">
                      No matching records found. (SQL Injection prevented or invalid username)
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: XSS SANITIZATION SANDBOX */}
          {activeLabTab === 'xss' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-400" />
                    XSS Output Sanitization Sandbox
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    See how raw HTML string rendering allows script execution versus HTML entity escaping
                  </p>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-white/5 shrink-0">
                  <button
                    onClick={() => setIsXssSanitized(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      !isXssSanitized
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Raw Unescaped
                  </button>
                  <button
                    onClick={() => setIsXssSanitized(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isXssSanitized
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sanitized Escaped
                  </button>
                </div>
              </div>

              {/* Input & Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold font-mono text-slate-300">
                  Input String / Payload:
                </label>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={xssInput}
                    onChange={(e) => setXssInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-sm font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setXssInput("<script>alert('XSS Cookie Stolen!')</script>")}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 text-xs text-blue-400 font-mono"
                    >
                      Script Tag
                    </button>
                    <button
                      onClick={() => setXssInput("<img src=x onerror=alert('Image-XSS')>")}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 text-xs text-blue-400 font-mono"
                    >
                      Img Onerror
                    </button>
                  </div>
                </div>
              </div>

              {/* Render Comparison View */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* DOM HTML View */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DOM RENDERED OUTPUT</span>
                    <span className={isXssSanitized ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {isXssSanitized ? '✓ Safe Text' : 'Executed HTML'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 min-h-[90px] text-sm font-mono text-slate-200 break-all">
                    {isXssSanitized ? (
                      xssInput
                    ) : (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          Simulated XSS Script Execution Triggered!
                        </p>
                        <p className="text-[11px] text-red-300">
                          In an un-sanitized browser environment, this payload would execute JavaScript code and access session tokens.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* HTML Source View */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-slate-400">
                    PROCESSED HTML SOURCE CODE
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 min-h-[90px] text-xs font-mono text-slate-300 break-all">
                    {isXssSanitized ? (
                      <p className="text-emerald-300">
                        {xssInput.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}
                      </p>
                    ) : (
                      <p className="text-red-300">{xssInput}</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: PASSWORD STRENGTH & ENTROPY TESTER */}
          {activeLabTab === 'password' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  Password Entropy & Strength Analyzer
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Analyze password complexity, character diversity, and estimated brute-force crack time
                </p>
              </div>

              {/* Input with Show/Hide Toggle */}
              <div className="space-y-2 max-w-md">
                <label className="text-xs font-bold font-mono text-slate-300">
                  Test Password String:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-sm font-mono pr-10 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Progress Bar & Crack Time Estimate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">PASSWORD SCORE:</span>
                    <span className="text-blue-400 font-bold">{passStats.score} / 100</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passStats.score > 75
                          ? 'bg-emerald-400'
                          : passStats.score > 40
                          ? 'bg-amber-400'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${passStats.score}%` }}
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-xs font-mono space-y-1">
                    <span className="text-slate-400">Estimated Brute-Force Crack Time:</span>
                    <p className={`text-base font-bold ${
                      passStats.score > 75 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {passStats.crackTime}
                    </p>
                  </div>
                </div>

                {/* Character Diversity Checklist */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono text-blue-400 font-bold">COMPLEXITY CRITERIA:</span>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-white/5">
                      {passwordInput.length >= 12 ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>12+ Chars</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-white/5">
                      {/[A-Z]/.test(passwordInput) ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>Uppercase (A-Z)</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-white/5">
                      {/[0-9]/.test(passwordInput) ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>Numbers (0-9)</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-white/5">
                      {/[^A-Za-z0-9]/.test(passwordInput) ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>Symbols (!@#)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
