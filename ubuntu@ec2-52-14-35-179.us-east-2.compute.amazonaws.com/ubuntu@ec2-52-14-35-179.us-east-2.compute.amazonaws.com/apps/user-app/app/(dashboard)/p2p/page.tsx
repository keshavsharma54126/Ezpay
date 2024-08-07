import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { Suspense } from "react";
import Loading from "../../../components/Loading";

interface txi {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
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
  };
}
async function getp2pTransactoins() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return [];
  }
  const sentTransactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });
  const toTransactions = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });
  const combinedTransactions = [
    ...sentTransactions.map((tx: txi) => ({ ...tx, type: "sent" })),
    ...toTransactions.map((tx: txi) => ({ ...tx, type: "recieved" })),
  ];

  const sortedTransactions = combinedTransactions.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const top5transactions = sortedTransactions.slice(0, 5);
  return top5transactions;
}

export default async function () {
  const balance = (await getBalance()).amount;
  const p2pTransactoins = await getp2pTransactoins();

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full">
        <div className="flex items-center flex-col ">
          <div className="text-4xl text-indigo-600 pt-8 font-bold ">
            P2P Transfer
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="pt-24">
              <SendCard />
            </div>
            <div className="pt-24">
              <P2pTransactions
                balance={balance}
                transactions={p2pTransactoins}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
