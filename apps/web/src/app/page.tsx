"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bell,
  CheckCircle,
  DollarSign,
  PieChart,
  Shield,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "AI-powered insights that predict your spending patterns and optimize your budget automatically",
      color: "from-green-400 to-emerald-600",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Military-grade encryption with biometric authentication keeps your financial data completely secure",
      color: "from-sky-400 to-blue-600",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description:
        "Real-time updates across all your devices with lightning-fast cloud synchronization",
      color: "from-violet-400 to-purple-600",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description:
        "Sleek, intuitive interface designed for seamless money management on the go",
      color: "from-amber-400 to-orange-600",
    },
  ];

  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "$2.5B+", label: "Money Tracked" },
    { value: "4.9★", label: "App Rating" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50/30 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      {/* <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"> */}
      <section className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="-left-1/4 absolute top-1/4 h-96 w-96 animate-pulse rounded-full bg-green-500/10 blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div
            className="-right-1/4 absolute bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-sky-500/10 blur-3xl"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              animationDelay: "1s",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          {/* <div className="mb-6 inline-block">
            <span className="animate-fade-in rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 font-medium text-green-600 text-sm backdrop-blur-sm dark:text-green-400">
              🚀 Now with AI-powered insights
            </span>
          </div> */}

          <h1 className="mb-4 animate-fade-in bg-linear-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text font-bold text-5xl text-transparent leading-tight sm:text-6xl lg:text-7xl dark:from-white dark:via-green-400 dark:to-white">
            Your Money,
            <br />
            <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
              Beautifully Managed
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl animate-fade-in text-slate-600 text-xl leading-relaxed sm:text-2xl dark:text-slate-300">
            Take control of your financial future with intelligent tracking,
            powerful insights, and effortless budgeting.
          </p>

          <div className="mb-12 flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="group hover:-translate-y-1 flex transform items-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-10! py-8 font-semibold text-lg text-white shadow-green-500/30 shadow-lg transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/40 hover:shadow-xl">
              Get Started For Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                className="hover:-translate-y-1 animate-fade-in rounded-2xl border border-slate-200/50 bg-white/60 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/60"
                key={idx}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="mb-1 font-bold text-2xl text-green-600 sm:text-3xl dark:text-green-400">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="-translate-x-1/2 absolute bottom-0 left-1/2 transform animate-bounce">
          <div className="h-10 w-6 rounded-full border-2 border-slate-300 p-1 dark:border-slate-700">
            <div className="mx-auto h-3 w-1.5 animate-pulse rounded-full bg-green-600 dark:bg-green-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl text-slate-900 sm:text-5xl dark:text-white">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 text-xl dark:text-slate-300">
              Powerful features designed to make personal finance simple,
              secure, and smart
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeFeature === idx;

              return (
                <div
                  className={`group hover:-translate-y-2 relative cursor-pointer rounded-3xl border bg-white/80 p-8 backdrop-blur-lg transition-all duration-500 dark:bg-slate-800/80 ${
                    isActive
                      ? "scale-105 border-green-500 shadow-2xl shadow-green-500/20"
                      : "border-slate-200 shadow-lg hover:border-green-400 hover:shadow-xl dark:border-slate-700"
                  }`}
                  key={idx}
                  onMouseEnter={() => setActiveFeature(idx)}
                >
                  <div
                    className={`h-16 w-16 rounded-2xl bg-linear-to-br ${feature.color} mb-6 flex transform items-center justify-center transition-transform duration-300 ${isActive ? "rotate-3 scale-110" : "group-hover:scale-105"}`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mb-3 font-bold text-2xl text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed dark:text-slate-300">
                    {feature.description}
                  </p>

                  {isActive && (
                    <div className="-top-1 -right-1 absolute flex h-6 w-6 animate-ping items-center justify-center rounded-full bg-green-500">
                      <div className="h-4 w-4 rounded-full bg-green-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Feature Showcase */}
      <section className="bg-linear-to-br from-green-50 to-emerald-50 px-4 py-20 sm:px-6 lg:px-8 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-bold text-4xl text-slate-900 sm:text-5xl dark:text-white">
                Track Every Dollar,
                <br />
                <span className="text-green-600 dark:text-green-400">
                  Effortlessly
                </span>
              </h2>
              <p className="mb-8 text-slate-600 text-xl leading-relaxed dark:text-slate-300">
                Visualize your spending with beautiful charts, get instant
                notifications for unusual activity, and watch your savings grow
                in real-time.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: DollarSign,
                    text: "Automatic transaction categorization",
                  },
                  { icon: PieChart, text: "Interactive spending breakdowns" },
                  { icon: Bell, text: "Smart budget alerts and reminders" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div className="group flex items-center gap-4" key={idx}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 transition-colors group-hover:bg-green-500/20">
                        <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-lg text-slate-700 dark:text-slate-300">
                        {item.text}
                      </span>
                      <CheckCircle className="ml-auto h-5 w-5 text-green-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-green-400" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mock App Preview */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
                <div className="absolute top-0 right-0 left-0 h-32 bg-linear-to-br from-green-500 to-emerald-600" />

                <div className="relative z-10">
                  <div className="mb-8 text-center">
                    <p className="mb-2 text-sm text-white/80">Total Balance</p>
                    <h3 className="mb-1 font-bold text-5xl text-white">
                      $12,847.32
                    </h3>
                    <p className="text-sm text-white/70">
                      ↑ $1,234.56 this month
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        label: "Income",
                        amount: "$5,200",
                        color: "bg-green-500",
                        percentage: "85%",
                      },
                      {
                        label: "Expenses",
                        amount: "$3,847",
                        color: "bg-red-500",
                        percentage: "62%",
                      },
                      {
                        label: "Savings",
                        amount: "$1,353",
                        color: "bg-sky-500",
                        percentage: "40%",
                      },
                    ].map((item, idx) => (
                      <div
                        className="animate-fade-in"
                        key={idx}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            {item.label}
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {item.amount}
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: item.percentage }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute right-4 bottom-4 left-4 animate-fade-in rounded-2xl border border-green-500/50 bg-white p-4 shadow-lg dark:bg-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                      <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm dark:text-white">
                        Budget Alert
                      </p>
                      <p className="text-slate-600 text-xs dark:text-slate-400">
                        You're $120 under budget this week! 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-green-600 to-emerald-600 p-12 shadow-2xl shadow-green-500/30 sm:p-16">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="mb-6 font-bold text-4xl text-white sm:text-5xl">
                Ready to Transform Your Finances?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90 text-xl">
                Join thousands of users who've taken control of their money with
                uCash. Start your free 30-day trial today.
              </p>
              <button className="hover:-translate-y-1 transform rounded-xl bg-white px-10 py-5 font-bold text-green-600 text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Get Started Free →
              </button>
              <p className="mt-4 text-sm text-white/70">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
