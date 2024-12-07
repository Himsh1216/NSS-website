// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-100 bg-gray-50/50 ${className}`}>
    {children}
  </div>
);

export const CardImage = ({ src, alt, className = '' }) => (
  <div className="relative aspect-video overflow-hidden">
    <img 
      src={src} 
      alt={alt} 
      className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ${className}`}
    />
  </div>
);

export const CardBadge = ({ children, className = '' }) => (
  <div className={`absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium ${className}`}>
    {children}
  </div>
);

export const CardCategory = ({ children, className = '' }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 ${className}`}>
    {children}
  </span>
);