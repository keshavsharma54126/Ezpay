"use client";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useEffect, useState } from "react";

type TransactionType = "sent" | "received" | "bank transfer";

interface Transaction {
  id: number;
  timestamp: Date;
  amount: number;
  type: TransactionType;
  status?: string;
  provider?: string;
  toUserId?: number;
  fromUserId?: number;
}

export function TotalTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [sortBy, setSortBy] = useState("today");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  function handleSelection(value: string) {
    setSortBy(value);
  }

  const sortType = [
    { key: "today", value: "Today" },
    { key: "lastMonth", value: "Last Month" },
    { key: "last6Months", value: "Last 6 Months" },
    { key: "lastYear", value: "Last Year" },
  ];

  const filterTransactions = (transactions: Transaction[], sortBy: string) => {
    const today = new Date();

    if (sortBy === "today") {
      return transactions.filter((t) => {
        const transactionDate = new Date(t.timestamp);
        return (
          transactionDate.getDate() === today.getDate() &&
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      });
    }
    if (sortBy === "lastMonth") {
      return transactions.filter((t) => {
        const transactionDate = new Date(t.timestamp);
        const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
        const lastMonthYear =
          today.getMonth() === 0
            ? today.getFullYear() - 1
            : today.getFullYear();
        return (
          transactionDate.getMonth() === lastMonth ||
          (transactionDate.getMonth() &&
            transactionDate.getFullYear() === lastMonthYear)
        );
      });
    }
    if (sortBy === "last6Months") {
      return transactions.filter((t) => {
        const transactionDate = new Date(t.timestamp);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return transactionDate >= sixMonthsAgo;
      });
    }
    if (sortBy === "lastYear") {
      return transactions.filter((t) => {
        const transactionDate = new Date(t.timestamp);
        const lastYear = today.getFullYear() - 1;
        return transactionDate.getFullYear() === lastYear;
      });
    }

    return transactions;
  };

  useEffect(() => {
    const filtered = filterTransactions(transactions, sortBy);
    setFilteredTransactions(filtered);
  }, [sortBy, transactions]);

  if (!filteredTransactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="flex flex-row justify-between">
          <div>Sort by</div>
          <Select onSelect={handleSelection} options={sortType} />
        </div>
        <div className="text-center py-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Card title="Recent Transactions">
        <div className="flex flex-row justify-between">
          <div>Sort by</div>
          <Select onSelect={handleSelection} options={sortType} />
        </div>
        <div className="pt-2 space-y-4">
          {filteredTransactions.map((t: Transaction) => (
            <div
              key={t.id}
              className="flex justify-between items-center gap-20 lg:gap-26 p-2 hover:bg-gray-50">
              <div>
                <div className="text-sm font-medium">
                  {t.type === "sent"
                    ? "Sent"
                    : t.type === "received"
                      ? "Received"
                      : "Bank Transfer"}{" "}
                  INR
                </div>
                <div className="text-slate-600 text-xs">
                  {t.timestamp.toLocaleString()}
                </div>
              </div>
              <div className="text-lg font-semibold flex flex-row gap-1">
                <div>Rs</div>
                <div>{(t.amount / 100).toFixed(2)}</div>
              </div>
              <div
                className={`text-sm font-medium ${
                  t.status === "Processing"
                    ? "text-yellow-500"
                    : t.status === "Failure"
                      ? "text-red-500"
                      : "text-green-500"
                }`}>
                {t.status ||
                  (t.type === "bank transfer" ? "Completed" : "Success")}
              </div>
              <div className="flex justify-center">
                {t.provider || t.toUserId}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
