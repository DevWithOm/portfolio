import React, { useState } from 'react';
import { ExternalLink, FileText, Scale, Waves, Box, Compass, Radar, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { MISSION_CONTRACTS, MissionContract } from '../../data/cyberpunkData';

interface ProjectsFixerBoardProps {
  onOpenContract: (contract: MissionContract) => void;
}

export const ProjectsFixerBoard: React.FC<ProjectsFixerBoardProps> = ({ onOpenContract }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'AI/ML & Ethics',
    'Multi-Agent Ocean AI',
    'Autonomous Agents',
    'Travel Tech',
    'Defense & Geospatial'
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? MISSION_CONTRACTS
    : MISSION_CONTRACTS.filter(p => p.category === selectedCategory);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'fairlens':
        return <Scale className="w-8 h-8 text-[#FCEE0A]" />;
      case 'nautilus':
        return <Waves className="w-8 h-8 text-[#00E5FF]" />;
      case 'agentica':
        return <Box className="w-8 h-8 text-[#FF2E88]" />;
      case 'travelsphere':
        return <Compass className="w-8 h-8 text-[#10B981]" />;
      case 'oceanembed':
        return <Radar className="w-8 h-8 text-[#00E5FF]" />;
      case 'netra':
        return <ShieldAlert className="w-8 h-8 text-[#F59E0B]" />;
      default:
        return <Box className="w-8 h-8 text-[#00E5FF]" />;
    }
  };

  return (
    <section id="projects" className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      
      {/* Section Header (matches user mockup) */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FCEE0A] tracking-widest mb-1">
          <span>// SYSTEMS_OVERVIEW</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span>PROJECTS</span>
          <span className="text-[#00E5FF] text-2xl font-mono">// FIXER_BOARD</span>
        </h2>
        <div className="w-16 h-1 bg-[#FCEE0A] mt-2 mb-3" />
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
          Real-world, production-grade systems — from AI fairness to multi-agent intelligence.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all border ${
                isSelected
                  ? 'bg-[#FCEE0A] text-[#07090D] border-[#FCEE0A] shadow-[0_0_15px_rgba(252,238,10,0.4)]'
                  : 'bg-[#10151C] text-slate-400 border-[#202832] hover:text-white hover:border-slate-500'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid (matches user mockup chamfered cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="group relative bg-[#0D1117]/90 hover:bg-[#10151C] border border-[#1A222D] hover:border-[#00E5FF] p-5 sm:p-6 rounded-xs transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(0,229,255,0.25)]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}
            >
              <div>
                
                {/* Top Badge & Clearance */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-xs bg-[#1A222D] text-slate-300 border border-slate-700">
                    {proj.category}
                  </span>
                  <span 
                    className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xs tracking-wider"
                    style={{ 
                      backgroundColor: `${proj.accentColor}22`,
                      color: proj.accentColor,
                      border: `1px solid ${proj.accentColor}66`
                    }}
                  >
                    {proj.badge.includes('•') ? proj.badge.split('•')[0].trim() : proj.badge}
                  </span>
                </div>

                {/* Holographic Icon & Title */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-14 h-14 rounded-xs bg-[#10151C] border border-[#202832] group-hover:border-[#00E5FF] flex items-center justify-center p-2.5 shadow-inner transition-colors">
                    {getProjectIcon(proj.id)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-wide uppercase group-hover:text-[#FCEE0A] transition-colors">
                      {proj.name}_
                    </h3>
                    <p className="text-[11px] font-mono text-[#00E5FF] font-bold">
                      {proj.codename}
                    </p>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                  {proj.shortDesc}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#161D26] text-slate-300 border border-slate-800 rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1A222D] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#10151C] hover:bg-[#FCEE0A] text-slate-300 hover:text-[#07090D] border border-slate-700 hover:border-[#FCEE0A] rounded-xs transition-colors"
                      title="Launch Live Deployment"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#10151C] hover:bg-[#00E5FF] text-slate-300 hover:text-[#07090D] border border-slate-700 hover:border-[#00E5FF] rounded-xs transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onOpenContract(proj)}
                  className="px-3.5 py-1.5 bg-[#10151C] hover:bg-[#00E5FF] text-white hover:text-[#07090D] border border-[#00E5FF]/60 hover:border-[#00E5FF] text-xs font-mono font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>CASE_STUDY</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
