"use client";

import React from "react";
import { Button } from "./button";
import { User, LogIn, LogOut } from "lucide-react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar: React.FC<AppbarProps> = ({
  user,
  onSignin,
  onSignout,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md ">
      <div className="max-w-8xl  px-4 sm:px-6 lg:px-8 mx-10 ">
        <div className="flex justify-between items-center  h-16">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="sr-only">EZpay</span>
              <div className="text-4xl font-extrabold">
                <span className="text-indigo-600">EZ</span>
                <span className="text-gray-800">pay</span>
              </div>
            </a>
          </div>

          <div className="flex items-center  space-x-4 ">
            <div className="hidden md:flex items-center  text-lg font-semibold text-gray-700">
              <User className="h-5 w-5 text-indigo-500 mr-2" />
              <span>{user ? `Welcome, ${user.name}` : "Welcome, Guest"}</span>
            </div>
            <Button
              onClick={user ? onSignout : onSignin}
              disabled={false}
              aria-label={user ? "Logout" : "Login"}>
              {user ? (
                <>
                  <div className="flex flex-row">
                    <LogOut className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Login</span>
                  </div>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
