import React, { useEffect } from 'react';
import { X, ExternalLink, Terminal, Cpu, Users, Target, Wrench, Sparkles, Lightbulb, HelpCircle, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { MissionContract } from '../../data/cyberpunkData';

interface MissionContractModalProps {
  contract: MissionContract | null;
  onClose: () => void;
}

export const MissionContractModal: React.FC<MissionContractModalProps> = ({
  contract,
  onClose
}) => {
  useEffect(() => {
    if (!contract) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contract, onClose]);

  if (!contract) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden animate-fade-in select-none">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0D1117] border border-[#1A222D] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-slate-100"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        
        {/* Top Dossier Header */}
        <div className="p-4 sm:p-6 border-b border-[#1A222D] bg-[#10151C] flex items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#FCEE0A] text-black rounded-xs">
                {contract.securityClearance}
              </span>
              <span className="text-[10px] font-mono text-[#00E5FF] font-bold">
                [{contract.codename}]
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {contract.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <span>{contract.name}_</span>
              <span className="text-sm font-mono text-slate-400 font-normal hidden sm:inline">
                // ARCHITECTURAL DOSSIER
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {contract.liveUrl && (
              <a
                href={contract.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#FCEE0A] hover:bg-white text-black font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1.5 transition-colors"
              >
                <span>LIVE_BUILD</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-[#1A222D] hover:bg-rose-600 text-slate-300 hover:text-white rounded-xs transition-colors"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Case Study Body (13-Point Complete Schema) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          
          {/* 1, 2, 3: Problem, Intended Users, Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-rose-500 font-mono font-black uppercase text-xs mb-1.5">
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <span>1. Problem Statement</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {contract.problemStatement}
              </p>
            </div>

            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-[#00E5FF] font-mono font-black uppercase text-xs mb-1.5">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>2. Intended Users</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {contract.intendedUsers}
              </p>
            </div>

            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-[#FCEE0A] font-mono font-black uppercase text-xs mb-1.5">
                <Target className="w-4 h-4 flex-shrink-0" />
                <span>3. Goals & Constraints</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {contract.goalsAndConstraints}
              </p>
            </div>
          </div>

          {/* 4 & 5: Role & Architecture Data Flow */}
          <div className="bg-[#10151C] p-4 sm:p-5 rounded-xs border border-[#1A222D] space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-[#FF2E88] font-mono font-black uppercase text-xs mb-1">
                <Terminal className="w-4 h-4 flex-shrink-0" />
                <span>4. Om's Role & Contribution</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-medium">
                {contract.roleAndContribution}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[#00E5FF] font-mono font-black uppercase text-xs mb-1">
                <Cpu className="w-4 h-4 flex-shrink-0" />
                <span>5. Architecture & Data Flow</span>
              </div>
              <div className="bg-[#07090D] p-3 rounded-xs border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed break-words">
                {contract.architectureDataFlow}
              </div>
            </div>
          </div>

          {/* 6 & 7: Tech Choices Rationale & Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-slate-200 font-mono font-black uppercase text-xs mb-2">
                <Wrench className="w-4 h-4 flex-shrink-0 text-[#00E5FF]" />
                <span>6. Tech Choices & Rationale</span>
              </div>
              <div className="space-y-2">
                {contract.techChoicesAndRationale.map((tc, idx) => (
                  <div key={idx} className="bg-[#07090D] p-2.5 rounded-xs border border-slate-800 text-xs">
                    <span className="font-bold text-[#FCEE0A] font-mono block">{tc.tech}:</span>
                    <span className="text-slate-300 font-medium">{tc.rationale}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-slate-200 font-mono font-black uppercase text-xs mb-2">
                <Sparkles className="w-4 h-4 flex-shrink-0 text-[#FCEE0A]" />
                <span>7. Main Engineered Features</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                {contract.mainFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00E5FF] font-mono font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8 & 9: Design Decisions & Challenges / Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-slate-200 font-mono font-black uppercase text-xs mb-1.5">
                <Lightbulb className="w-4 h-4 flex-shrink-0 text-[#FCEE0A]" />
                <span>8. Design Decisions</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {contract.designDecisions}
              </p>
            </div>

            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-slate-200 font-mono font-black uppercase text-xs mb-2">
                <HelpCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                <span>9. Challenges & Solutions</span>
              </div>
              <div className="space-y-2">
                {contract.challengesAndSolutions.map((cs, idx) => (
                  <div key={idx} className="bg-[#07090D] p-2.5 rounded-xs border border-rose-950 text-xs">
                    <span className="font-bold text-rose-400 font-mono block">Challenge: {cs.challenge}</span>
                    <span className="text-slate-300 font-medium mt-0.5 block">Solution: {cs.solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 10 & 11: Testing, Validation & Evidence Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-black uppercase text-xs mb-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>10. Testing & Validation</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {contract.testingAndValidation}
              </p>
            </div>

            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-[#FCEE0A] font-mono font-black uppercase text-xs mb-2">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span>11. Evidence-Backed Results</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200 font-medium">
                {contract.evidenceBackedResults.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#FCEE0A] font-bold">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 12 & 13: Repos & Future Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-[#00E5FF] font-mono font-black uppercase text-xs mb-2">
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span>12. Repositories & Access</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {contract.liveUrl && (
                  <a
                    href={contract.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#00E5FF] text-black font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1.5"
                  >
                    <span>Launch Web App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {contract.githubUrl && (
                  <a
                    href={contract.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#1A222D] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase rounded-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>GitHub Repository</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="bg-[#10151C] p-4 rounded-xs border border-[#1A222D]">
              <div className="flex items-center gap-1.5 text-[#FF2E88] font-mono font-black uppercase text-xs mb-1.5">
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
                <span>13. Future Roadmap</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {contract.futureImprovements}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Close Button */}
        <div className="p-3 border-t border-[#1A222D] bg-[#10151C] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1A222D] hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase rounded-xs"
          >
            DISMISS DOSSIER [ESC]
          </button>
        </div>

      </div>
    </div>
  );
};
