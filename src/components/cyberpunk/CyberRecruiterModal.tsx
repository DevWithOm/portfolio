import React, { useEffect } from 'react';
import { X, ExternalLink, Download, Mail, Award, CheckCircle2, Shield, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { OPERATOR_PROFILE, MISSION_CONTRACTS, REPUTATION_ARCHIVE } from '../../data/cyberpunkData';

interface CyberRecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}

export const CyberRecruiterModal: React.FC<CyberRecruiterModalProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-fade-in select-none">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0D1117] border border-[#FCEE0A]/60 shadow-[0_0_60px_rgba(252,238,10,0.2)] flex flex-col overflow-hidden text-slate-100"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#1A222D] bg-[#10151C] flex items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-[#FCEE0A] tracking-widest mb-1">
              <span>// FAST_TRACK // HIRING_EVALUATION_DOSSIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span>RECRUITER QUICK-VIEW</span>
              <span className="text-sm font-mono text-[#00E5FF] font-normal hidden sm:inline">
                [EXECUTIVE SUMMARY]
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={OPERATOR_PROFILE.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 bg-[#FCEE0A] hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(252,238,10,0.4)] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD_RESUME</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 bg-[#1A222D] hover:bg-rose-600 text-slate-300 hover:text-white rounded-xs transition-colors"
              aria-label="Close Recruiter Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Summary Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          
          {/* Candidate Overview Card */}
          <div className="p-4 sm:p-5 bg-[#10151C] border border-[#1A222D] rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-white uppercase">{OPERATOR_PROFILE.name}</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 rounded-xs">
                  AVAILABLE FOR INTERNSHIPS
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300 font-bold mt-1">
                {OPERATOR_PROFILE.education} – <span className="text-[#FCEE0A]">{OPERATOR_PROFILE.institution}</span>
              </p>
              <p className="text-xs text-slate-400 font-medium mt-2 max-w-xl">
                {OPERATOR_PROFILE.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <a
                href={OPERATOR_PROFILE.links.email}
                className="px-3.5 py-2 bg-[#1A222D] hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1.5 border border-slate-700"
              >
                <Mail className="w-3.5 h-3.5 text-[#FCEE0A]" />
                <span>EMAIL DIRECT</span>
              </a>
              <a
                href={OPERATOR_PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#1A222D] hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1.5 border border-slate-700"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>LINKEDIN</span>
              </a>
              <a
                href={OPERATOR_PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#1A222D] hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1.5 border border-slate-700"
              >
                <GithubIcon className="w-3.5 h-3.5 text-white" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Key Competitive Accolades */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#FCEE0A]" />
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-white">
                VERIFIED COMPETITIVE HONORS & ACCOLADES
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {REPUTATION_ARCHIVE.slice(0, 3).map((rep) => (
                <div key={rep.id} className="p-3.5 bg-[#10151C] border border-[#1A222D] rounded-xs">
                  <span className="text-[9px] font-mono font-black uppercase text-[#FCEE0A] block mb-1">
                    {rep.tier}
                  </span>
                  <h5 className="text-xs font-black text-white uppercase">{rep.title}</h5>
                  <p className="text-[11px] text-[#00E5FF] font-mono font-bold mt-0.5">{rep.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Production Systems */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-white">
                FLAGSHIP PRODUCTION SYSTEMS
              </h4>
            </div>

            <div className="space-y-3">
              {MISSION_CONTRACTS.slice(0, 4).map((p) => (
                <div 
                  key={p.id}
                  className="p-4 bg-[#10151C] border border-[#1A222D] hover:border-[#00E5FF] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-black text-white uppercase">{p.name}_</h5>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-[#1A222D] text-[#FCEE0A] rounded-xs border border-slate-800">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-1 max-w-xl">
                      {p.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map(t => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 bg-[#161D26] text-slate-400 rounded-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#00E5FF] text-black font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1"
                      >
                        <span>DEMO</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#1A222D] hover:bg-white text-white hover:text-black font-mono font-bold text-xs rounded-xs transition-colors"
                        title="Source Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Close */}
        <div className="p-3 border-t border-[#1A222D] bg-[#10151C] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1A222D] hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase rounded-xs"
          >
            RETURN TO CITY VIEW [ESC]
          </button>
        </div>

      </div>
    </div>
  );
};
