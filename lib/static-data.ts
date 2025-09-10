export const staticSessions = [
  {
    id: "343",
    type: "text",
    status: "in_progress",
    scheduledTime: new Date(),
    summary:
      "Initial therapy session focusing on emotional well-being and personal growth.",
    title: "Welcome Session",
    isActive: true,
  },
  {
    id: "344",
    type: "text",
    status: "completed",
    scheduledTime: new Date(Date.now() - 86400000), // yesterday
    summary:
      "Discussion about stress management techniques and daily mindfulness practices.",
    title: "Stress Management Session",
  },
  {
    id: "345",
    type: "text",
    status: "completed",
    scheduledTime: new Date(Date.now() - 172800000), // 2 days ago
    summary: "Explored personal goals and aspirations for the coming months.",
    title: "Goal Setting Session",
  },
];

export const staticUser = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  walletId: "demo-wallet",
  walletAddress: "0x123...",
  preferences: {
    notifications: true,
    aiInterventions: true,
  },
};

export const staticChatHistory = [
  {
    id: "1",
    userId: "user-1",
    message: "Hello, I've been feeling a bit overwhelmed lately.",
    role: "user",
    timestamp: new Date(Date.now() - 3600000),
    sentiment: "concerned",
  },
  {
    id: "2",
    userId: "user-1",
    message:
      "I understand that feeling. Would you like to talk about what's been causing this overwhelm?",
    role: "assistant",
    timestamp: new Date(Date.now() - 3590000),
    sentiment: "empathetic",
  },
];
