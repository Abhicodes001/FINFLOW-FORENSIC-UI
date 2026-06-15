import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionsTab from './workspace-tabs/TransactionsTab';
import FlagsTab from './workspace-tabs/FlagsTab';
import EntitiesTab from './workspace-tabs/EntitiesTab';
import TimelineTab from './workspace-tabs/TimelineTab';
import { ShaHashDisplay } from '../components/shared/ShaHashDisplay';
import { Upload } from 'lucide-react';

const ProvenanceChain: React.FC = () => {
  const steps = [
    { label: 'INGESTED', status: 'done', time: '09:42' },
    { label: 'PARSED', status: 'done', time: '09:42' },
    { label: 'VALIDATED', status: 'done', time: '09:43' },
    { label: 'ANALYZED', status: 'done', time: '09:43' },
    { label: 'FLAGGED', status: 'active', time: '' },
    { label: 'SIGNED', status: 'pending', time: '' },
  ];

  return (
    <div className="flex items-center justify-center p-4 bg-void border-b border-border">
      {steps.map((step, i) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-5 h-[22px] flex items-center justify-center relative ${step.status === 'active' ? 'animate-pulse' : ''}`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: step.status === 'pending' ? 'transparent' : 'var(--amber)', border: step.status === 'pending' ? '1px solid var(--border-dim)' : 'none' }}>
               {step.status === 'pending' && <div className="absolute inset-[1px] bg-void" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />}
            </div>
            <span className={`font-mono text-[0.6rem] uppercase ${step.status === 'pending' ? 'text-text-muted' : 'text-amber'}`}>{step.label}</span>
            {step.time && <span className="font-mono text-[0.55rem] text-text-muted absolute mt-9">{step.time}</span>}
          </div>
          {i < steps.length - 1 && (
            <div className="w-8 h-px mx-1 bg-border-dim relative">
              {(steps[i].status === 'done' && steps[i+1].status !== 'pending') && (
                <div className="absolute inset-0 bg-amber" />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const CaseWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'TRANSACTIONS' | 'FLAGS' | 'ENTITIES' | 'TIMELINE'>('TRANSACTIONS');

  return (
    <div className="flex h-screen w-full bg-void overflow-hidden text-text-primary">
      {/* Panel 1: Left Sidebar (300px) */}
      <aside className="w-[300px] bg-surface border-r border-border flex flex-col shrink-0">
        <ProvenanceChain />

        <div className="p-4 border-b border-border">
          <div className="font-mono text-[1.1rem] text-amber mb-2">CC/2026/0042</div>
          <div className="w-full h-px bg-border-dim mb-3" />
          <h2 className="font-serif text-[1rem] text-text-primary mb-1">HAWALA NETWORK — BENGALURU</h2>
          <p className="font-sans text-[0.8rem] text-text-muted">Insp. Ravi Shankar K · CB-CID</p>
          <p className="font-sans text-[0.8rem] text-text-muted">01 Jan 2026 – 14 Jun 2026</p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="t-subhead text-text-muted mb-4">SOURCE FILES (8)</h3>
          
          <div className="space-y-3 mb-6">
            <div 
              className="bg-void border border-border p-3 cursor-pointer hover:border-amber transition-colors"
              onClick={() => navigate('/case/CC-2026-0042/ingestion/1')}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-sans text-[0.6rem] font-bold px-1.5 py-0.5 bg-ch-chq/20 text-text-secondary uppercase rounded-[3px]">PDF</span>
                <span className="font-mono text-[0.75rem] text-text-primary truncate">HDFC_Statement_Acct3821.pdf</span>
              </div>
              <div className="font-mono text-[0.7rem] text-text-muted mb-2">Rows: 4,821 · 11 Apr – 14 Jun</div>
              <div className="mb-2"><ShaHashDisplay hash="d4e9f2a1c3b8f04e19d2c7a5b8f3e1a09d4c2b7e1a3f5c8d" /></div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" />
                <span className="font-sans text-[0.75rem] text-text-primary">QUALITY GATE PASSED</span>
              </div>
            </div>
            {/* More file cards omitted for brevity */}
          </div>

          {/* Upload Zone */}
          <div 
            className="border border-dashed border-amber/40 rounded-[3px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-glow hover:border-amber transition-all group"
            onClick={() => navigate('/case/CC-2026-0042/ingestion/1')}
          >
            <Upload size={20} className="text-amber mb-3" />
            <p className="font-sans text-[0.8rem] font-medium text-text-primary mb-1 tracking-wide">DROP BANK STATEMENTS HERE</p>
            <p className="font-mono text-[0.7rem] text-text-muted mb-3">PDF · XLSX · CSV · JSON</p>
            <div className="flex items-center w-full gap-2 mb-3">
              <div className="flex-1 h-px bg-border-dim" />
              <span className="font-serif italic text-text-muted text-[0.9rem]">or</span>
              <div className="flex-1 h-px bg-border-dim" />
            </div>
            <span className="font-sans text-[0.75rem] text-amber uppercase tracking-wider group-hover:underline">BROWSE FILES</span>
          </div>
        </div>
      </aside>

      {/* Panel 2: Center (Flex) */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Tab Bar */}
        <div className="flex border-b border-border bg-surface shrink-0 px-4 pt-2">
          {(['TRANSACTIONS', 'FLAGS', 'ENTITIES', 'TIMELINE'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-wider focus:outline-none transition-colors border-b-2 ${activeTab === tab ? 'border-amber text-amber' : 'border-transparent text-text-muted hover:text-text-primary'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'TRANSACTIONS' && <TransactionsTab />}
          {activeTab === 'FLAGS' && <FlagsTab />}
          {activeTab === 'ENTITIES' && <EntitiesTab />}
          {activeTab === 'TIMELINE' && <TimelineTab />}
        </div>
      </main>

      {/* Panel 3: Right Sidebar (280px) */}
      <aside className="w-[280px] bg-surface border-l border-border flex flex-col shrink-0">
        <div className="p-4 space-y-3 border-b border-border">
          <button 
            onClick={() => navigate('/case/CC-2026-0042/report')}
            className="w-full bg-amber text-white font-sans font-semibold text-[0.75rem] uppercase tracking-wider py-3 hover:brightness-110 transition-all focus:outline-none"
          >
            GENERATE SIGNED REPORT
          </button>
          <div className="w-full h-px bg-border-dim my-1" />
          <button 
            onClick={() => navigate('/case/CC-2026-0042/graph')}
            className="w-full border border-amber text-amber font-sans font-medium text-[0.75rem] uppercase tracking-wider py-2 hover:bg-amber-glow transition-all flex items-center justify-center gap-2 focus:outline-none"
          >
            VIEW FUND-FLOW GRAPH <span className="font-mono">→</span>
          </button>
        </div>

        <div className="p-4 border-b border-border flex-1 flex flex-col overflow-hidden">
          <h3 className="t-subhead text-text-muted mb-3 shrink-0">PROCESSING LOG</h3>
          <div className="w-full h-px bg-border-dim mb-3 shrink-0" />
          <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[0.75rem] space-y-1">
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:42:18</span><span className="text-risk-clean w-20 shrink-0">FILE_HASH</span><span className="text-text-muted truncate">sha256:d4e9f2...</span></div>
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:42:19</span><span className="text-risk-clean w-20 shrink-0">FORMAT</span><span className="text-text-primary">SCANNED_PDF detected</span></div>
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:42:21</span><span className="text-risk-clean w-20 shrink-0">OCR</span><span className="text-text-primary">Page 1/18 — conf: 0.94</span></div>
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:42:24</span><span className="text-risk-clean w-20 shrink-0">OCR</span><span className="text-text-primary">Page 2/18 — conf: 0.91</span></div>
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:42:41</span><span className="text-amber w-20 shrink-0">QG1</span><span className="text-amber">PASSED — 18 pages, 4821 rows</span></div>
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:42:42</span><span className="text-risk-clean w-20 shrink-0">UTS</span><span className="text-text-primary">4,821 rows normalized</span></div>
            <div className="flex"><span className="w-16 text-text-muted shrink-0">09:43:01</span><span className="text-risk-clean w-20 shrink-0">FLAGS</span><span className="text-text-primary">4 flags generated (2 HIGH)</span></div>
          </div>
        </div>

        <div className="p-4 shrink-0">
          <h3 className="t-subhead text-text-muted mb-3">CHAIN OF CUSTODY</h3>
          <div className="w-full h-px bg-border-dim mb-3" />
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="font-sans text-[0.8rem] text-text-primary flex items-center gap-2"><span className="text-risk-clean font-bold">✓</span> File ingested</span><span className="font-mono text-[0.7rem] text-text-muted">09:42:18</span></div>
            <div className="flex justify-between items-center"><span className="font-sans text-[0.8rem] text-text-primary flex items-center gap-2"><span className="text-risk-clean font-bold">✓</span> Quality Gate 1 passed</span><span className="font-mono text-[0.7rem] text-text-muted">09:42:41</span></div>
            <div className="flex justify-between items-center"><span className="font-sans text-[0.8rem] text-text-primary flex items-center gap-2"><span className="text-risk-clean font-bold">✓</span> Quality Gate 2 passed</span><span className="font-mono text-[0.7rem] text-text-muted">09:42:43</span></div>
            <div className="flex justify-between items-center"><span className="font-sans text-[0.8rem] text-text-primary flex items-center gap-2"><span className="text-risk-clean font-bold">✓</span> Analysis complete</span><span className="font-mono text-[0.7rem] text-text-muted">09:43:01</span></div>
            <div className="flex justify-between items-center"><span className="font-sans text-[0.8rem] text-text-muted flex items-center gap-2"><span className="text-text-muted">○</span> Report generated</span><span className="font-mono text-[0.7rem] text-text-muted">—</span></div>
            <div className="flex justify-between items-center"><span className="font-sans text-[0.8rem] text-text-muted flex items-center gap-2"><span className="text-text-muted">○</span> Report signed</span><span className="font-mono text-[0.7rem] text-text-muted">—</span></div>
          </div>
        </div>
      </aside>

    </div>
  );
};

export default CaseWorkspace;
