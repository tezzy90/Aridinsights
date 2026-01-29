import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer text-center no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-900";
  
  const variantStyles = {
    primary: "bg-brand-dark text-white hover:bg-[#092d40] dark:bg-brand-primary dark:hover:bg-brand-primary/90 hover:shadow-lg border border-transparent",
    secondary: "bg-white text-brand-dark border border-slate-200 hover:border-brand-dark/30 hover:shadow-md hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-500",
    outline: "bg-transparent text-brand-dark border border-brand-dark/30 hover:bg-brand-dark/5 dark:text-white dark:border-white/30 dark:hover:bg-white/10",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};