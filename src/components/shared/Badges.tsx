import React from 'react';
import { truncateAccount } from '../../utils/formatters';

interface ChannelBadgeProps {
  channel: 'UPI' | 'NEFT' | 'RTGS' | 'IMPS' | 'ATM' | 'POS' | 'CHQ' | 'INT' | 'UNK';
}

const getChannelColor = (channel: string) => {
  switch (channel) {
    case 'UPI': return { bg: 'rgba(15, 118, 110, 0.15)', text: 'var(--ch-upi)' };
    case 'NEFT': return { bg: 'rgba(29, 78, 216, 0.15)', text: 'var(--ch-neft)' };
    case 'RTGS': return { bg: 'rgba(109, 40, 217, 0.15)', text: 'var(--ch-rtgs)' };
    case 'IMPS': return { bg: 'rgba(212, 134, 10, 0.15)', text: 'var(--ch-imps)' };
    case 'ATM': return { bg: 'rgba(185, 28, 28, 0.15)', text: 'var(--ch-atm)' };
    case 'CHQ': return { bg: 'rgba(75, 85, 99, 0.15)', text: 'var(--ch-chq)' };
    default: return { bg: 'rgba(75, 85, 99, 0.15)', text: 'var(--text-muted)' };
  }
};

export const ChannelBadge: React.FC<ChannelBadgeProps> = ({ channel }) => {
  const { bg, text } = getChannelColor(channel);
  return (
    <span
      className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] font-mono text-[0.7rem] uppercase whitespace-nowrap"
      style={{ backgroundColor: bg, color: text }}
    >
      {channel}
    </span>
  );
};

interface FlagTypeBadgeProps {
  type: 'HIGH' | 'MEDIUM' | 'LOW' | 'SUPPRESSED';
}

const getFlagStyles = (type: string) => {
  switch (type) {
    case 'HIGH': return 'border-[var(--risk-high)] text-[var(--risk-high)]';
    case 'MEDIUM': return 'border-[var(--amber)] text-[var(--amber)]';
    case 'LOW': return 'border-[var(--risk-low)] text-[var(--risk-low)]';
    case 'SUPPRESSED': return 'border-gray-500 text-gray-500';
    default: return 'border-[var(--border)] text-[var(--text-muted)]';
  }
};

export const FlagTypeBadge: React.FC<FlagTypeBadgeProps> = ({ type }) => {
  const styles = getFlagStyles(type);
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[3px] border font-mono text-[0.7rem] uppercase bg-transparent ${styles}`}
    >
      {type}
    </span>
  );
};

interface TriageLevelDotProps {
  level: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const TriageLevelDot: React.FC<TriageLevelDotProps> = ({ level }) => {
  const segments = 5;
  const filled = level === 'HIGH' ? 4 : level === 'MEDIUM' ? 2 : 1;
  const color = level === 'HIGH' ? 'var(--risk-high)' : level === 'MEDIUM' ? 'var(--amber)' : 'var(--risk-low)';

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="w-[4px] h-[14px]"
          style={{ backgroundColor: i < filled ? color : 'var(--border)' }}
        />
      ))}
    </div>
  );
};
