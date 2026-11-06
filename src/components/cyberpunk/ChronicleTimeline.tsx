import React from 'react';
import { ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { CHRONICLE_TIMELINE } from '../../data/cyberpunkData';

export const ChronicleTimeline: React.FC = () => {
  return (
    <section id="journey" className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FCEE0A] tracking-widest mb-1">
          <span>// CHRONICLE_DATA_BUS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span>JOURNEY</span>
          <span className="text-[#00E5FF] text-2xl font-mono">// TIMELINE</span>
        </h2>
        <div className="w-16 h-1 bg-[#FCEE0A] mt-2 mb-3" />
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
          Verified academic trajectory, hackathon milestones, and engineering evolution.
        </p>
      </div>

      {/* Vertical Data Bus Timeline */}
      <div className="relative border-l-2 border-[#1A222D] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {CHRONICLE_TIMELINE.map((node) => (
          <div key={node.id} className="relative group">
            
            {/* Illuminated Node Pin */}
            <div 
              className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#07090D] flex items-center justify-center transition-all group-hover:scale-125"
              style={{ borderColor: node.accentColor, boxShadow: `0 0 10px ${node.accentColor}88` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.accentColor }} />
            </div>

            {/* Timeline Card */}
            <div 
              className="bg-[#0D1117]/90 border border-[#1A222D] hover:border-[#00E5FF] p-5 sm:p-6 rounded-xs shadow-xl transition-all"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'
              }}
            >
              {/* Period & Category */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span 
                  className="text-xs font-mono font-black uppercase px-2.5 py-0.5 rounded-xs"
                  style={{
                    color: node.accentColor,
                    backgroundColor: `${node.accentColor}15`,
                    border: `1px solid ${node.accentColor}44`
                  }}
                >
                  {node.category}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FCEE0A]" />
                  <span>{node.period}</span>
                </span>
              </div>

              {/* Title & Subheading */}
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase mb-1">
                {node.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#00E5FF] font-bold mb-3">
                {node.subheading}
              </p>

              {/* Summary & Details */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-4">
                {node.details}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {node.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#161D26] text-slate-300 border border-slate-800 rounded-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Verified Proof Notice */}
              <div className="pt-3 border-t border-[#1A222D] flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>VERIFIED PROOF: {node.verifiedProof}</span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

