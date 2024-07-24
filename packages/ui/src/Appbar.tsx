"use client";

import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    };
    onSignin: () => void;
    onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
    return (
        <div className="flex justify-between items-center border-b px-6 py-4 border-gray-300 bg-white shadow-md">
            <div className="text-4xl font-bold text-indigo-600">
                EZpay
            </div>
            <div className="flex items-center gap-6">
                <div className="text-lg font-semibold text-gray-700">
                    Welcome, {user?.name || "Guest"}
                </div>
                <Button 
                    onClick={user ? onSignout : onSignin}
                    disabled={false}
                    aria-label={user ? "Logout" : "Login"}
                >
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
};