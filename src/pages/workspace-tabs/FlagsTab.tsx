import React from 'react';

const FlagsTab: React.FC = () => {
  return (
    <div className="flex h-full bg-void overflow-hidden">
      {/* High Risk Column */}
      <div className="flex-1 border-r border-border flex flex-col">
        <div className="p-3 border-b border-border bg-surface shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] border border-risk-high text-risk-high font-mono text-[0.7rem] uppercase">
            HIGH RISK
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
          
          <div className="bg-surface border border-border p-4 shadow-sm hover:border-risk-high transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-sans font-semibold text-[0.875rem] text-risk-high flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-risk-high" />
                STRUCTURING DETECTED
              </h4>
              <span className="bg-amber/20 text-amber px-2 py-0.5 rounded-[3px] font-sans text-[0.65rem] font-bold uppercase tracking-wider">
                PMLA §2(1)(u)
              </span>
            </div>
            
            <p className="font-sans text-[0.75rem] text-text-muted mb-4">
              Rule-based detection · Module 2
            </p>
            
            <div className="mb-4">
              <span className="font-sans text-[0.75rem] text-text-secondary mr-2">Confidence:</span>
              <div className="inline-flex h-2 w-32 gap-[2px]">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`flex-1 ${i < 18 ? 'bg-risk-high' : 'bg-border'}`} />
                ))}
              </div>
              <span className="font-mono text-[0.75rem] text-text-primary ml-2">0.91 HIGH</span>
            </div>
            
            <div className="mb-4">
              <div className="font-sans text-[0.75rem] text-text-secondary mb-1">Evidence chain:</div>
              <div className="font-mono text-[0.8rem] text-text-muted leading-tight">
                <div className="flex"><span className="text-border-focus mr-2">├─</span>txn_id: d4e9f2·· · 14 Jun · <span className="text-risk-clean ml-1">₹9,80,000 CREDIT (NEFT)</span></div>
                <div className="flex"><span className="text-border-focus mr-2">├─</span>txn_id: 8c1a29·· · 11 Jun · <span className="text-risk-clean ml-1">₹9,60,000 CREDIT (NEFT)</span></div>
                <div className="flex"><span className="text-border-focus mr-2">└─</span>txn_id: f3b811·· · 08 Jun · <span className="text-risk-clean ml-1">₹9,75,000 CREDIT (NEFT)</span></div>
              </div>
            </div>
            
            <p className="font-sans text-[0.875rem] text-text-secondary leading-relaxed mb-4">
              Three credits from same sender within 30 days, each below the ₹10L FIU-IND STR trigger. Total exposure: ₹29,15,000.
            </p>
            
            <div className="flex gap-4">
              <button className="text-amber font-sans text-[0.75rem] hover:underline focus:outline-none">[View transactions]</button>
              <button className="text-text-muted font-sans text-[0.75rem] hover:text-text-primary focus:outline-none">[Suppress flag →]</button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Medium Risk Column */}
      <div className="flex-1 border-r border-border flex flex-col">
        <div className="p-3 border-b border-border bg-surface shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] border border-amber text-amber font-mono text-[0.7rem] uppercase">
            MEDIUM
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Add more cards here as needed */}
        </div>
      </div>

      {/* Low Risk Column */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-border bg-surface shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] border border-risk-low text-risk-low font-mono text-[0.7rem] uppercase">
            LOW / INFORMATIONAL
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Add more cards here as needed */}
        </div>
      </div>
    </div>
  );
};

export default FlagsTab;
