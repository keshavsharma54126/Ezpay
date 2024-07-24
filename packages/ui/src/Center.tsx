import React from "react";

interface CenterProps {
  children: React.ReactNode;
}

export const Center = ({ children }: CenterProps): JSX.Element => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center items-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        {children}
      </div>
    </div>
  );
};