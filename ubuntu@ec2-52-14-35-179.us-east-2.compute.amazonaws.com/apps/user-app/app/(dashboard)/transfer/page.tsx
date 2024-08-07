import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Suspense, useEffect } from "react";
import Loading from "../../../components/Loading";

interface OnRampTransaction {
  id: number;
  status: string;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
}

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t: OnRampTransaction) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
    //@ts-ignore
    type: t.type,
  }));
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-full">
      <div className="text-4xl text-indigo-600 pt-8 mb-8 font-bold flex justify-center">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <Suspense fallback={<Loading />}>
          <div>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <div className="pt-4">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
