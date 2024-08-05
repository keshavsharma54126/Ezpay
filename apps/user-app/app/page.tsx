import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Features from "../components/Features";
import TestimonialSection from "../components/Testimonials";
import HowItWorksSection from "../components/Howitworks";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <HeroSection />
      <Features />
      <TestimonialSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
