"use client";

import React from 'react';

interface SelectProps {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}

export const Select = ({ options, onSelect }: SelectProps): JSX.Element => {
  return (
    <div className="relative inline-block w-full">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="bg-white border border-indigo-500 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 shadow-sm transition duration-150 ease-in-out"
      >
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};
