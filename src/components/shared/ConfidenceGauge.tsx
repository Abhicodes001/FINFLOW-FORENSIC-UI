import React from 'react';

interface ConfidenceGaugeProps {
  confidence: number; // 0.0 to 1.0
  className?: string;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ confidence, className = '' }) => {
  const radius = 14;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  
  // 280 degrees out of 360 = 280 / 360 * circumference
  const arcLength = (280 / 360) * circumference;
  const dashoffset = circumference - arcLength;
  
  const fillPercentage = Math.max(0, Math.min(1, confidence));
  const fillLength = fillPercentage * arcLength;
  const fillDasharray = `${fillLength} ${circumference}`;

  // Determine color based on confidence
  let color = 'var(--risk-clean)'; // < 0.45 green
  if (confidence >= 0.45 && confidence <= 0.85) {
    color = 'var(--amber)'; // amber
  } else if (confidence > 0.85) {
    color = 'var(--risk-high)'; // red
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: 32, height: 32 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ transform: 'rotate(130deg)' }}>
        {/* Background track */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Fill track */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={fillDasharray}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Center number */}
      <span className="absolute text-[10px] font-mono font-medium text-text-primary" style={{ transform: 'translateY(1px)' }}>
        {Math.round(confidence * 100)}
      </span>
    </div>
  );
};
