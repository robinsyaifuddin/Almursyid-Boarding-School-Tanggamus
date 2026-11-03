import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  lineClassName = 'bg-emerald-600',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
        {children}
      </span>
      <span className={`h-[2px] w-14 sm:w-16 block rounded-full shrink-0 ${lineClassName}`}></span>
    </div>
  );
};
