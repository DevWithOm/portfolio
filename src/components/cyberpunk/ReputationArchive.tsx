import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Trophy, Medal, Star, Filter } from 'lucide-react';
import { REPUTATION_ARCHIVE, ReputationEntry } from '../../data/cyberpunkData';

export const ReputationArchive: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'LEGENDARY': return <Trophy className="w-5 h-5 text-[#FCEE0A]" />;
      case 'HIGH HONOR': return <Medal className="w-5 h-5 text-[#00E5FF]" />;
      case 'LEADERSHIP': return <Star className="w-5 h-5 text-[#FF2E88]" />;
      default: return <Award className="w-5 h-5 text-slate-300" />;
    }
  };

  const filteredEntries = REPUTATION_ARCHIVE.filter(entry => {
    if (filter === 'ALL') return true;
    if (filter === 'AWARDS') return entry.classification.includes('Finalist') || entry.classification.includes('Award');
    if (filter === 'COLLEGIATE') return entry.classification.includes('Collegiate Selection');
    if (filter === 'CLUBS') return entry.classification.includes('Leadership') || entry.classification.includes('Member');
    if (filter === 'CREDENTIALS') return entry.classification.includes('Internship');
    return true;
  });

  return (
    <section className="relative z-10 py-12 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FCEE0A] tracking-widest mb-1">
          <span>// REPUTATION_REGISTRY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span>REPUTATION ARCHIVE</span>
          <span className="text-[#00E5FF] text-2xl font-mono">// HONORS</span>
        </h2>
        <div className="w-16 h-1 bg-[#FCEE0A] mt-2 mb-3" />
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
          Verified competition finalist placements, hackathon awards, and collegiate technical leadership — categorized with transparent evidence.
        </p>
      </div>

      {/* Classification Filter Tabs (Separates Awards, Selections, Memberships & Certifications) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'ALL', label: 'ALL RECORDS (7)' },
          { id: 'AWARDS', label: 'COMPETITION AWARDS (2)' },
          { id: 'COLLEGIATE', label: 'COLLEGIATE SELECTION (1)' },
          { id: 'CLUBS', label: 'LEADERSHIP & CLUBS (3)' },
          { id: 'CREDENTIALS', label: 'VIRTUAL INTERNSHIP & COURSEWORK (1)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all border ${
              filter === tab.id
                ? 'bg-[#FCEE0A] text-[#07090D] border-[#FCEE0A] shadow-[0_0_12px_rgba(252,238,10,0.3)]'
                : 'bg-[#10151C] text-slate-400 border-[#202832] hover:text-white hover:border-slate-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Honors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#0D1117]/90 border border-[#1A222D] hover:border-[#FCEE0A] p-5 rounded-xs shadow-lg transition-all flex flex-col justify-between group"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
            }}
          >
            <div>
              {/* Top Tier & Year */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-xs border"
                  style={{
                    color: entry.accentColor,
                    borderColor: `${entry.accentColor}55`,
                    backgroundColor: `${entry.accentColor}11`
                  }}
                >
                  {entry.tier}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {entry.year}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xs bg-[#10151C] border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-[#FCEE0A] transition-colors">
                  {getTierIcon(entry.tier)}
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase group-hover:text-[#FCEE0A] transition-colors leading-tight">
                    {entry.title}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">
                    {entry.organization}
                  </p>
                </div>
              </div>

              {/* Subtitle / Outcome */}
              <p className="text-xs text-[#00E5FF] font-mono font-bold mb-3">
                {entry.subtitle}
              </p>

              {/* Verification Details */}
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                {entry.verificationDetails}
              </p>
            </div>

            {/* Bottom Proof Link */}
            {entry.projectLink && (
              <div className="pt-3 border-t border-[#1A222D] flex justify-end">
                <a
                  href={entry.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#FCEE0A] hover:text-white flex items-center gap-1 font-bold transition-colors"
                >
                  <span>INSPECT_PROJECT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

          </div>
        ))}
      </div>

    </section>
  );
};

