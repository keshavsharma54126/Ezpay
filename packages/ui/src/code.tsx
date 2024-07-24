import React from 'react';

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className = '' }: CodeProps): JSX.Element {
  return (
    <code
      className={`bg-gray-100 text-red-600 font-mono p-2 rounded-lg shadow-inner ${className}`}
    >
      {children}
    </code>
  );
}