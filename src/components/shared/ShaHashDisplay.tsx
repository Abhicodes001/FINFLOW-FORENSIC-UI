import React, { useState } from 'react';
import { Copy } from 'lucide-react';

interface ShaHashDisplayProps {
  hash: string;
  truncate?: boolean;
}

export const ShaHashDisplay: React.FC<ShaHashDisplayProps> = ({ hash, truncate = true }) => {
  const [copied, setCopied] = useState(false);

  const displayHash = truncate 
    ? `${hash.substring(0, 6)}···${hash.substring(hash.length - 4)}` 
    : hash;

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-2 group">
      <span className="font-mono text-[0.65rem] text-amber/60">[sha256]</span>
      <span className="font-mono text-[0.75rem] text-text-muted">{displayHash}</span>
      <button 
        onClick={handleCopy}
        className="text-text-muted hover:text-amber focus:outline-none focus-visible:ring-1 focus-visible:ring-amber relative"
        title="Copy hash"
      >
        <Copy size={12} />
        {copied && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-elevated text-text-primary text-[10px] py-0.5 px-1.5 rounded font-sans whitespace-nowrap border border-border">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
};
