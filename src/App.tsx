import React, { useState, useEffect, lazy, Suspense } from 'react';
import { QualityTier } from './components/cyberpunk/CyberCityScene';

// Genuinely lazy-loaded 3D Megacity WebGL Scene (Three.js isolated from critical DOM path)
const CyberCityScene = lazy(() => 
  import('./components/cyberpunk/CyberCityScene').then(m => ({ default: m.CyberCityScene }))
);
import { CyberTopHUD } from './components/cyberpunk/CyberTopHUD';
import { CyberHeroOverlay } from './components/cyberpunk/CyberHeroOverlay';
import { OperatorDossier } from './components/cyberpunk/OperatorDossier';
import { ProjectsFixerBoard } from './components/cyberpunk/ProjectsFixerBoard';
import { MissionContractModal } from './components/cyberpunk/MissionContractModal';
import { CyberdeckSkills } from './components/cyberpunk/CyberdeckSkills';
import { NeuralResearchLab } from './components/cyberpunk/NeuralResearchLab';
import { ChronicleTimeline } from './components/cyberpunk/ChronicleTimeline';
import { ReputationArchive } from './components/cyberpunk/ReputationArchive';
import { NetConnectFooter } from './components/cyberpunk/NetConnectFooter';
import { CyberRecruiterModal } from './components/cyberpunk/CyberRecruiterModal';
import { CommandPalette } from './components/cyberpunk/CommandPalette';
import { MISSION_CONTRACTS, MissionContract } from './data/cyberpunkData';

export const App: React.FC = () => {
  // Navigation & Modal State
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedContract, setSelectedContract] = useState<MissionContract | null>(null);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // 3D Quality Tier (persisted)
  const [qualityTier, setQualityTier] = useState<QualityTier>(() => {
    const saved = localStorage.getItem('cyber_quality_tier');
    return (saved as QualityTier) || 'balanced';
  });

  const handleQualityChange = (tier: QualityTier) => {
    setQualityTier(tier);
    localStorage.setItem('cyber_quality_tier', tier);
  };

  // Reduced Motion Preference
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'reduced-motion') return true;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const viewMode = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('view') : null;
  const isInspectionMode = Boolean(viewMode && viewMode !== 'reduced-motion');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll Progress Tracking for 3D Camera & Section Spy
  const [scrollYProgress, setScrollYProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollYProgress(progress);

      // Section Spy
      const sections = ['contact', 'journey', 'research', 'tech', 'projects', 'about', 'home'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keybindings (Ctrl/Cmd + K) & Initial Hash Anchor Navigation
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'auto' });
        }, 150);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth Section Navigation
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07090D] text-slate-100 selection:bg-[#FCEE0A] selection:text-[#07090D]">
      
      {/* 1. Real-time 3D Night City Megacity Scene (Three.js WebGL, Genuinely Lazy Loaded) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-[#07090D]" />}>
          <CyberCityScene 
            scrollYProgress={scrollYProgress}
            qualityTier={qualityTier}
            reducedMotion={reducedMotion}
          />
        </Suspense>
        {/* Subtle Vignette & Scanline Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(7,9,13,0.85) 100%)'
          }}
        />
      </div>

      {isInspectionMode && (
        <div className="fixed top-4 left-4 z-50 px-3 py-1 bg-[#10151C]/90 border border-[#00E5FF]/60 rounded-xs text-xs font-mono text-[#00E5FF] tracking-widest backdrop-blur-md">
          <span>[3D_INSPECTION_MODE: {viewMode?.toUpperCase()}]</span>
        </div>
      )}

      {/* 2. Top Tactical Netrunner Navigation HUD */}
      {!isInspectionMode && (
        <CyberTopHUD
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
          qualityTier={qualityTier}
          onChangeQualityTier={handleQualityChange}
        />
      )}

      {/* 3. Hero Layer & Chapter 01 (Direct match to user mockup) */}
      {!isInspectionMode && (
        <div id="home">
          <CyberHeroOverlay 
            onEnterPortfolio={() => scrollToSection('projects')}
            onOpenRecruiter={() => setIsRecruiterOpen(true)}
          />
        </div>
      )}

      {/* 4. Content Chapters: Dossier, Fixer Board, Cyberdeck, Neural Lab, Chronicle, Reputation, Net Connect */}
      {!isInspectionMode && (
        <main className="relative z-10 space-y-12">
          
          {/* Chapter 02: Operator Dossier / System Profile */}
          <OperatorDossier onOpenRecruiter={() => setIsRecruiterOpen(true)} />

          {/* Chapter 03: Systems Overview / Projects Fixer Board */}
          <ProjectsFixerBoard 
            onOpenContract={(contract) => setSelectedContract(contract)}
          />

          {/* Chapter 03: Cyberdeck Technical Capability Matrix */}
          <CyberdeckSkills />

          {/* Chapter 04: Neural Research Lab Logs */}
          <NeuralResearchLab />

          {/* Chapter 05: Chronicle Journey Timeline */}
          <ChronicleTimeline />

          {/* Chapter 06: Reputation Archive (Verified Awards & Accolades) */}
          <ReputationArchive />

          {/* Chapter 07: Net Connect Terminal Footer */}
          <NetConnectFooter />

        </main>
      )}

      {/* 5. Mission Contract 13-Point Architectural Case Study Modal */}
      <MissionContractModal
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
      />

      {/* 6. Recruiter Quick-View Executive Modal */}
      <CyberRecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
        onSelectProject={(id) => {
          setIsRecruiterOpen(false);
          const c = MISSION_CONTRACTS.find(m => m.id === id);
          if (c) setSelectedContract(c);
        }}
      />

      {/* 7. Tactical Command Palette (Ctrl/Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        onSelectProject={(id) => {
          const c = MISSION_CONTRACTS.find(m => m.id === id);
          if (c) setSelectedContract(c);
        }}
        onOpenRecruiter={() => setIsRecruiterOpen(true)}
      />

      {/* Keyboard Shortcut Floating Hint */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#10151C]/80 border border-[#1A222D] rounded-xs text-[10px] font-mono text-slate-400 backdrop-blur-xs select-none">
        <span>PRESS</span>
        <kbd className="px-1.5 py-0.5 bg-[#1A222D] text-[#00E5FF] rounded-xs font-bold border border-slate-700">CTRL+K</kbd>
        <span>FOR CLI</span>
      </div>

    </div>
  );
};
export default App;
