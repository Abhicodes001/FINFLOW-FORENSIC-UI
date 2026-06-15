import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { truncateAccount, formatINRRaw } from '../utils/formatters';
import { TriageLevelDot } from '../components/shared/Badges';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-void overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[260px] bg-surface border-r border-border flex flex-col shrink-0">
        {/* Top Section */}
        <div className="p-4 border-b border-border-dim">
          <h2 className="font-serif text-[1rem] text-amber mb-1">FINFLOW</h2>
          <p className="font-mono text-[0.7rem] text-text-muted uppercase tracking-wider">
            Karnataka CID · Cybercrime Division
          </p>
        </div>

        {/* Active Cases Section */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="t-subhead text-text-muted">ACTIVE CASES</h3>
            <span className="bg-elevated text-amber font-mono text-[0.7rem] px-1.5 py-0.5 rounded-[3px]">
              12
            </span>
          </div>

          <div className="space-y-3">
            {/* Case Card 1 */}
            <div 
              className="bg-elevated border border-border border-l-2 border-l-amber p-3 cursor-pointer group transition-colors hover:bg-surface"
              onClick={() => navigate('/case/CC-2026-0042')}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-[6px] h-[7px] bg-amber" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                <span className="font-mono text-[0.8rem] text-amber">CC/2026/0042</span>
              </div>
              <h4 className="font-sans text-[0.85rem] font-medium text-text-primary mb-2 leading-tight">
                HAWALA NETWORK — BENGALURU
              </h4>
              <div className="w-full h-px bg-border-dim mb-2" />
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[0.7rem] text-text-muted">14 accounts · 38,421 rows</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-[2px] h-2">
                  {/* Risk bar visual */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-[6px] bg-risk-high" style={{ opacity: i < 8 ? 1 : 0.2 }} />
                  ))}
                </div>
                <span className="font-mono text-[0.75rem] text-risk-high">82</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-risk-clean" />
                <span className="font-sans text-[0.65rem] font-semibold text-text-muted uppercase tracking-wider">ACTIVE</span>
              </div>
            </div>

            {/* Case Card 2 */}
            <div className="bg-void border border-border p-3 cursor-pointer group transition-colors hover:bg-elevated hover:border-l-amber hover:border-l-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-[6px] h-[7px] bg-text-muted" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                <span className="font-mono text-[0.8rem] text-text-secondary group-hover:text-amber transition-colors">CC/2026/0039</span>
              </div>
              <h4 className="font-sans text-[0.85rem] font-medium text-text-primary mb-2 leading-tight">
                MULE ACCOUNTS — MYSURU
              </h4>
              <div className="w-full h-px bg-border-dim mb-2" />
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[0.7rem] text-text-muted">4 accounts · 12,104 rows</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-[2px] h-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-[6px] bg-amber" style={{ opacity: i < 6 ? 1 : 0.2 }} />
                  ))}
                </div>
                <span className="font-mono text-[0.75rem] text-amber">54</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-risk-medium" />
                <span className="font-sans text-[0.65rem] font-semibold text-text-muted uppercase tracking-wider">REVIEW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="p-4 border-t border-border-dim">
          <button 
            onClick={() => alert('New Case creation modal would open here.')}
            className="w-full border border-amber text-amber font-sans text-[0.75rem] uppercase tracking-wider py-2 font-medium hover:bg-amber-glow transition-colors focus:outline-none"
          >
            + NEW CASE
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
        {/* Top Stats Row */}
        <div className="flex border-b border-border shrink-0 bg-void">
          <div className="flex-1 border-r border-border p-5">
            <h4 className="t-subhead text-text-muted mb-2">TRANSACTIONS</h4>
            <div className="font-mono text-[1.75rem] text-text-data mb-3">1,24,839</div>
            <div className="w-full h-px bg-border-dim mb-2" />
            <div className="h-10 w-full flex items-end gap-1">
               {/* Sparkline mock */}
               {[12, 18, 15, 25, 22, 35, 30, 45, 40, 50, 42, 60].map((h, i) => (
                 <div key={i} className="flex-1 bg-transparent border border-amber border-b-0" style={{ height: `${h}%` }} />
               ))}
            </div>
          </div>
          <div className="flex-1 border-r border-border p-5">
            <h4 className="t-subhead text-text-muted mb-2">FLAGS RAISED</h4>
            <div className="font-mono text-[1.75rem] text-text-data mb-3">247</div>
            <div className="w-full h-px bg-border-dim mb-2" />
            <div className="h-10 w-full flex items-end gap-1">
               {[5, 8, 4, 12, 10, 15, 8, 20, 18, 25, 22, 14].map((h, i) => (
                 <div key={i} className="flex-1 bg-transparent border border-risk-high border-b-0" style={{ height: `${h}%` }} />
               ))}
            </div>
          </div>
          <div className="flex-1 border-r border-border p-5">
            <h4 className="t-subhead text-text-muted mb-2">SUSPICIOUS AMT</h4>
            <div className="font-mono text-[1.75rem] text-text-data mb-3">₹4.8 Cr</div>
            <div className="w-full h-px bg-border-dim mb-2" />
            <div className="h-10 w-full flex items-end gap-1">
               {[20, 25, 22, 30, 28, 35, 30, 40, 35, 45, 50, 65].map((h, i) => (
                 <div key={i} className="flex-1 bg-transparent border border-amber border-b-0" style={{ height: `${h}%` }} />
               ))}
            </div>
          </div>
          <div className="flex-1 p-5">
            <h4 className="t-subhead text-text-muted mb-2">NETWORKS MAPPED</h4>
            <div className="font-mono text-[1.75rem] text-text-data mb-3">12</div>
            <div className="w-full h-px bg-border-dim mb-2" />
            <div className="h-10 w-full flex items-end gap-1">
               {[2, 2, 3, 3, 5, 5, 8, 8, 9, 10, 12, 12].map((h, i) => (
                 <div key={i} className="flex-1 bg-transparent border border-text-muted border-b-0" style={{ height: `${h*4}%` }} />
               ))}
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-8">
          {/* Recent Alerts */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="t-subhead text-text-primary">RECENT ALERTS</h3>
              <Link to="/alerts" className="text-amber font-sans text-[0.8rem] hover:underline focus:outline-none">
                View all →
              </Link>
            </div>
            
            <div className="w-full border border-border">
              {/* Header */}
              <div className="flex bg-surface border-b border-border">
                <div className="w-[200px] p-2 t-subhead text-text-muted border-r border-border">FLAG TYPE</div>
                <div className="w-[100px] p-2 t-subhead text-text-muted border-r border-border">CASE</div>
                <div className="w-[180px] p-2 t-subhead text-text-muted border-r border-border">ACCOUNT</div>
                <div className="w-[120px] p-2 t-subhead text-text-muted border-r border-border">CONFIDENCE</div>
                <div className="w-[150px] p-2 t-subhead text-text-muted border-r border-border text-right">AMOUNT</div>
                <div className="flex-1 p-2 t-subhead text-text-muted">TIMESTAMP</div>
              </div>
              
              {/* Rows */}
              <div className="flex flex-col">
                <div className="flex border-b border-border bg-void hover:bg-elevated transition-colors group">
                  <div className="w-[200px] p-2 font-mono text-[0.75rem] border-r border-border border-l-2 border-l-risk-medium text-text-primary flex items-center">
                    STRUCTURING
                  </div>
                  <div className="w-[100px] p-2 font-mono text-[0.75rem] text-text-muted border-r border-border flex items-center">
                    CC/042
                  </div>
                  <div className="w-[180px] p-2 font-mono text-[0.75rem] text-text-primary border-r border-border flex items-center">
                    HDFC·····3821
                  </div>
                  <div className="w-[120px] p-2 border-r border-border flex items-center gap-2">
                    <TriageLevelDot level="HIGH" />
                    <span className="font-mono text-[0.75rem] text-text-muted">91</span>
                  </div>
                  <div className="w-[150px] p-2 font-mono text-[0.75rem] text-text-primary border-r border-border text-right flex justify-end items-center">
                    ₹47,80,000
                  </div>
                  <div className="flex-1 p-2 font-mono text-[0.75rem] text-text-muted flex items-center">
                    14 Jun 09:42
                  </div>
                </div>

                <div className="flex border-b border-border bg-void hover:bg-elevated transition-colors group">
                  <div className="w-[200px] p-2 font-mono text-[0.75rem] border-r border-border border-l-2 border-l-risk-high text-text-primary flex items-center">
                    ROUND-TRIP DETECTED
                  </div>
                  <div className="w-[100px] p-2 font-mono text-[0.75rem] text-text-muted border-r border-border flex items-center">
                    CC/039
                  </div>
                  <div className="w-[180px] p-2 font-mono text-[0.75rem] text-text-primary border-r border-border flex items-center">
                    SBI·····9204
                  </div>
                  <div className="w-[120px] p-2 border-r border-border flex items-center gap-2">
                    <TriageLevelDot level="MEDIUM" />
                    <span className="font-mono text-[0.75rem] text-text-muted">74</span>
                  </div>
                  <div className="w-[150px] p-2 font-mono text-[0.75rem] text-text-primary border-r border-border text-right flex justify-end items-center">
                    ₹12,50,000
                  </div>
                  <div className="flex-1 p-2 font-mono text-[0.75rem] text-text-muted flex items-center">
                    13 Jun 17:11
                  </div>
                </div>

                <div className="flex bg-void hover:bg-elevated transition-colors group">
                  <div className="w-[200px] p-2 font-mono text-[0.75rem] border-r border-border border-l-2 border-l-risk-high text-text-primary flex items-center">
                    DORMANT REACTIVATION
                  </div>
                  <div className="w-[100px] p-2 font-mono text-[0.75rem] text-text-muted border-r border-border flex items-center">
                    CC/042
                  </div>
                  <div className="w-[180px] p-2 font-mono text-[0.75rem] text-text-primary border-r border-border flex items-center">
                    AXIS·····6671
                  </div>
                  <div className="w-[120px] p-2 border-r border-border flex items-center gap-2">
                    <TriageLevelDot level="HIGH" />
                    <span className="font-mono text-[0.75rem] text-text-muted">96</span>
                  </div>
                  <div className="w-[150px] p-2 font-mono text-[0.75rem] text-text-primary border-r border-border text-right flex justify-end items-center">
                    ₹92,00,000
                  </div>
                  <div className="flex-1 p-2 font-mono text-[0.75rem] text-text-muted flex items-center">
                    13 Jun 08:30
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Queue */}
          <section>
            <h3 className="t-subhead text-text-primary mb-4">PROCESSING QUEUE</h3>
            <div className="space-y-2">
              {/* Item 1 */}
              <div 
                className="flex items-center bg-elevated border border-border p-3 gap-4 cursor-pointer hover:border-amber transition-colors"
                onClick={() => navigate('/case/CC-2026-0042/ingestion/1')}
              >
                <span className="font-sans text-[0.7rem] font-bold px-1.5 py-0.5 bg-ch-chq/20 text-text-secondary uppercase rounded-[3px]">PDF</span>
                <span className="font-mono text-[0.8rem] text-text-primary flex-1 truncate">CC_2026_042_HDFC_Acct_9821.pdf</span>
                <div className="flex items-center gap-3 w-[400px]">
                  <div className="flex-1 bg-surface h-3 rounded-none overflow-hidden flex">
                    <div className="bg-amber h-full" style={{ width: '72%' }} />
                    <div className="bg-amber-dim/30 h-full flex-1" />
                  </div>
                  <span className="font-mono text-[0.75rem] text-text-muted w-10 text-right">72%</span>
                  <span className="font-mono text-[0.75rem] text-text-muted w-32 truncate">OCR — page 14/20</span>
                </div>
              </div>

              {/* Item 2 */}
              <div 
                className="flex items-center bg-elevated border border-border p-3 gap-4 cursor-pointer hover:border-amber transition-colors"
                onClick={() => navigate('/case/CC-2026-0042/ingestion/2')}
              >
                <span className="font-sans text-[0.7rem] font-bold px-1.5 py-0.5 bg-risk-clean/20 text-risk-clean uppercase rounded-[3px]">XLS</span>
                <span className="font-mono text-[0.8rem] text-text-primary flex-1 truncate">CC_2026_042_SBI_Statement_Mar26.xlsx</span>
                <div className="flex items-center gap-3 w-[400px]">
                  <div className="flex-1 bg-surface h-3 rounded-none overflow-hidden flex">
                    <div className="bg-amber h-full" style={{ width: '88%' }} />
                    <div className="bg-amber-dim/30 h-full flex-1" />
                  </div>
                  <span className="font-mono text-[0.75rem] text-text-muted w-10 text-right">88%</span>
                  <span className="font-mono text-[0.75rem] text-text-muted w-32 truncate">Column mapping</span>
                </div>
              </div>

              {/* Item 3 */}
              <div 
                className="flex items-center bg-elevated border border-risk-clean/30 p-3 gap-4 cursor-pointer hover:border-amber transition-colors"
                onClick={() => navigate('/case/CC-2026-0042/ingestion/3')}
              >
                <span className="font-sans text-[0.7rem] font-bold px-1.5 py-0.5 bg-ch-neft/20 text-ch-neft uppercase rounded-[3px]">CSV</span>
                <span className="font-mono text-[0.8rem] text-text-primary flex-1 truncate">CC_2026_039_Axis_Export.csv</span>
                <div className="flex items-center gap-3 w-[400px]">
                  <div className="flex-1 bg-surface h-3 rounded-none overflow-hidden flex">
                    <div className="bg-risk-clean h-full w-full" />
                  </div>
                  <span className="font-mono text-[0.75rem] text-text-muted w-10 text-right">100%</span>
                  <span className="font-mono text-[0.75rem] text-risk-clean w-32 truncate">✓ Quality Gate 2</span>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
