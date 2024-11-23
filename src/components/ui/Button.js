// src/components/ui/Button.js
import React from 'react';

export const Button = ({ children, onClick, variant = 'default', size = 'md', className }) => {
  const baseStyles = 'px-4 py-2 font-medium rounded-md transition-all';
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  };
  const sizeStyles = {
    sm: 'text-sm py-1 px-3',
    md: 'text-md py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
