import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
}