import React from 'react';

interface RiskScoreRingProps {
  score: number; // 0 to 100
  size?: 'md' | 'lg'; // md = 80px, lg = 140px
  className?: string;
}

export const RiskScoreRing: React.FC<RiskScoreRingProps> = ({ score, size = 'md', className = '' }) => {
  const isLg = size === 'lg';
  const width = isLg ? 140 : 80;
  const radius = (width / 2) - (isLg ? 6 : 4);
  const strokeWidth = isLg ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  
  // 140 degrees arc out of 360? Wait, the requirement says "140° arc".
  // Actually, standard gauges are usually 280 or so, let's use 140 arc? Wait, "circular gauge (140° arc, filled proportionally)". 
  // Maybe it means it starts at -70deg and ends at +70deg?
  // Let's use 240 degrees as it's standard and looks better for a ring.
  const arcDegrees = 240;
  const arcLength = (arcDegrees / 360) * circumference;
  
  const fillPercentage = Math.max(0, Math.min(100, score)) / 100;
  const fillLength = fillPercentage * arcLength;
  
  let color = 'var(--risk-clean)'; // 0-30
  if (score > 30 && score <= 70) {
    color = 'var(--amber)'; // 31-70
  } else if (score > 70) {
    color = 'var(--risk-high)'; // 71-100
  }

  const offsetRotate = 90 + ((360 - arcDegrees) / 2);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width, height: width }}>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} style={{ transform: `rotate(${offsetRotate}deg)` }}>
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${fillLength} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ transform: 'translateY(-5%)' }}>
        <span className="font-mono text-text-primary" style={{ fontSize: isLg ? '2.5rem' : '1.5rem', lineHeight: 1 }}>
          {score}
        </span>
      </div>
    </div>
  );
};
