import React from 'react';
import { Mail, ExternalLink, Terminal, Download, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { OPERATOR_PROFILE } from '../../data/cyberpunkData';

export const NetConnectFooter: React.FC = () => {
  return (
    <footer id="contact" className="relative z-10 pt-20 pb-12 px-4 sm:px-8 border-t border-[#1A222D] bg-[#07090D] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Terminal Header */}
        <div className="p-6 sm:p-8 bg-[#0D1117] border border-[#1A222D] rounded-xs shadow-2xl mb-12"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FCEE0A] tracking-widest mb-1">
                <span>[// NET_DISPATCHER // DIRECT_PORTAL ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                CONNECT TO THE NET_
              </h2>
              <p className="text-sm text-slate-300 font-medium mt-2 max-w-xl">
                Open for AI/ML engineering internships, full-stack systems development, and high-impact technical collaborations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={OPERATOR_PROFILE.links.email}
                className="px-5 py-3 bg-[#FCEE0A] hover:bg-white text-[#07090D] font-mono font-black text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-[0_0_20px_rgba(252,238,10,0.4)] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>TRANSMIT_DISPATCH</span>
              </a>

              <a
                href={OPERATOR_PROFILE.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#1A222D] hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <Download className="w-4 h-4 text-[#00E5FF]" />
                <span>OFFICIAL_RESUME</span>
              </a>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#1A222D]">
            <a
              href={OPERATOR_PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#10151C] hover:bg-[#1A222D] border border-[#202832] hover:border-[#00E5FF] rounded-xs flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-white transition-all group"
            >
              <GithubIcon className="w-4 h-4 text-[#00E5FF]" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400">GITHUB</p>
                <p className="font-bold truncate text-white group-hover:text-[#FCEE0A]">@DevWithOm</p>
              </div>
            </a>

            <a
              href={OPERATOR_PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#10151C] hover:bg-[#1A222D] border border-[#202832] hover:border-[#00E5FF] rounded-xs flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-white transition-all group"
            >
              <LinkedinIcon className="w-4 h-4 text-[#00E5FF]" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400">LINKEDIN</p>
                <p className="font-bold truncate text-white group-hover:text-[#FCEE0A]">Om Vyas</p>
              </div>
            </a>

            <a
              href={OPERATOR_PROFILE.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#10151C] hover:bg-[#1A222D] border border-[#202832] hover:border-[#FCEE0A] rounded-xs flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-white transition-all group"
            >
              <Terminal className="w-4 h-4 text-[#FCEE0A]" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400">LEETCODE</p>
                <p className="font-bold truncate text-white group-hover:text-[#FCEE0A]">om_vyas_21</p>
              </div>
            </a>

            <a
              href={OPERATOR_PROFILE.links.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#10151C] hover:bg-[#1A222D] border border-[#202832] hover:border-[#FF2E88] rounded-xs flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-white transition-all group"
            >
              <Terminal className="w-4 h-4 text-[#FF2E88]" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400">CODECHEF</p>
                <p className="font-bold truncate text-white group-hover:text-[#FCEE0A]">om_vyas_21</p>
              </div>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Fan-Inspired Attribution (satisfies prompt section 10 & 13.10) */}
        <div className="pt-6 border-t border-[#1A222D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <p className="text-slate-300 font-bold">
              © 2026 OM VYAS // ENGINEER // RESEARCHER
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Independent fan-inspired developer portfolio. Not affiliated with CD PROJEKT RED, Studio TRIGGER, or Netflix.
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>PORTFOLIO_OS v2.0 // VITE_REACT_19</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
