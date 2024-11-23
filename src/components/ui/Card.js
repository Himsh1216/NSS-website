// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-md shadow-md overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);
