"use client";

import React from "react";

interface TextInputProps {
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
  label: string;
}

export const TextInput = ({ placeholder, onChange, disabled, label }: TextInputProps): JSX.Element => {
  return (
    <div className="pt-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className={`bg-gray-50 border border-indigo-500 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-600 block w-full p-2.5 transition duration-150 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
      />
    </div>
  );
};
