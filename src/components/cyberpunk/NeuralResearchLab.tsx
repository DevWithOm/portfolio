import React from 'react';
import { Microchip, ExternalLink, Sparkles, CheckCircle2, Clock, Terminal } from 'lucide-react';
import { NEURAL_RESEARCH_QUESTS } from '../../data/cyberpunkData';

export const NeuralResearchLab: React.FC = () => {
  return (
    <section id="research" className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF2E88] tracking-widest mb-1">
          <span>// SYNAPTIC_EXPERIMENTATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span>NEURAL RESEARCH</span>
          <span className="text-[#00E5FF] text-2xl font-mono">// LAB_LOGS</span>
        </h2>
        <div className="w-16 h-1 bg-[#FF2E88] mt-2 mb-3" />
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
          Active technical investigations across autonomous multi-agent graphs, explainable AI, and algorithmic systems.
        </p>
      </div>

      {/* Grid of Quests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {NEURAL_RESEARCH_QUESTS.map((quest) => {
          const isVerified = quest.type === 'VERIFIED MILESTONE';
          return (
            <div
              key={quest.id}
              className="bg-[#0D1117]/90 border border-[#1A222D] hover:border-[#FF2E88] p-5 sm:p-6 rounded-xs shadow-xl transition-all flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'
              }}
            >
              <div>
                {/* Status Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span 
                    className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-xs border ${
                      isVerified
                        ? 'bg-[#FCEE0A]/10 text-[#FCEE0A] border-[#FCEE0A]/40'
                        : 'bg-[#FF2E88]/10 text-[#FF2E88] border-[#FF2E88]/40'
                    }`}
                  >
                    {quest.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300">
                    {isVerified ? (
                      <CheckCircle2 className="w-4 h-4 text-[#FCEE0A]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#00E5FF]" />
                    )}
                    <span>{quest.status}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide mb-2">
                  {quest.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-4">
                  {quest.description}
                </p>
              </div>

              {/* Verification Badge & Evidence Link */}
              <div className="pt-3 border-t border-[#1A222D] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>VALIDATION_STATUS:</span>
                  <span className="font-bold text-[#00E5FF]">{quest.verificationBadge}</span>
                </div>
                {quest.evidenceText && (
                  <p className="text-[11px] font-mono text-slate-400 leading-tight">
                    {quest.evidenceText}
                  </p>
                )}

                {quest.evidenceUrl && (
                  <div className="pt-1 flex justify-end">
                    <a
                      href={quest.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#00E5FF] hover:text-white flex items-center gap-1 font-bold transition-colors"
                    >
                      <span>VIEW_EVIDENCE</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

