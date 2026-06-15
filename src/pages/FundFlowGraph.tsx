import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Link, useParams } from 'react-router-dom';
import { RiskScoreRing } from '../components/shared/RiskScoreRing';
import { Play } from 'lucide-react';

const FundFlowGraph: React.FC = () => {
  const { id } = useParams();
  const cyRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        { data: { id: 'a', label: 'HDFC......3821', risk: 87, cluster: '#C8870A', bank: 'HDFC' } },
        { data: { id: 'b', label: 'SBI......9204', risk: 54, cluster: '#B91C1C', bank: 'SBI' } },
        { data: { id: 'c', label: 'AXIS......6671', risk: 96, cluster: '#B91C1C', bank: 'AXIS' } },
        { data: { id: 'd', label: 'ICICI......1102', risk: 20, cluster: '#0D7F7A', bank: 'ICICI' } },
        { data: { id: 'ab', source: 'a', target: 'b', amount: 8, channel: 'var(--ch-neft)' } },
        { data: { id: 'ac', source: 'a', target: 'c', amount: 5, channel: 'var(--ch-rtgs)' } },
        { data: { id: 'cd', source: 'c', target: 'd', amount: 2, channel: 'var(--ch-upi)' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(cluster)',
            'label': 'data(label)',
            'color': '#111827',
            'font-family': '"IBM Plex Mono", monospace',
            'font-size': '10px',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': 6,
            'width': (ele) => Math.max(20, Math.min(80, ele.data('risk') * 0.8)),
            'height': (ele) => Math.max(20, Math.min(80, ele.data('risk') * 0.8)),
            'border-width': (ele) => ele.data('risk') > 80 ? 4 : 0,
            'border-color': 'var(--amber)',
            'border-opacity': 0.8
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(amount)',
            'line-color': 'data(channel)',
            'target-arrow-color': 'data(channel)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.7
          }
        }
      ],
      layout: {
        name: 'cose',
        padding: 50,
      }
    });

    cy.on('tap', 'node', (evt) => {
      setSelectedNode(evt.target.data());
    });
    
    cy.on('tap', (evt) => {
      if(evt.target === cy) {
        setSelectedNode(null);
      }
    });

    return () => {
      cy.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-void overflow-hidden text-text-primary font-sans relative">
      {/* Top Toolbar */}
      <header className="h-14 bg-surface border-b border-border flex items-center px-4 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-3 w-[300px]">
          <span className="font-mono text-amber text-[0.85rem]">{id || 'CC/2026/0042'}</span>
          <span className="text-border-dim">/</span>
          <h1 className="t-subhead text-text-primary">FUND FLOW NETWORK</h1>
        </div>
        
        <div className="flex-1 flex justify-center items-center gap-6">
          <div className="flex items-center gap-2">
             {/* Slider placeholder */}
             <div className="w-32 h-1 bg-border rounded-full relative">
               <div className="absolute inset-y-0 left-4 right-8 bg-amber rounded-full" />
               <div className="absolute top-1/2 -translate-y-1/2 left-4 w-3 h-3 bg-white border-2 border-amber rounded-full" />
               <div className="absolute top-1/2 -translate-y-1/2 right-8 w-3 h-3 bg-white border-2 border-amber rounded-full" />
             </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.65rem] text-text-muted">MIN ₹</span>
            <input type="text" className="w-16 bg-input border border-border text-text-primary font-mono text-[0.75rem] px-2 py-1 rounded-[3px] focus:outline-none focus:border-amber" defaultValue="10,000" />
          </div>

          <div className="flex gap-1">
            <span className="px-2 py-1 bg-ch-upi/20 text-ch-upi font-mono text-[0.65rem] rounded-full border border-ch-upi cursor-pointer">UPI</span>
            <span className="px-2 py-1 bg-ch-neft/20 text-ch-neft font-mono text-[0.65rem] rounded-full border border-ch-neft cursor-pointer">NEFT</span>
            <span className="px-2 py-1 bg-ch-rtgs/20 text-ch-rtgs font-mono text-[0.65rem] rounded-full border border-ch-rtgs cursor-pointer">RTGS</span>
            <span className="px-2 py-1 bg-ch-imps/20 text-ch-imps font-mono text-[0.65rem] rounded-full border border-ch-imps cursor-pointer">IMPS</span>
          </div>
        </div>

        <div className="w-[400px] flex justify-end items-center gap-4">
          <div className="flex gap-1 bg-input p-0.5 rounded-[3px]">
            <button className="px-3 py-1 bg-amber text-white font-sans text-[0.7rem] font-bold rounded-[2px]">PAGERANK</button>
            <button className="px-3 py-1 text-text-muted font-sans text-[0.7rem] font-bold hover:text-text-primary">LOUVAIN</button>
            <button className="px-3 py-1 text-text-muted font-sans text-[0.7rem] font-bold hover:text-text-primary">BETWEENNESS</button>
          </div>
          <button className="flex items-center gap-1 text-amber font-mono text-[0.75rem] hover:brightness-125 focus:outline-none">
            <Play size={14} fill="currentColor" /> PLAYBACK
          </button>
          <button className="border border-border text-text-primary font-sans text-[0.7rem] px-3 py-1 rounded-[3px] uppercase tracking-wider hover:border-text-muted focus:outline-none">EXPORT SVG</button>
          <Link to={`/case/${id || 'CC-2026-0042'}`} className="text-text-muted font-sans text-[0.75rem] hover:text-text-primary">← BACK TO CASE</Link>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex-1 flex relative">
        {/* Graph background grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Cytoscape Container */}
        <div ref={cyRef} className="absolute inset-0 z-0" />

        {/* Left Legend Panel */}
        <div className="absolute left-4 top-4 w-[180px] bg-surface/90 border border-border rounded-[3px] p-3 z-10 shadow-lg backdrop-blur-sm">
          <h3 className="font-sans font-semibold text-[0.75rem] text-text-primary mb-3">COMMUNITIES</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#C8870A]" /><span className="font-sans text-[0.7rem] text-text-muted">Cluster A — 4 accounts</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" /><span className="font-sans text-[0.7rem] text-text-muted">Cluster B — 2 accounts</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#0D7F7A]" /><span className="font-sans text-[0.7rem] text-text-muted">Cluster C — 1 account</span></div>
          </div>
          
          <h3 className="font-sans font-semibold text-[0.75rem] text-text-primary mb-3">RISK SCORE</h3>
          <div className="h-2 w-full bg-gradient-to-r from-risk-clean via-amber to-risk-high rounded-full mb-1" />
          <div className="flex justify-between font-mono text-[0.65rem] text-text-muted">
            <span>0</span><span>100</span>
          </div>
        </div>

        {/* Right Detail Panel (Slides in) */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[320px] bg-surface border-l border-border z-10 shadow-2xl transition-transform duration-200 ease-out flex flex-col ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {selectedNode && (
            <>
              <div className="p-5 border-b border-border shrink-0">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.cluster }} />
                  <span className="font-mono text-[0.8rem] text-text-primary">{selectedNode.bank} · {selectedNode.label.split('......')[1]}</span>
                </div>
                
                <h4 className="font-sans font-medium text-[1rem] text-text-primary mb-1 tracking-wide">RAJESH K SHARMA</h4>
                <p className="font-sans text-[0.75rem] text-text-muted uppercase tracking-wider mb-6">INDIVIDUAL</p>
                
                <div className="flex justify-center mb-6">
                  <RiskScoreRing score={selectedNode.risk} size="md" />
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="font-sans text-[0.8rem] text-text-muted">Inflow:</span>
                    <span className="font-mono text-[0.9rem] text-risk-clean">₹2.34 Cr</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-sans text-[0.8rem] text-text-muted">Outflow:</span>
                    <span className="font-mono text-[0.9rem] text-risk-high">₹2.18 Cr</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-sans text-[0.8rem] text-text-muted">Flags:</span>
                    <span className="font-mono text-[0.9rem] text-text-primary">{selectedNode.risk > 80 ? '4 (2 HIGH)' : '0'}</span>
                  </div>
                </div>

                <button className="w-full border border-amber text-amber font-sans text-[0.75rem] uppercase tracking-wider py-2 hover:bg-amber-glow transition-all flex items-center justify-center gap-2">
                  VIEW IN CASE WORKSPACE <span className="font-mono">→</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <h4 className="t-subhead text-text-muted mb-3">TOP COUNTERPARTIES</h4>
                {/* List placeholder */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-void p-2 border border-border">
                    <span className="font-mono text-[0.75rem] text-text-primary">AXIS··6671</span>
                    <span className="font-mono text-[0.75rem] text-risk-high">₹48.2L</span>
                  </div>
                  <div className="flex justify-between items-center bg-void p-2 border border-border">
                    <span className="font-mono text-[0.75rem] text-text-primary">SBI··9204</span>
                    <span className="font-mono text-[0.75rem] text-risk-clean">₹12.5L</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Temporal Scrubber */}
      <div className="h-16 bg-surface border-t border-border shrink-0 z-20 flex flex-col justify-center px-4 relative">
         <div className="absolute inset-y-0 left-0 right-0 flex items-end opacity-20 pointer-events-none px-4 pb-2 gap-0.5">
           {/* Mini bar chart */}
           {Array.from({length: 100}).map((_, i) => (
             <div key={i} className="flex-1 bg-amber" style={{ height: `${Math.random() * 100}%` }} />
           ))}
         </div>
         <div className="w-full h-1 bg-border rounded-full relative z-10">
           <div className="absolute inset-y-0 left-0 bg-amber" style={{ width: '60%' }} />
           <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-[2px] h-6 bg-amber shadow-[0_0_8px_var(--amber)]" />
         </div>
         <div className="flex justify-between items-center mt-2 z-10">
           <span className="font-mono text-[0.65rem] text-text-muted">01 Jan 2026</span>
           <span className="font-mono text-[0.75rem] text-amber font-bold absolute left-[60%] -translate-x-1/2">14 Jun 2026</span>
           <span className="font-mono text-[0.65rem] text-text-muted">14 Jun 2026</span>
         </div>
      </div>
    </div>
  );
};

export default FundFlowGraph;
