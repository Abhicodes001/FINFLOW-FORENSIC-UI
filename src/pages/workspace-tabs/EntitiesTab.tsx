import React from 'react';
import { RiskScoreRing } from '../../components/shared/RiskScoreRing';

const EntitiesTab: React.FC = () => {
  return (
    <div className="h-full bg-void overflow-y-auto p-6 custom-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        
        {/* Entity Card */}
        <div className="bg-surface border border-border p-5 hover:border-amber transition-colors group">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full border border-text-muted group-hover:border-amber transition-colors" />
            <span className="font-mono text-[0.8rem] text-text-primary">HDFC · ......3821</span>
          </div>
          
          <div className="mb-6">
            <h4 className="font-sans font-medium text-[1rem] text-text-primary mb-1 tracking-wide">RAJESH K SHARMA</h4>
            <p className="font-sans text-[0.75rem] text-text-muted uppercase tracking-wider">INDIVIDUAL</p>
          </div>
          
          <div className="flex justify-center mb-6">
            <RiskScoreRing score={87} size="lg" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="font-sans text-[0.8rem] text-text-muted">Inflow:</span>
              <span className="font-mono text-[0.9rem] text-risk-clean">₹2,34,80,000</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-sans text-[0.8rem] text-text-muted">Outflow:</span>
              <span className="font-mono text-[0.9rem] text-risk-high">₹2,18,40,000</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-sans text-[0.8rem] text-text-muted">Links:</span>
              <span className="font-mono text-[0.9rem] text-text-primary">7 accounts</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-sans text-[0.8rem] text-text-muted">Flags:</span>
              <span className="font-mono text-[0.9rem] text-text-primary">4 <span className="text-risk-high text-[0.75rem]">(2 HIGH)</span></span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EntitiesTab;
