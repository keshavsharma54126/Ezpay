// Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

export function Loader(): JSX.Element {
    return (
        <div className="flex justify-center items-center bg-gray-50">
            <div className="flex flex-col items-center">
                <ClipLoader size={30} color={"#4A90E2"} loading={true} />
                <p className="text-indigo-600 text-lg font-semibold mt-4">Loading...</p>
            </div>
        </div>
    );
}