import { OnRampTransactions } from "./../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { message: "User not signed in" },
      { status: 500 }
    );
  }
  const id = Number(session.user.id);
  try {
    const sixmonthsAgo = new Date();
    sixmonthsAgo.setMonth(sixmonthsAgo.getMonth() - 6);
    const addedOnRamp = await db.onRampTransaction.findMany({
      where: {
        userId: id,
        type: "Added",
        startTime: {
          gte: sixmonthsAgo,
        },
      },
      select: {
        startTime: true,
        amount: true,
      },
    });
    const withdrawOnRamp = await db.onRampTransaction.findMany({
      where: {
        userId: id,
        type: "Withdrawn",
        startTime: {
          gte: sixmonthsAgo,
        },
      },
      select: {
        startTime: true,
        amount: true,
      },
    });
    const p2psent = await db.p2pTransfer.findMany({
      where: {
        fromUserId: id,
      },
      select: {
        amount: true,
        timestamp: true,
      },
    });
    const p2precieved = await db.p2pTransfer.findMany({
      where: {
        toUserId: id,
      },
      select: {
        amount: true,
        timestamp: true,
      },
    });

    const Transactions = {
      sent: [
        ...withdrawOnRamp,
        ...p2psent.map((t) => ({ ...t, startTime: t.timestamp })),
      ],
      received: [
        ...addedOnRamp,
        ...p2precieved.map((t) => ({ ...t, startTime: t.timestamp })),
      ],
    };

    const aggregatedData = aggregateDataByMonth(Transactions);
    return NextResponse.json({ aggregatedData }, { status: 200 });
  } catch (e) {
    console.error("error while getting details", e);
    return NextResponse.json(
      { message: "error while getting details" },
      { status: 400 }
    );
  }
  function aggregateDataByMonth(transactions: {
    sent: any[];
    received: any[];
  }) {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const month = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        now.getDay()
      );
      const monthString = month.toLocaleString("default", { month: "long" });

      const sent = transactions.sent
        .filter((transaction) => {
          const date = new Date(transaction.startTime);
          return (
            date.getMonth() === month.getMonth() &&
            date.getFullYear() === month.getFullYear()
          );
        })
        .reduce((sum, transaction) => sum + transaction.amount / 100, 0);

      const received = transactions.received
        .filter((transaction) => {
          const date = new Date(transaction.startTime);
          return (
            date.getMonth() === month.getMonth() &&
            date.getFullYear() === month.getFullYear()
          );
        })
        .reduce((sum, transaction) => sum + transaction.amount / 100, 0);

      data.push({ month: monthString, sent, received });
    }
    return data.reverse(); // To return in chronological order
  }
}
