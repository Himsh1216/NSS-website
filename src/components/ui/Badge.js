// src/components/ui/badge.js
import React from 'react';

export const Badge = React.forwardRef(({ className = '', children, variant }, ref) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variantStyles = {
    default: 'bg-white/90 text-blue-600 backdrop-blur-sm',
    secondary: 'bg-black/50 backdrop-blur-sm text-white',
    outline: 'border border-gray-200 text-gray-900',
    destructive: 'bg-red-500/90 backdrop-blur-sm text-white'
  };

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${variant ? variantStyles[variant] : variantStyles.default} ${className}`}
    >
      {children}
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;