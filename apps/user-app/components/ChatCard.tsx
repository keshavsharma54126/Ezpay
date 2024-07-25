"use client";

import { Card } from "@repo/ui/card";
import { Input } from "../../../packages/ui/@/components/ui/input";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useSession } from "next-auth/react";

interface User {
    id: number;
    email: string | null;
    name: string | null;
    number: string;
    password: string;
}

export function ChatCard() {
    const [phoneInput, setPhoneInput] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { data: session } = useSession();

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPhoneInput(e.target.value);
    }

    async function handleSearch() {
        if (!session) {
            setError("User not authenticated");
            return;
        }

        try {
            const res = await fetch('/api/search-people', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number: phoneInput })
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data);
                setError(null);
            } else {
                setUser(null);
                setError(data.message);
            }
        } catch (err) {
            setUser(null);
            setError("An unexpected error occurred");
        }
    }

    return (
        <div>
            <Card title="Recent Conversations">
                <div>
                    <div className="text-indigo-500 text-xl mb-2">Find People</div>
                       <div className="flex flex-row gap-2">
                            <Input
                                    type="text"
                                    placeholder="Search by Phone Number"
                                    value={phoneInput}
                                    onChange={handleInput}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <Button disabled={false} onClick={handleSearch}>Search</Button>
                       </div>
                </div>
                {user && (
                    <div className="flex flex-row justify-between my-4 p-3 border border-indigo-500 shadow-lg">
                        <div className="text-indigo-600 my-1 mx-2">
                            {user.name}
                        </div>
                        <div>
                            <Button disabled={false} onClick={()=>{console.log('hello world')}}>Add</Button>
                        </div>
                    </div>
                )}
                {error && <div>{error}</div>}
            </Card>
        </div>
    );
}
