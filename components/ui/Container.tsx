import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-6xl mx-auto px-6 py-16 md:py-24 ${className}`}>
      {children}
    </div>
  );
};