"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Eye,
  User,
  Zap,
  Shield,
  Users,
  Star,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TaskBoardLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const router = useRouter();

  const stages = [
    {
      name: "Assigned",
      icon: User,
      color: "bg-blue-500",
      description: "Tasks ready to start",
    },
    {
      name: "In Progress",
      icon: Clock,
      color: "bg-yellow-500",
      description: "Work in motion",
    },
    {
      name: "In Review",
      icon: Eye,
      color: "bg-purple-500",
      description: "Quality checks",
    },
    {
      name: "Completed",
      icon: CheckCircle,
      color: "bg-green-500",
      description: "Done and delivered",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Lightweight design that loads instantly and keeps you productive",
    },
    {
      icon: Shield,
      title: "Simple & Clean",
      description:
        "No clutter, no confusion. Just your tasks organized beautifully",
    },
    {
      icon: Users,
      title: "Team Focused",
      description: "Perfect for teams that need clarity without complexity",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow",
      content:
        "TaskBoard transformed how our team tracks progress. Simple yet powerful.",
    },
    {
      name: "Mike Rodriguez",
      role: "Dev Lead",
      company: "StartupXYZ",
      content:
        "Finally, a task manager that doesn't get in the way of actual work.",
    },
    {
      name: "Emily Park",
      role: "Designer",
      company: "Creative Co",
      content:
        "Clean interface, clear workflow. Everything we needed, nothing we didn't.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              TaskBoard
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 bg-opacity-95 backdrop-blur-sm border-t border-slate-700">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Reviews
              </a>
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full font-semibold transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-slate-800 bg-opacity-50 rounded-full border border-slate-700 mb-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300">
                Simple. Effective. Powerful.
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Organize Work.
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Track Progress.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              TaskBoard is a lightweight task management web app that helps you
              organize and track work through clear stages. Designed for{" "}
              <span className="text-purple-400 font-semibold">simplicity</span>{" "}
              and{" "}
              <span className="text-blue-400 font-semibold">efficiency</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Managing Tasks
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-800">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Interactive Workflow Demo */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-3xl border border-slate-700 p-8 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = index === currentStage;
                  return (
                    <div
                      key={stage.name}
                      className={`p-6 rounded-2xl border-2 transition-all duration-500 transform ${
                        isActive
                          ? "border-purple-500 bg-gradient-to-br from-purple-900 to-blue-900 scale-105 shadow-lg"
                          : "border-slate-600 bg-slate-700 bg-opacity-50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                          isActive ? stage.color : "bg-slate-600"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {stage.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {stage.description}
                      </p>
                      {isActive && (
                        <div className="mt-3 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 bg-opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-slate-800 bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to keep your workflow aligned and your
              projects moving forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-slate-800 bg-opacity-50 rounded-3xl border border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Four Stages.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Infinite Progress.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              TaskBoard uses a proven four-stage workflow that keeps your team
              organized and productive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 ${stage.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{stage.name}</h3>
                  <p className="text-gray-400">{stage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="px-6 py-20 bg-slate-800 bg-opacity-30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Teams Worldwide
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-slate-800 bg-opacity-50 rounded-3xl border border-slate-700 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get Organized?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of teams who've streamlined their workflow with
            TaskBoard's simple, powerful approach to task management.
          </p>

          <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Start Your Free Trial
            <ArrowRight className="w-6 h-6 ml-3 inline-block group-hover:translate-x-2 transition-transform" />
          </button>

          <p className="text-sm text-gray-400 mt-6">
            No credit card required • Free forever for small teams
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TaskBoard
              </span>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
              <span>© 2025 TaskBoard. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
