import React from 'react';
import { Shield, Terminal, Award, Download, Mail, ExternalLink, Cpu, CheckCircle2, UserCheck, Flame, Sparkles } from 'lucide-react';
import { OPERATOR_PROFILE, REPUTATION_ARCHIVE } from '../../data/cyberpunkData';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';

interface OperatorDossierProps {
  onOpenRecruiter: () => void;
}

export const OperatorDossier: React.FC<OperatorDossierProps> = ({ onOpenRecruiter }) => {
  return (
    <section id="about" className="relative z-10 py-16 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      
      {/* Chapter Index Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FCEE0A] tracking-widest mb-1">
          <span>// CHAPTER_02 // SYSTEM_PROFILE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span>OPERATOR DOSSIER</span>
          <span className="text-[#00E5FF] text-2xl font-mono">[CALLSIGN: {OPERATOR_PROFILE.netrunnerHandle}]</span>
        </h2>
        <div className="w-16 h-1 bg-[#FCEE0A] mt-2 mb-3" />
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
          System intelligence snapshot: academic standing, verified credentials, and software engineering philosophy.
        </p>
      </div>

      {/* Main Dossier Bento Panel */}
      <div 
        className="bg-[#0D1117]/95 border border-[#1A222D] hover:border-[#00E5FF]/60 p-6 sm:p-8 rounded-xs shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Biometric Specimen / Avatar Box (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xs bg-[#10151C] border-2 border-[#FCEE0A]/80 p-2 shadow-[0_0_30px_rgba(252,238,10,0.25)] flex items-center justify-center overflow-hidden group">
              
              {/* Corner targeting brackets */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#00E5FF]" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#00E5FF]" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#00E5FF]" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#00E5FF]" />

              {/* Character Avatar */}
              <img 
                src={OPERATOR_PROFILE.avatarImage} 
                alt="Om Vyas" 
                className="w-full h-full object-cover rounded-xs filter contrast-110 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status Badge */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#07090D]/90 border border-[#FCEE0A] py-1 px-2 flex items-center justify-between text-[10px] font-mono text-[#FCEE0A] font-bold">
                <span>STATUS: ACTIVE</span>
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
              </div>
            </div>

            <div className="mt-4 w-full">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">{OPERATOR_PROFILE.name}</h3>
              <p className="text-xs font-mono text-[#00E5FF] font-bold mt-0.5">{OPERATOR_PROFILE.handle}</p>
              
              <div className="mt-3 pt-3 border-t border-[#1A222D] flex flex-wrap gap-2 justify-center sm:justify-start">
                <a
                  href={OPERATOR_PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#10151C] hover:bg-[#FCEE0A] text-slate-300 hover:text-black rounded-xs border border-slate-700 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={OPERATOR_PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#10151C] hover:bg-[#00E5FF] text-slate-300 hover:text-black rounded-xs border border-slate-700 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={OPERATOR_PROFILE.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#1A222D] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase rounded-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>RESUME</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Metadata, Engineering Philosophy & Objectives (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* System Profile Spec Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#10151C] p-4 rounded-xs border border-[#1A222D] font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">CURRENT_ACADEMIC_STANDING:</span>
                <span className="text-white font-bold">{OPERATOR_PROFILE.education}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">AFFILIATION_INSTITUTION:</span>
                <span className="text-[#FCEE0A] font-bold">{OPERATOR_PROFILE.institution}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">CORE_SPECIALIZATION:</span>
                <span className="text-[#00E5FF] font-bold">AI/ML Systems & Multi-Agent Graphs</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">OPERATING_SYSTEM:</span>
                <span className="text-slate-300 font-bold">{OPERATOR_PROFILE.osVersion}</span>
              </div>
            </div>

            {/* Engineering Mission Statement */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#FCEE0A] font-mono text-xs font-bold uppercase">
                <Terminal className="w-4 h-4" />
                <span>DIRECTIVE & TECHNICAL CORE PHILOSOPHY</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Focused on developing high-throughput, dependable AI systems at the intersection of machine learning ethics, spatial intelligence, and autonomous multi-agent orchestration. Committed to architectural transparency: avoiding decorative tech claims and building software systems validated by automated benchmarks and production-ready pipelines.
              </p>
            </div>

            {/* Verified Career Directives */}
            <div>
              <div className="flex items-center gap-2 text-[#00E5FF] font-mono text-xs font-bold uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>PRIMARY PROFESSIONAL DIRECTIVES (OPEN FOR 2026/2027)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-[#07090D] border border-slate-800 rounded-xs flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-[#FCEE0A] rounded-full" />
                  <span>Technical Internships (AI/ML & Full-Stack)</span>
                </div>
                <div className="p-2.5 bg-[#07090D] border border-slate-800 rounded-xs flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full" />
                  <span>Autonomous Multi-Agent Systems (LangGraph)</span>
                </div>
                <div className="p-2.5 bg-[#07090D] border border-slate-800 rounded-xs flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-[#FF2E88] rounded-full" />
                  <span>Explainable AI & Fair ML Auditing (SHAP)</span>
                </div>
                <div className="p-2.5 bg-[#07090D] border border-slate-800 rounded-xs flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Building Dependable Real-World Products</span>
                </div>
              </div>
            </div>

            {/* Fast-Track Hiring Trigger */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-mono text-slate-400">
                EVALUATION READY: Zero game barriers for hiring managers.
              </span>
              <button
                onClick={onOpenRecruiter}
                className="px-4 py-2 bg-[#FCEE0A] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(252,238,10,0.3)] transition-all"
              >
                <span>OPEN_RECRUITER_DOSSIER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

