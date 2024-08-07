"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Small Business Owner",
    content:
      "Ezpay has revolutionized how I handle payments for my boutique. It's incredibly user-friendly and has saved me countless hours on bookkeeping.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mark Thompson",
    role: "Freelance Designer",
    content:
      "As a freelancer, getting paid on time was always a hassle. With Ezpay, I can easily send invoices and receive payments from clients worldwide. It's a game-changer!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Lee",
    role: "E-commerce Manager",
    content:
      "Integrating Ezpay into our online store was seamless. Our customers love the smooth checkout process, and we've seen a significant decrease in cart abandonment.",
    rating: 4,
  },
];

const TestimonialCard = ({ testimonial }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
        />
      ))}
    </div>
    <p className="text-gray-600 mb-4">{testimonial.content}</p>
    <div className="font-semibold">{testimonial.name}</div>
    <div className="text-sm text-gray-500">{testimonial.role}</div>
  </div>
);

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="bg-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">
          What Our Customers Say
        </h2>
        <div className="relative">
          <div className="flex justify-center">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors">
            <ChevronLeft className="h-6 w-6 text-indigo-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors">
            <ChevronRight className="h-6 w-6 text-indigo-600" />
          </button>
        </div>
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentIndex ? "bg-indigo-600" : "bg-indigo-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
