"use client";

import DomainCard from "@/components/home/DomainCard";
import ProgressStats from "@/components/home/ProgressStats";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-babel-bg">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-babel-science/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-babel-humanities/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl font-black text-babel-text tracking-tight mb-4">
            BABEL
          </h1>
          <p className="text-lg sm:text-xl text-babel-text-secondary max-w-md mx-auto font-light">
            Build your tower of knowledge, one discovery at a time.
          </p>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="pb-12 px-4">
        <ProgressStats />
      </section>

      {/* Domain Cards */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <DomainCard domain="sciences" />
          <DomainCard domain="humanities" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-babel-border py-6 text-center">
        <p className="text-xs text-babel-text-secondary">
          Babel — A Knowledge Technology Tree
        </p>
      </footer>
    </main>
  );
}
