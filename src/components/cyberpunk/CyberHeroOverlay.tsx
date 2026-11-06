import React from 'react';
import { ArrowRight, User, Award, Code, Cpu, Zap, MousePointer } from 'lucide-react';
import { OPERATOR_PROFILE } from '../../data/cyberpunkData';

interface CyberHeroOverlayProps {
  onEnterPortfolio: () => void;
  onOpenRecruiter: () => void;
}

export const CyberHeroOverlay: React.FC<CyberHeroOverlayProps> = ({
  onEnterPortfolio,
  onOpenRecruiter
}) => {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      
      {/* Top Hero Headline Block */}
      <div className="pt-8 sm:pt-14 max-w-3xl pointer-events-auto">
        
        {/* System OS Monospace Tag */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#10151C]/90 border border-[#00E5FF]/40 rounded-xs mb-3 text-[11px] sm:text-xs font-mono text-[#00E5FF] tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <span>[\\ NIGHT CITY // PORTFOLIO_OS v2.0 ]</span>
        </div>

        {/* Huge Cyber Name Headline (matches user mockup) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FCEE0A] tracking-tighter leading-none uppercase drop-shadow-[0_0_25px_rgba(252,238,10,0.5)] flex items-center">
          <span>OM VYAS</span>
          <span className="text-white animate-pulse">_</span>
        </h1>

        {/* Academic Degree & College */}
        <p className="text-base sm:text-xl font-mono text-slate-200 mt-2 font-bold tracking-wide">
          {OPERATOR_PROFILE.education} – <span className="text-[#00E5FF]">MITAOE, Pune</span>
        </p>

        {/* Tagline with Cyber Accent Line */}
        <div className="mt-4 pl-4 border-l-2 border-[#FCEE0A] py-1 bg-gradient-to-r from-[#FCEE0A]/10 to-transparent max-w-2xl">
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed">
            {OPERATOR_PROFILE.tagline}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={onEnterPortfolio}
            className="px-5 sm:px-6 py-3 bg-[#FCEE0A] hover:bg-white text-[#07090D] font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-[0_0_25px_rgba(252,238,10,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] active:scale-95 transition-all"
          >
            <span>&gt; ENTER_PORTFOLIO</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRecruiter}
            className="px-5 sm:px-6 py-3 bg-[#10151C]/90 hover:bg-[#1A222D] text-white border border-slate-600 hover:border-[#00E5FF] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xs flex items-center gap-2 backdrop-blur-md active:scale-95 transition-all"
          >
            <User className="w-4 h-4 text-[#00E5FF]" />
            <span>RECRUITER_QUICKVIEW</span>
          </button>
        </div>

        {/* 4 KPI Metric Cards (matches user mockup & single source of truth) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mt-8 max-w-2xl">
          
          <div className="bg-[#0D1117]/85 border border-[#1A222D] hover:border-[#FCEE0A]/50 p-2.5 sm:p-3 rounded-xs backdrop-blur-md transition-all group">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FCEE0A]" />
              <span className="text-lg sm:text-xl font-mono font-black text-white group-hover:text-[#FCEE0A]">
                {OPERATOR_PROFILE.kpis[0].value}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase mt-0.5">
              {OPERATOR_PROFILE.kpis[0].label}
            </p>
          </div>

          <div className="bg-[#0D1117]/85 border border-[#1A222D] hover:border-[#00E5FF]/50 p-2.5 sm:p-3 rounded-xs backdrop-blur-md transition-all group">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-lg sm:text-xl font-mono font-black text-white group-hover:text-[#00E5FF]">
                {OPERATOR_PROFILE.kpis[1].value}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase mt-0.5">
              {OPERATOR_PROFILE.kpis[1].label}
            </p>
          </div>

          <div className="bg-[#0D1117]/85 border border-[#1A222D] hover:border-[#FF2E88]/50 p-2.5 sm:p-3 rounded-xs backdrop-blur-md transition-all group">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FF2E88]" />
              <span className="text-lg sm:text-xl font-mono font-black text-white group-hover:text-[#FF2E88]">
                {OPERATOR_PROFILE.kpis[2].value}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase mt-0.5">
              {OPERATOR_PROFILE.kpis[2].label}
            </p>
          </div>

          <div className="bg-[#0D1117]/85 border border-[#1A222D] hover:border-[#FCEE0A]/50 p-2.5 sm:p-3 rounded-xs backdrop-blur-md transition-all group">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FCEE0A]" />
              <span className="text-base sm:text-lg font-mono font-black text-white group-hover:text-[#FCEE0A]">
                {OPERATOR_PROFILE.kpis[3].value}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase mt-0.5">
              {OPERATOR_PROFILE.kpis[3].label}
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex flex-col items-center justify-center pt-8 pointer-events-auto">
        <div 
          onClick={onEnterPortfolio}
          className="flex flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-[#FCEE0A] transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold group-hover:tracking-wider transition-all">
            SCROLL TO DESCEND
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-500 group-hover:border-[#FCEE0A] flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 bg-[#FCEE0A] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

    </div>
  );
};

