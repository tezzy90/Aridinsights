import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = ''
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 ${alignClass} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-heading dark:text-white tracking-tight transition-colors duration-300">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-brand-text/80 dark:text-slate-300 leading-relaxed transition-colors duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};