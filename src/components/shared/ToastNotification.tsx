import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'info' | 'error' | 'success';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onDismiss: (id: string) => void;
}

const getToastBorderColor = (type: ToastType) => {
  switch (type) {
    case 'info': return 'var(--amber)';
    case 'error': return 'var(--risk-high)';
    case 'success': return 'var(--risk-clean)';
  }
};

export const ToastNotification: React.FC<ToastProps> = ({ id, message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-80 bg-elevated text-text-primary font-sans text-[0.875rem] py-3 px-4 shadow-lg pointer-events-auto"
      style={{ borderLeft: `3px solid ${getToastBorderColor(type)}` }}
    >
      {message}
    </motion.div>
  );
};

// Toast Container context/manager could be implemented here or in a separate provider.
// For now, this component can be rendered in a fixed container.
