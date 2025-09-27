import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    technique: string;
    goal: string;
    progress: any[];
  };
}

export interface IChatSession extends Document {
  sessionId: string;
  messages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    technique: String,
    goal: String,
    progress: [Schema.Types.Mixed],
  },
});

const chatSessionSchema = new Schema<IChatSession>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [chatMessageSchema],
  },
  {
    timestamps: true,
  }
);

export const ChatSession = mongoose.model<IChatSession>(
  "ChatSession",
  chatSessionSchema
);
