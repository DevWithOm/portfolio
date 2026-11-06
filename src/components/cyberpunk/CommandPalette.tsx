import React, { useState, useEffect } from 'react';
import { Search, Terminal, ExternalLink, Code, Award, FileText, ArrowRight, X } from 'lucide-react';
import { MISSION_CONTRACTS, OPERATOR_PROFILE } from '../../data/cyberpunkData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectProject: (projectId: string) => void;
  onOpenRecruiter: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectProject,
  onOpenRecruiter
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { label: '[01] HOME - NIGHT CITY HERO', action: () => onNavigate('home') },
    { label: '[02] PROJECTS - FIXER BOARD', action: () => onNavigate('projects') },
    { label: '[03] TECH - CYBERDECK SKILLS', action: () => onNavigate('tech') },
    { label: '[04] RESEARCH - NEURAL LAB LOGS', action: () => onNavigate('research') },
    { label: '[05] JOURNEY - CHRONICLE TIMELINE', action: () => onNavigate('journey') },
    { label: '[06] CONTACT - NET CONNECT DISPATCHER', action: () => onNavigate('contact') },
    { label: '★ RECRUITER QUICK-VIEW FAST TRACK', action: onOpenRecruiter },
    { label: 'DOWNLOAD OFFICIAL RESUME (PDF)', action: () => window.open(OPERATOR_PROFILE.links.resume, '_blank') },
  ];

  const filteredProjects = MISSION_CONTRACTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div 
        className="relative w-full max-w-xl bg-[#0D1117] border border-[#00E5FF] shadow-[0_0_40px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden text-slate-100 rounded-xs"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'
        }}
      >
        {/* Search Input Box */}
        <div className="p-3 border-b border-[#1A222D] bg-[#10151C] flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#00E5FF] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or project name (e.g., FairLens, LangGraph, Resume)..."
            className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-hidden"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 text-xs font-mono">
          
          {/* Quick Actions */}
          <div className="px-2 py-1 text-[10px] text-slate-500 uppercase tracking-widest">
            NAVIGATION COMMANDS
          </div>
          {quickActions.map((qa, i) => (
            <button
              key={i}
              onClick={() => {
                qa.action();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-xs hover:bg-[#1A222D] hover:text-[#FCEE0A] flex items-center justify-between text-slate-300 transition-colors"
            >
              <span>{qa.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          ))}

          {/* Filtered Projects */}
          <div className="px-2 pt-3 pb-1 text-[10px] text-slate-500 uppercase tracking-widest">
            PROJECT DOSSIERS
          </div>
          {filteredProjects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => {
                onSelectProject(proj.id);
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-xs hover:bg-[#1A222D] hover:text-[#00E5FF] flex items-center justify-between text-slate-300 transition-colors"
            >
              <div>
                <span className="font-bold text-white uppercase">{proj.name}_</span>
                <span className="text-[10px] text-slate-400 ml-2">[{proj.category}]</span>
              </div>
              <span className="text-[10px] text-[#FCEE0A]">{proj.badge.split('•')[0]}</span>
            </button>
          ))}

        </div>

        {/* Footer */}
        <div className="p-2 border-t border-[#1A222D] bg-[#10151C] flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>NAVIGATION: [CLICK / ESC TO CLOSE]</span>
          <span>CYBERDECK_CLI v2.0</span>
        </div>

      </div>
    </div>
  );
};

