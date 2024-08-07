"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
//@ts-ignore
import {Loader} from "@repo/ui/Loader"

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading,setLoading] = useState(false)

    const handleSend = async () => {
        setMessage("")
        if (!number || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setMessage("Please enter valid number and amount");
            return;
        }
        setLoading(true)
        const result = await p2pTransfer(number, Number(amount) * 100);
        setMessage(result.message);
        setLoading(false)
        setAmount("")
    };

    return (

                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            disabled={loading}
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            disabled={loading}
                            onChange={(value) => setAmount(value)}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button disabled={loading} onClick={handleSend}>Send</Button>
                        </div>
                        <div>
                            {loading && <Loader/>}
                            <div className="flex justify-center items-center">
                                {(message==="Payment successfull")?<div className="text-green-600 ">{message}</div>:<div className="text-red-600">{message}</div>}
                            </div>
                        </div>
                    </div>
                </Card>

    );
}
