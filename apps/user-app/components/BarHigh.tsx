"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../packages/ui/@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const chartConfig = {
  sent: {
    label: "Sent",
    color: "#2563eb",
  },
  received: {
    label: "Received",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function BarHigh() {
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);
  const { data: session } = useSession();

  const fetchTransactionData = async () => {
    if (!session) {
      console.error("User not authenticated");
      return;
    }

    try {
      const res = await fetch("/api/barchart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setChartData(data.aggregatedData);
        setError("");
      } else {
        setError(data.message || "Failed to fetch data");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (session) {
      fetchTransactionData();
    }
  }, [session]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `Rs{value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sent" fill={chartConfig.sent.color} radius={4} />
        <Bar dataKey="received" fill={chartConfig.received.color} radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
