import React from 'react';
import { ChannelBadge, TriageLevelDot } from '../../components/shared/Badges';

const TransactionsTab: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-void">
      {/* Filter bar */}
      <div className="p-3 border-b border-border flex items-center gap-4 bg-surface shrink-0">
        <div className="flex flex-col">
          <label className="font-mono text-[0.65rem] text-text-muted uppercase mb-1">FROM</label>
          <input type="date" className="bg-input border border-border text-text-primary text-xs px-2 py-1 font-mono focus:border-border-focus focus:outline-none" defaultValue="2026-01-01" />
        </div>
        <div className="flex flex-col">
          <label className="font-mono text-[0.65rem] text-text-muted uppercase mb-1">TO</label>
          <input type="date" className="bg-input border border-border text-text-primary text-xs px-2 py-1 font-mono focus:border-border-focus focus:outline-none" defaultValue="2026-06-14" />
        </div>
        
        <div className="w-px h-8 bg-border-dim mx-2" />
        
        <div className="flex gap-2 items-end pb-0.5">
          <select className="bg-input border border-border text-text-primary text-xs px-2 py-1.5 focus:border-border-focus focus:outline-none uppercase tracking-wide">
            <option>ALL CHANNELS</option>
            <option>UPI</option>
            <option>NEFT</option>
            <option>RTGS</option>
          </select>
          
          <select className="bg-input border border-border text-text-primary text-xs px-2 py-1.5 focus:border-border-focus focus:outline-none uppercase tracking-wide">
            <option>ALL DIRECTIONS</option>
            <option>CREDIT</option>
            <option>DEBIT</option>
          </select>
          
          <select className="bg-input border border-border text-text-primary text-xs px-2 py-1.5 focus:border-border-focus focus:outline-none uppercase tracking-wide">
            <option>ALL FLAGS</option>
            <option>FLAGGED ONLY</option>
          </select>
        </div>

        <div className="flex-1" />

        <div className="w-64">
          <input type="text" placeholder="Search by description, UTR, account…" className="w-full bg-input border border-border text-text-primary text-xs px-3 py-1.5 focus:border-border-focus focus:outline-none font-sans" />
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-surface border-b border-border z-10 shadow-sm">
            <tr>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim">DATE</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim">REF NO</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim">DESCRIPTION</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim">CHANNEL</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim text-right">CREDIT (₹)</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim text-right">DEBIT (₹)</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2 border-r border-border-dim">CONF</th>
              <th className="font-sans font-medium text-[0.75rem] text-text-muted tracking-wider p-2">FLAGS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border border-l-2 border-l-amber hover:bg-elevated transition-colors bg-amber-glow/5 h-10">
              <td className="p-2 font-mono text-[0.75rem] text-text-primary">14 Jun<br/><span className="text-text-muted text-[0.65rem]">2026</span></td>
              <td className="p-2 font-mono text-[0.75rem] text-text-muted">UTR82941004921</td>
              <td className="p-2 font-sans text-[0.8rem] text-text-primary max-w-[200px] truncate" title="NEFT/HDFC/RAJESH K SHARMA/SALARY CREDIT">NEFT/HDFC/RAJESH K SHARMA/…</td>
              <td className="p-2"><ChannelBadge channel="UPI" /></td>
              <td className="p-2 font-mono text-[0.75rem] text-risk-clean text-right">4,80,000.00</td>
              <td className="p-2 font-mono text-[0.75rem] text-text-muted text-right">-</td>
              <td className="p-2"><div className="flex flex-col gap-1"><TriageLevelDot level="HIGH" /><span className="font-mono text-[0.65rem] text-amber text-right w-full block pr-1">0.94</span></div></td>
              <td className="p-2">
                <div className="w-2 h-2 rounded-full bg-amber cursor-pointer" title="STRUCTURING DETECTED" />
              </td>
            </tr>

            <tr className="border-b border-border hover:bg-elevated transition-colors h-10">
              <td className="p-2 font-mono text-[0.75rem] text-text-primary">12 Jun<br/><span className="text-text-muted text-[0.65rem]">2026</span></td>
              <td className="p-2 font-mono text-[0.75rem] text-text-muted">IMPS2941004921</td>
              <td className="p-2 font-sans text-[0.8rem] text-text-primary max-w-[200px] truncate">TRANSFER TO SELF</td>
              <td className="p-2"><ChannelBadge channel="IMPS" /></td>
              <td className="p-2 font-mono text-[0.75rem] text-text-muted text-right">-</td>
              <td className="p-2 font-mono text-[0.75rem] text-risk-high text-right">1,20,000.00</td>
              <td className="p-2"><div className="flex flex-col gap-1"><TriageLevelDot level="LOW" /><span className="font-mono text-[0.65rem] text-text-muted text-right w-full block pr-1">0.12</span></div></td>
              <td className="p-2">
                <div className="w-2 h-2 rounded-full bg-risk-low cursor-pointer" title="INFORMATIONAL" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-border flex justify-end items-center gap-4 bg-surface shrink-0">
        <button className="font-mono text-[0.75rem] text-text-primary hover:text-amber transition-colors">← PREV</button>
        <span className="font-mono text-[0.75rem] text-text-muted">[Page 1 of 42]</span>
        <button className="font-mono text-[0.75rem] text-text-primary hover:text-amber transition-colors">NEXT →</button>
      </div>
    </div>
  );
};

export default TransactionsTab;
