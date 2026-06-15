import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShaHashDisplay } from '../components/shared/ShaHashDisplay';

const DocumentIngestion: React.FC = () => {
  const { id } = useParams();
  const [activeStage, setActiveStage] = useState(1);

  // Auto-progress through stages for demo
  useEffect(() => {
    if (activeStage < 7) {
      const timer = setTimeout(() => {
        setActiveStage(s => s + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  const stages = [
    {
      id: 1,
      title: 'INTAKE & FINGERPRINTING',
      timestamp: '09:42:17',
      content: (
        <div className="font-mono text-[0.8rem] text-text-muted space-y-1">
          <div><span className="text-text-primary">sha256:</span> d4e9f2a1c3b8f04e... <span className="text-risk-clean font-bold">✓</span></div>
          <div><span className="text-text-primary">Timestamped:</span> 09:42:17 UTC+5:30</div>
          <div><span className="text-text-primary">Format detection:</span> magic bytes → application/pdf (not relying on extension)</div>
        </div>
      )
    },
    {
      id: 2,
      title: 'FORMAT DETECTION',
      timestamp: '09:42:19',
      content: (
        <div className="font-mono text-[0.8rem] text-text-muted space-y-1">
          <div><span className="text-text-primary">Detected:</span> SCANNED PDF</div>
          <div><span className="text-text-primary">OCR Engine:</span> Tesseract v5 with deskew + denoise + binarization</div>
          <div><span className="text-text-primary">Pages:</span> 18</div>
        </div>
      )
    },
    {
      id: 3,
      title: 'OCR / TEXT EXTRACTION',
      timestamp: '09:42:24',
      content: (
        <div className="font-mono text-[0.8rem] text-text-muted space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-text-primary">Progress:</span>
            <div className="flex-1 bg-surface h-3 relative">
              <div className="absolute inset-y-0 left-0 bg-amber transition-all duration-300" style={{ width: activeStage === 3 ? '60%' : '100%' }} />
            </div>
            <span>18/18 pages</span>
          </div>
          <div><span className="text-text-primary">Average confidence:</span> 0.92</div>
          <div><span className="text-text-primary">Pages flagged ({`<`} 0.75 conf):</span> 0</div>
          <div>
            <span className="text-text-primary mb-1 block">Sample extracted text (first transaction row):</span>
            <div className="bg-void p-2 border border-border text-[0.7rem]">
              "14/06/2026  UTR829410  NEFT/HDFC/R K SHARMA/SALARY  4,80,000.00  7,24,821.43"
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'PRE-PROCESSING',
      timestamp: '09:42:30',
      content: (
        <div className="font-mono text-[0.8rem] text-text-muted space-y-1">
          <div className="flex justify-between"><span className="text-text-primary">Rows extracted:</span> <span>4,847</span></div>
          <div className="flex justify-between"><span className="text-text-primary">Page headers removed:</span> <span>36 header rows stripped</span></div>
          <div className="flex justify-between"><span className="text-text-primary">Continuation merges:</span> <span>12 rows merged into parent rows</span></div>
          <div className="flex justify-between"><span className="text-text-primary">Running balance check:</span> <span className={activeStage === 4 ? 'text-amber animate-pulse' : 'text-risk-clean'}>{activeStage === 4 ? 'in progress…' : 'verified'}</span></div>
        </div>
      )
    },
    {
      id: 5,
      title: 'COLUMN HEADER MAPPING',
      timestamp: '09:42:35',
      content: (
        <div className="w-full border border-border">
          <div className="flex bg-surface border-b border-border font-sans text-[0.7rem] font-bold text-text-muted uppercase tracking-wider p-2">
            <div className="flex-1">RAW HEADER</div>
            <div className="flex-1">MAPPED FIELD</div>
            <div className="w-[120px]">MATCH TYPE</div>
            <div className="w-[100px] text-right">CONFIDENCE</div>
          </div>
          <div className="font-mono text-[0.75rem] text-text-muted bg-void p-2 space-y-1">
            <div className="flex items-center"><div className="flex-1">"Txn Date"</div><div className="flex-1 text-text-primary">date</div><div className="w-[120px]">EXACT MATCH</div><div className="w-[100px] text-right text-text-primary flex justify-end gap-2 items-center">1.00 <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" /></div></div>
            <div className="flex items-center"><div className="flex-1">"Withdrawal Amt."</div><div className="flex-1 text-text-primary">amount (DEBIT)</div><div className="w-[120px]">SYNONYM DICT</div><div className="w-[100px] text-right text-text-primary flex justify-end gap-2 items-center">0.98 <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" /></div></div>
            <div className="flex items-center"><div className="flex-1">"Deposit Amt."</div><div className="flex-1 text-text-primary">amount (CREDIT)</div><div className="w-[120px]">SYNONYM DICT</div><div className="w-[100px] text-right text-text-primary flex justify-end gap-2 items-center">0.98 <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" /></div></div>
            <div className="flex items-center"><div className="flex-1">"Narration"</div><div className="flex-1 text-text-primary">description</div><div className="w-[120px]">SYNONYM DICT</div><div className="w-[100px] text-right text-text-primary flex justify-end gap-2 items-center">0.96 <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" /></div></div>
            <div className="flex items-center"><div className="flex-1">"Chq/Ref No."</div><div className="flex-1 text-text-primary">ref_no</div><div className="w-[120px]">FUZZY MATCH</div><div className="w-[100px] text-right text-text-primary flex justify-end gap-2 items-center">0.91 <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" /></div></div>
            <div className="flex items-center"><div className="flex-1">"Closing Bal."</div><div className="flex-1 text-text-primary">balance</div><div className="w-[120px]">ML INFERRED</div><div className="w-[100px] text-right text-text-primary flex justify-end gap-2 items-center">0.84 <div className="w-1.5 h-1.5 rounded-full bg-amber" /></div></div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: 'ROW VALIDATION',
      timestamp: '09:42:41',
      content: (
        <div className="font-mono text-[0.8rem] space-y-1">
          <div className="flex justify-between text-text-muted"><span className="text-text-primary">Total rows:</span> <span>4,847</span></div>
          <div className="flex justify-between items-center text-risk-clean"><span className="text-text-primary">Valid:</span> <div className="flex items-center gap-4"><span>4,821 (99.5%)</span><div className="w-2 h-2 rounded-full bg-risk-clean" /></div></div>
          <div className="flex justify-between items-center text-amber"><span className="text-text-primary">Flagged:</span> <div className="flex items-center gap-4"><span>18 (0.4%) [balance mismatch, date inferred]</span><div className="w-2 h-2 rounded-full bg-amber" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', borderRadius: '100% 0 0 100%' }} /></div></div>
          <div className="flex justify-between items-center text-text-muted"><span className="text-text-primary">Failed:</span> <div className="flex items-center gap-4"><span>8 (0.2%) [unparseable amount]</span><div className="w-2 h-2 rounded-full border border-text-muted" /></div></div>
          <div className="w-full h-px bg-border-dim my-2" />
          <div className="flex justify-between text-text-muted"><span className="text-text-primary">Malformed rows ({`<`} 20% threshold):</span> <span className="text-risk-clean">PASS</span></div>
        </div>
      )
    },
    {
      id: 7,
      title: 'QUALITY GATE RESULT',
      timestamp: '09:42:43',
      content: (
        <div className="bg-[rgba(6,95,70,0.1)] border border-risk-clean p-6 flex flex-col items-center justify-center text-center">
           <div className="flex items-center gap-3 mb-4">
             <span className="text-risk-clean font-bold text-[1.5rem]">✓</span>
             <h3 className="font-sans font-semibold text-[1.25rem] text-text-primary tracking-wide">QUALITY GATE 2 PASSED</h3>
           </div>
           <div className="font-mono text-[0.85rem] text-text-primary space-y-1">
             <p>4,821 rows written to Universal Transaction Schema</p>
             <p>8 rows sent to Human Review Queue</p>
             <p className="mt-2 text-risk-clean">Data quality: 99.2%</p>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-void flex flex-col text-text-primary overflow-y-auto">
      <div className="max-w-[800px] w-full mx-auto p-6">
        <Link to={`/case/${id || 'CC-2026-0042'}`} className="text-text-muted hover:text-text-primary font-sans text-[0.85rem] mb-6 inline-block">
          ← Back to case
        </Link>
        <div className="w-full h-px bg-border-dim mb-6" />

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-sans text-[0.7rem] font-bold px-2 py-1 bg-ch-chq/20 text-text-secondary uppercase rounded-[3px]">PDF</span>
            <h1 className="font-mono text-[1.1rem] text-text-primary">HDFC_Statement_Account_3821_Jan_Jun2026.pdf</h1>
          </div>
          <div className="font-sans text-[0.85rem] text-text-muted mb-2 ml-[3.2rem]">
            4.2 MB · Uploaded 09:42:17 · By Insp. Ravi Shankar K
          </div>
          <div className="ml-[3.2rem]">
            <ShaHashDisplay hash="d4e9f2a1c3b8f04e19d2c7a5b8f3e1a09d4c2b7e1a3f5c8d" truncate={false} />
          </div>
        </div>

        {/* Pipeline */}
        <div className="max-w-[680px] mx-auto flex flex-col items-center">
          {stages.map((stage, index) => {
            const isDone = activeStage > stage.id;
            const isActive = activeStage === stage.id;
            const isPending = activeStage < stage.id;

            return (
              <div key={stage.id} className="w-full flex flex-col items-center">
                <div className="w-full flex items-start gap-4">
                  <div className="mt-1 flex flex-col items-center shrink-0 w-6">
                    <div className={`w-3 h-3 rounded-full ${isDone ? 'bg-risk-clean' : isActive ? 'bg-amber animate-pulse' : 'bg-border'}`} />
                  </div>
                  <div className={`flex-1 bg-surface border border-border p-5 rounded-[2px] transition-opacity duration-500 ${isPending ? 'opacity-30' : 'opacity-100'} ${isActive ? 'border-amber/50 shadow-[0_0_15px_rgba(212,134,10,0.1)]' : ''}`}>
                    <div className="flex justify-between items-center mb-3">
                      <h2 className={`font-sans font-semibold text-[0.85rem] tracking-wider uppercase ${isDone ? 'text-text-primary' : isActive ? 'text-amber' : 'text-text-muted'}`}>
                        {stage.title}
                      </h2>
                      {(!isPending || isActive) && (
                        <span className="font-mono text-[0.7rem] text-text-muted">{stage.timestamp}</span>
                      )}
                    </div>
                    <div className="w-full h-px bg-border-dim mb-3" />
                    {(!isPending || isActive) && stage.content}
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div className="w-px h-8 ml-[10px] mr-auto my-1" style={{ backgroundColor: isDone ? 'var(--risk-clean)' : 'var(--border)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentIngestion;
