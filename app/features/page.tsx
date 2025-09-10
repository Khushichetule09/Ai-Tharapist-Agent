"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Shield,
  Fingerprint,
  Activity,
  Bot,
  LineChart,
  Wifi,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: "AI-Powered Therapy",
    description:
      "24/7 access to empathetic AI agents trained in various therapeutic approaches, providing personalized mental health support.",
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Blockchain Security",
    description:
      "Your therapy sessions are secured by blockchain technology, ensuring complete privacy and transparent record-keeping.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "Smart Analysis",
    description:
      "Advanced NLP and emotion detection helps understand your mental state and provide appropriate interventions.",
  },
  {
    icon: <Activity className="w-10 h-10 text-primary" />,
    title: "Crisis Detection",
    description:
      "Real-time monitoring and emergency response protocols to ensure your safety during critical situations.",
  },
  {
    icon: <Wifi className="w-10 h-10 text-primary" />,
    title: "IoT Integration",
    description:
      "Connect with smart home devices to create an ambient therapeutic environment that adapts to your needs.",
  },
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: "Progress Tracking",
    description:
      "Detailed analytics and insights about your mental health journey, with blockchain-verified session records.",
  },
  {
    icon: <Fingerprint className="w-10 h-10 text-primary" />,
    title: "Privacy First",
    description:
      "End-to-end encryption and zero-knowledge proofs ensure your data remains completely confidential.",
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "Holistic Care",
    description:
      "Integration with wearables and health providers for comprehensive mental wellness monitoring.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Platform Features
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover how our AI-powered platform revolutionizes mental health
          support with cutting-edge technology and unwavering privacy
          protection.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of users benefiting from AI-powered mental health
          support.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start Your Journey
          <Heart className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
}
