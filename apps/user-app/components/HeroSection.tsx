"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Users, Zap, Shield } from "lucide-react";
import logo from "../public/image1.png";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);
const MotionA = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.a),
  { ssr: false }
);

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
            <MotionDiv
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-indigo-900 sm:text-5xl lg:text-6xl">
                <span className="block">Ezpay Makes Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Transactions Easy
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Experience seamless payments and financial management with our
                cutting-edge platform.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <MotionA
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/api/auth/signin"
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MotionA>
                <MotionA
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#features"
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                  Learn More
                </MotionA>
              </div>

              <div className="mt-12">
                <p className="text-base font-semibold text-gray-900">
                  Trusted by 10,000+ users worldwide
                </p>
                <div className="mt-4 flex justify-center lg:justify-start">
                  <MotionDiv
                    className="flex -space-x-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                        src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                        alt={`User ${i}`}
                      />
                    ))}
                  </MotionDiv>
                  <MotionDiv
                    className="ml-4 text-sm font-medium text-gray-500 self-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}>
                    Join thousands of satisfied customers
                  </MotionDiv>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative">
              <div className="aspect-w-5 aspect-h-3">
                <Image
                  src={logo}
                  alt="Ezpay Logo"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-2xl shadow-2xl"
                />
              </div>

              <MotionDiv
                className="absolute -bottom-10 -left-10 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}>
                <Users className="h-8 w-8 text-indigo-600" />
                <p className="mt-2 text-sm font-medium text-gray-900">
                  User-friendly
                </p>
              </MotionDiv>

              <MotionDiv
                className="absolute -top-10 -right-10 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <Zap className="h-8 w-8 text-yellow-500" />
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Lightning fast
                </p>
              </MotionDiv>

              <MotionDiv
                className="absolute bottom-20 right-10 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}>
                <Shield className="h-8 w-8 text-green-500" />
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Secure & Safe
                </p>
              </MotionDiv>
            </MotionDiv>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
