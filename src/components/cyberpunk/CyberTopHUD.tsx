import React, { useState } from 'react';
import { Terminal, ExternalLink, Menu, X, Sliders, Shield, FileText, Volume2, VolumeX } from 'lucide-react';
import { OPERATOR_PROFILE } from '../../data/cyberpunkData';
import { QualityTier } from './CyberCityScene';
import { cyberAudio } from '../../utils/cyberAudio';

interface CyberTopHUDProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRecruiter: () => void;
  qualityTier: QualityTier;
  onChangeQualityTier: (tier: QualityTier) => void;
}

export const CyberTopHUD: React.FC<CyberTopHUDProps> = ({
  activeSection,
  onNavigate,
  onOpenRecruiter,
  qualityTier,
  onChangeQualityTier
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTierMenu, setShowTierMenu] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const toggleSoundtrack = () => {
    const active = cyberAudio.toggle();
    setIsAudioActive(active);
  };

  const navItems = [
    { id: 'home', label: '[01] HOME' },
    { id: 'projects', label: '[02] PROJECTS' },
    { id: 'tech', label: '[03] TECH' },
    { id: 'research', label: '[04] RESEARCH' },
    { id: 'journey', label: '[05] JOURNEY' },
    { id: 'contact', label: '[06] CONTACT' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 bg-[#07090D]/85 backdrop-blur-md border-b border-[#1A222D] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-sm bg-[#FCEE0A] text-[#07090D] flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(252,238,10,0.4)]">
            <span>OV</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-sm sm:text-base tracking-wider group-hover:text-[#FCEE0A] transition-colors">
                OM VYAS_
              </span>
              <span className="inline-block w-1.5 h-3 bg-[#FCEE0A] animate-pulse" />
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden md:block">
              AI ENGINEER // BUILDER // RESEARCHER
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider transition-all rounded-xs border ${
                  isActive
                    ? 'bg-[#10151C] text-[#FCEE0A] border-[#FCEE0A]/60 shadow-[0_0_10px_rgba(252,238,10,0.2)]'
                    : 'text-slate-400 border-transparent hover:text-white hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Audio Synth + Quality Controller + Recruiter Quick-Access Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Procedural Ambient Dark Synth Audio Toggle */}
          <button
            onClick={toggleSoundtrack}
            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-xs flex items-center gap-1.5 transition-all border ${
              isAudioActive
                ? 'bg-[#10151C] text-[#00E5FF] border-[#00E5FF]/60 shadow-[0_0_10px_rgba(0,229,255,0.3)] animate-pulse'
                : 'bg-[#10151C] text-slate-400 hover:text-white border-[#202832]'
            }`}
            title={isAudioActive ? 'Mute Procedural Dark City Drone' : 'Enable Procedural Dark City Drone'}
            aria-label="Toggle Cyberpunk Ambient Audio"
          >
            {isAudioActive ? <Volume2 className="w-3 h-3 text-[#00E5FF]" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
            <span className="hidden sm:inline">{isAudioActive ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Quality Tier Selector Pill */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowTierMenu(!showTierMenu)}
              className="px-2.5 py-1 text-[10px] font-mono font-bold text-slate-400 hover:text-white bg-[#10151C] border border-[#202832] rounded-xs flex items-center gap-1.5 transition-colors"
              title="Change 3D Graphics Fidelity"
            >
              <Sliders className="w-3 h-3 text-[#00E5FF]" />
              <span className="uppercase">{qualityTier}</span>
            </button>

            {showTierMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-[#0D1117] border border-[#202832] shadow-2xl py-1 z-50 rounded-xs">
                {(['cinematic', 'balanced', 'performance'] as QualityTier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onChangeQualityTier(t);
                      setShowTierMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[11px] font-mono font-bold uppercase ${
                      qualityTier === t ? 'text-[#FCEE0A] bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Yellow Recruiter Mode Fast-Track Button (matches user mockup) */}
          <button
            onClick={onOpenRecruiter}
            className="px-3 sm:px-4 py-1.5 bg-[#FCEE0A] hover:bg-white text-[#07090D] font-mono font-black text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(252,238,10,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] active:scale-95 transition-all"
          >
            <span>RECRUITER_MODE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white lg:hidden bg-[#10151C] border border-[#202832] rounded-xs"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#1A222D] flex flex-col gap-2 pb-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-mono font-bold text-slate-300 hover:text-[#FCEE0A] hover:bg-white/5 rounded-xs"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#1A222D] flex items-center justify-between px-3">
            <span className="text-[10px] font-mono text-slate-400">3D QUALITY:</span>
            <div className="flex gap-1">
              {(['cinematic', 'balanced', 'performance'] as QualityTier[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onChangeQualityTier(t)}
                  className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold rounded-xs border ${
                    qualityTier === t ? 'bg-[#FCEE0A] text-black border-[#FCEE0A]' : 'text-slate-400 border-slate-700'
                  }`}
                >
                  {t[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

