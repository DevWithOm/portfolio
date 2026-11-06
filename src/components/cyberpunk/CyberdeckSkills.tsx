import React, { useState } from 'react';
import { Cpu, Terminal, Layers, Database, Shield, Zap, Wrench, Search, Code, Layout, Palette, Server, Network, Sparkles, TrendingUp, Map, HardDrive, Activity, GitBranch, BarChart } from 'lucide-react';
import { CYBERDECK_SKILLS, CyberdeckSkill } from '../../data/cyberpunkData';

export const CyberdeckSkills: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const domains = [
    'ALL',
    'AI/ML & Agents',
    'Programming Languages',
    'Frontend Engineering',
    'Backend Systems',
    'Databases & Spatial',
    'Tools & Infra'
  ];

  const filteredSkills = selectedDomain === 'ALL'
    ? CYBERDECK_SKILLS
    : CYBERDECK_SKILLS.filter(s => s.domain === selectedDomain);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Map': return <Map className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5" />;
      case 'BarChart': return <BarChart className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section id="tech" className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] tracking-widest mb-1">
          <span>// TECHNICAL_SPECIFICATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span>CYBERDECK</span>
          <span className="text-[#FCEE0A] text-2xl font-mono">// SKILL_MATRIX</span>
        </h2>
        <div className="w-16 h-1 bg-[#00E5FF] mt-2 mb-3" />
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
          Modular cyberware & software systems engineering toolkit — verified with honest proficiency metrics.
        </p>
      </div>

      {/* Domain Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {domains.map((dom) => {
          const isSelected = selectedDomain === dom;
          return (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all border ${
                isSelected
                  ? 'bg-[#00E5FF] text-[#07090D] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'bg-[#10151C] text-slate-400 border-[#202832] hover:text-white hover:border-slate-500'
              }`}
            >
              {dom}
            </button>
          );
        })}
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-[#0D1117]/90 hover:bg-[#10151C] border border-[#1A222D] hover:border-[#00E5FF] p-4 sm:p-5 rounded-xs transition-all duration-200 flex flex-col justify-between shadow-lg group"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
            }}
          >
            <div>
              {/* Top Code & Level Tier */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-black text-slate-400">
                  {skill.code}
                </span>
                <span
                  className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-xs border"
                  style={{
                    color: skill.accentColor,
                    borderColor: `${skill.accentColor}55`,
                    backgroundColor: `${skill.accentColor}11`
                  }}
                >
                  {skill.levelTier}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-9 h-9 rounded-xs bg-[#10151C] border border-slate-700 flex items-center justify-center transition-colors group-hover:border-[#FCEE0A]"
                  style={{ color: skill.accentColor }}
                >
                  {getSkillIcon(skill.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase group-hover:text-[#FCEE0A] transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">
                    {skill.domain}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                {skill.description}
              </p>
            </div>

            {/* Bottom Proficiency & Evidence */}
            <div className="pt-3 border-t border-[#1A222D] flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-300">
                PROVEN IN: <span className="text-white font-black">{skill.evidenceProject}</span>
              </span>
              <span 
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-[#1A222D] text-[#00E5FF] border border-slate-700"
              >
                {skill.proficiency}
              </span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

