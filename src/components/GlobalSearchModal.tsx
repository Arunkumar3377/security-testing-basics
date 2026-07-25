import React, { useState, useEffect } from 'react';
import { SEARCH_INDEX } from '../data/securityData';
import { SearchItem } from '../types';
import { Search, X, ArrowRight, Shield, Bug, Wrench, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: SearchItem[] = query.trim()
    ? SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_INDEX.slice(0, 6);

  const handleSelect = (sectionId: string) => {
    onClose();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-cyan-800/80 rounded-2xl shadow-2xl overflow-hidden space-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search security concepts, attacks, tools, quiz topics... (ESC to close)"
            className="w-full bg-transparent text-slate-200 text-sm focus:outline-none placeholder:text-slate-500 font-mono"
            id="global-search-input"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.sectionId)}
                className="p-3 rounded-xl hover:bg-slate-950 border border-transparent hover:border-slate-800 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 font-mono">
              No matching security topics found for "{query}".
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
          <span>Navigate with click or Enter</span>
          <span>Security Testing Basics</span>
        </div>
      </div>
    </div>
  );
};
