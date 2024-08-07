import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div
      className="
      bg-white 
      rounded-xl 
      overflow-hidden
      border border-gray-200
      shadow-md 
      transition-all duration-300 ease-in-out
      hover:shadow-xl hover:border-indigo-300
      transform hover:-translate-y-1
    ">
      <div className="px-6 py-4">
        <h2
          className="
          text-2xl 
          font-bold 
          text-indigo-600 
          mb-4
          pb-2
          border-b border-gray-200
        ">
          {title}
        </h2>
        <div className="text-gray-700 space-y-2">{children}</div>
      </div>
    </div>
  );
};
