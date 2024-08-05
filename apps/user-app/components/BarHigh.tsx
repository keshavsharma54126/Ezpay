"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../packages/ui/@/components/ui/chart";

const chartData = [
  { month: "January", sent: 186, revieved: 80 },
  { month: "February", sent: 305, revieved: 200 },
  { month: "March", sent: 237, revieved: 120 },
  { month: "April", sent: 73, revieved: 190 },
  { month: "May", sent: 209, revieved: 130 },
  { month: "June", sent: 214, revieved: 140 },
];

const chartConfig = {
  sent: {
    label: "sent",
    color: "#2563eb",
  },
  revieved: {
    label: "revieved",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function BarHigh() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
        <Bar dataKey="revieved" fill="var(--color-revieved)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
