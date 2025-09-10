"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Minus, Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function FixedChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Luma. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);

  const router = useRouter();

  const handleClick = () => {
    router.push("/therapy/new");
  };

  return (
    <div className="fixed bottom-6 right-6">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        onClick={handleClick}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
}
