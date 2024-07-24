"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}

export const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition duration-150 ease-in-out`}
    >
      {children}
    </button>
  );
};
