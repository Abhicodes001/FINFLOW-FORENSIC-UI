import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const mockData = [
  { date: '01 Jun', credit: -20, debit: 10, flags: 0 },
  { date: '03 Jun', credit: -15, debit: 35, flags: 0 },
  { date: '05 Jun', credit: -40, debit: 5, flags: 0 },
  { date: '08 Jun', credit: -9.75, debit: 0, flags: 1 },
  { date: '11 Jun', credit: -9.6, debit: 0, flags: 1 },
  { date: '13 Jun', credit: -92, debit: 12.5, flags: 2 },
  { date: '14 Jun', credit: -9.8, debit: 4.8, flags: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const flags = payload[0].payload.flags;
    return (
      <div className="bg-elevated border border-border p-3 shadow-lg">
        <p className="font-mono text-[0.8rem] text-text-primary mb-2">{label}</p>
        <div className="flex justify-between gap-4 mb-1">
          <span className="font-sans text-[0.7rem] text-text-muted">CREDIT:</span>
          <span className="font-mono text-[0.8rem] text-risk-clean">₹{Math.abs(payload[0].value).toFixed(2)}L</span>
        </div>
        <div className="flex justify-between gap-4 mb-1">
          <span className="font-sans text-[0.7rem] text-text-muted">DEBIT:</span>
          <span className="font-mono text-[0.8rem] text-risk-high">₹{payload[1]?.value?.toFixed(2) || '0.00'}L</span>
        </div>
        <div className="flex justify-between gap-4 mt-2 pt-2 border-t border-border-dim">
          <span className="font-sans text-[0.7rem] text-text-muted">FLAGS:</span>
          <span className={`font-mono text-[0.8rem] ${flags > 0 ? 'text-amber' : 'text-text-primary'}`}>{flags}</span>
        </div>
      </div>
    );
  }
  return null;
};

const TimelineTab: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-void relative">
      <div className="absolute inset-0 bg-gradient-to-t from-amber/5 to-transparent pointer-events-none opacity-50" />
      
      <div className="flex-1 p-6 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} stackOffset="sign" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="date" 
              stroke="var(--border-dim)" 
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: '"IBM Plex Mono", monospace' }} 
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis 
              stroke="var(--border-dim)"
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: '"IBM Plex Mono", monospace' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `₹${Math.abs(val)}L`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-elevated)', opacity: 0.5 }} />
            <ReferenceLine y={0} stroke="var(--border)" />
            
            {/* Draw flag markers manually or via custom shape if possible, here simplified using ReferenceLines for flagged dates */}
            <ReferenceLine x="08 Jun" stroke="var(--amber)" strokeDasharray="3 3" />
            <ReferenceLine x="11 Jun" stroke="var(--amber)" strokeDasharray="3 3" />
            <ReferenceLine x="13 Jun" stroke="var(--amber)" strokeDasharray="3 3" />
            <ReferenceLine x="14 Jun" stroke="var(--amber)" strokeDasharray="3 3" />
            
            <Bar dataKey="credit" fill="var(--risk-clean)" stackId="stack" isAnimationActive={false} />
            <Bar dataKey="debit" fill="var(--risk-high)" stackId="stack" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Temporal Scrubber Placeholder */}
      <div className="h-16 border-t border-border bg-surface shrink-0 p-4 flex items-center justify-center">
         <span className="font-mono text-[0.7rem] text-text-muted">[ Draggable Range Selector Component ]</span>
      </div>
    </div>
  );
};

export default TimelineTab;
