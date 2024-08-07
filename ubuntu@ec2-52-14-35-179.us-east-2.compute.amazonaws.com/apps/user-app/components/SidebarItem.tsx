"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex items-center cursor-pointer p-3 pl-8 rounded-lg transition duration-200 ease-in-out ${
        selected ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100"
      }`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-3">
        {icon}
      </div>
      <div className={`font-bold ${selected ? "text-indigo-600" : "text-gray-500"}`}>
        {title}
      </div>
    </div>
  );
};
