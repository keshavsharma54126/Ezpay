"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dashboard from "../public/dashboard.png";
import transfer from "../public/transfer.png";
import transactions from "../public/transactions.png";
import p2p from "../public/p2p.png";

export default function Features() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-900 to-teal-800 pt-16 pb-32 space-y-24">
      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <motion.div
            className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0"
            variants={fadeInUp}>
            <div>
              <div>
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-8 w-8 text-white">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </motion.span>
              </div>
              <div className="mt-6">
                <motion.h2
                  className="text-3xl font-bold tracking-tight text-white"
                  variants={fadeInUp}>
                  Secured Payments:
                </motion.h2>
                <motion.p
                  className="mt-4 text-lg text-gray-300"
                  variants={fadeInUp}>
                  ezPay utilizes advanced security algorithms to ensure that all
                  transactions are safe and secure.
                </motion.p>
                <motion.div className="mt-6" variants={fadeInUp}>
                  <motion.a
                    className="inline-flex rounded-lg bg-teal-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-teal-600 hover:bg-teal-700 hover:ring-teal-700 transition-colors duration-300"
                    href="/api/auth/signin"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Learn More
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mt-12 sm:mt-16 lg:mt-0" variants={fadeInUp}>
            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}>
                <Image
                  width={1000}
                  height={800}
                  src={transactions}
                  className="max-w-2xl shadow-lg rounded-md mt-10"
                  alt="Secured Payments"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <motion.div
            className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2"
            variants={fadeInUp}>
            <div className="ml-24">
              <div>
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-8 w-8 text-white">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </motion.span>
              </div>
              <div className="mt-6">
                <motion.h2
                  className="text-3xl font-bold tracking-tight text-white"
                  variants={fadeInUp}>
                  Peer-to-Peer Transfers:
                </motion.h2>
                <motion.p
                  className="mt-4 text-lg text-gray-300"
                  variants={fadeInUp}>
                  With ezPay, you can easily send money to friends and family
                  with just a few clicks.
                </motion.p>
                <motion.div className="mt-6" variants={fadeInUp}>
                  <motion.a
                    className="inline-flex rounded-lg bg-teal-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-teal-600 hover:bg-teal-700 hover:ring-teal-700 transition-colors duration-300"
                    href="/api/auth/signin"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Learn More
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mt-12 sm:mt-16 lg:mt-0" variants={fadeInUp}>
            <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}>
                <Image
                  width={1000}
                  height={800}
                  src={transfer}
                  className="max-w-2xl shadow-lg rounded-md mt-10"
                  alt="Peer-to-Peer Transfers"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <motion.div
            className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0"
            variants={fadeInUp}>
            <div>
              <div>
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-8 w-8 text-white">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </motion.span>
              </div>
              <div className="mt-6">
                <motion.h2
                  className="text-3xl font-bold tracking-tight text-white"
                  variants={fadeInUp}>
                  Advanced Analytics:
                </motion.h2>
                <motion.p
                  className="mt-4 text-lg text-gray-300"
                  variants={fadeInUp}>
                  ezPay provides in-depth insights and analytics to help you
                  manage your finances better.
                </motion.p>
                <motion.div className="mt-6" variants={fadeInUp}>
                  <motion.a
                    className="inline-flex rounded-lg bg-teal-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-teal-600 hover:bg-teal-700 hover:ring-teal-700 transition-colors duration-300"
                    href="/api/auth/signin"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Learn More
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mt-12 sm:mt-16 lg:mt-0" variants={fadeInUp}>
            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}>
                <Image
                  width={1000}
                  height={800}
                  src={dashboard}
                  className="max-w-2xl shadow-lg rounded-md mt-10"
                  alt="Advanced Analytics"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
