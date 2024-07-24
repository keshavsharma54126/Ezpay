// Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

export function Loader(): any {
    return (
        <div className="flex justify-center items-center">
            <ClipLoader size={35} color={"#123abc"} loading={true} />
        </div>
    );
}
