
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import {BarHigh} from "../../../components/BarHigh"
import { Card } from "@repo/ui/card";
import { ChatCard } from "../../../components/ChatCard";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Unauthenticated request");
    }
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}

export default async function Dashboard() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    const session = await getServerSession(authOptions);
    if(!session){
        return <div>please login to view dashboard</div>
    }
   
    return (
        <div className="min-h-screen flex flex-col items-center">
            <header className="bg-white w-full shadow-md py-6">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-semibold text-indigo-600">Hi {(session?.user?.name).toUpperCase()}, Welcome to your dashboard</h1>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8 flex flex-col justify-center gap-6 lg:flex-row w-4xl">
                <div className="w-full flex flex-col gap-6">
                    <Card title="Account Finances">
                        <div>
                            <div className="text-indigo-600 text-xl font-semibold flex flex-row md:flex-col gap-2 justify-around">
                                <div>
                                    Current Balance: Rs {balance.amount}
                                </div>
                                <div>
                                    Locked Balance : Rs {balance.locked}
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </Card>
                    <Card title="Last Six months Sent and Recieved Transaction Trend">
                        <div className="bg-white shadow md">
                            <BarHigh/>
                        </div>
                    </Card>
                </div>
                <div className="w-full">
                    <ChatCard/>
                </div>
            </main>
        </div>
    );
}
