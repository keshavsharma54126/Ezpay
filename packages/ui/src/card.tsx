import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

export const Card = ({ title, children }: CardProps): JSX.Element => {
  return (
    <div className="border p-6 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <h1 className="text-2xl font-bold text-indigo-600 border-b pb-4 mb-4">
        {title}
      </h1>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};
