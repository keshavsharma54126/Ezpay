"use client";
import React from "react";
import { CreditCard, BarChart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: <CreditCard className="w-12 h-12 text-indigo-600" />,
    title: "Easy Setup",
    description:
      "Create your account and connect your preferred payment methods in just a few clicks.",
  },
  {
    icon: <Zap className="w-12 h-12 text-indigo-600" />,
    title: "Swift Transactions",
    description:
      "Process payments quickly and securely, with real-time confirmation for you and your customers.",
  },
  {
    icon: <BarChart className="w-12 h-12 text-indigo-600" />,
    title: "Insightful Analytics",
    description:
      "Track your business growth with detailed reports and actionable insights on your dashboard.",
  },
];

const StepCard = ({ step, index }: any) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-indigo-100 rounded-full p-4 mb-4">{step.icon}</div>
    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
    <p className="text-gray-600">{step.description}</p>
    {index < steps.length - 1 && (
      <div className="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-indigo-200" />
    )}
  </div>
);

export default function HowItWorksSection() {
  const router = useRouter();
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          How Ezpay Works
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Simple steps to revolutionize your payment process
        </p>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => {
              router.push("/api/auth/signin");
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
