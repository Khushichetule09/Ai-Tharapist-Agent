"use client";

import {
  MessageSquare,
  Clock,
  Calendar,
  Search,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { staticSessions } from "@/lib/static-data";

type Session = {
  id: string;
  type: string;
  status: string;
  scheduledTime: Date;
  summary?: string | null;
  title?: string | null;
  isActive?: boolean;
};

type SessionHistoryProps = {
  onNewSession?: () => Promise<void>;
};

export function SessionHistory({ onNewSession }: SessionHistoryProps) {
  const params = useParams();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load sessions when component mounts
  useEffect(() => {
    if (mounted) {
      loadSessions();
    }
  }, [mounted]);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      // Use static data instead of database call
      const transformedSessions = staticSessions
        .map((session) => ({
          ...session,
          isActive: session.id === params.sessionId,
        }))
        .sort((a, b) => b.scheduledTime.getTime() - a.scheduledTime.getTime());

      setSessions(transformedSessions);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = async () => {
    try {
      if (onNewSession) {
        await onNewSession();
      } else {
        // Create a new session with static data
        const newSession = {
          id: `session-${Date.now()}`,
          type: "text",
          status: "in_progress",
          scheduledTime: new Date(),
          title: "New Session",
          isActive: true,
        };
        setSessions((prev) => [newSession, ...prev]);
        router.push(`/therapy/${newSession.id}`);
      }
    } catch (error) {
      console.error("Failed to create new session:", error);
    }
  };

  // Move getSessionTitle outside both components to share it
  const getSessionTitle = (session: Session) => {
    if (session.summary) {
      const firstSentence = session.summary.split(".")[0];
      return firstSentence.length > 40
        ? `${firstSentence.substring(0, 40)}...`
        : firstSentence;
    }

    const date = new Date(session.scheduledTime);
    const timeStr = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Session on ${date.toLocaleDateString()} at ${timeStr}`;
  };

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = new Date(session.scheduledTime).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, Session[]>);

  // Filter sessions based on search and status
  const filteredGroups = Object.entries(groupedSessions).reduce(
    (acc, [date, sessions]) => {
      const filtered = sessions.filter((session) => {
        const matchesSearch = searchQuery
          ? session.summary
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            getSessionTitle(session)
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true;

        const matchesFilter =
          filter === "all"
            ? true
            : filter === "active"
            ? session.status === "in_progress"
            : session.status === "completed";

        return matchesSearch && matchesFilter;
      });

      if (filtered.length > 0) {
        acc[date] = filtered;
      }
      return acc;
    },
    {} as Record<string, Session[]>
  );

  const formatGroupDate = (date: string) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";
    return date;
  };

  // Simple loading state
  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-muted/5">
      <div className="p-3 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Session History</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <Button
          variant="default"
          className="w-full justify-start gap-2 bg-primary/90 hover:bg-primary"
          onClick={handleNewSession}
        >
          <MessageSquare className="w-4 h-4" />
          New Session
        </Button>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2">
          {["all", "active", "completed"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(f as typeof filter)}
              className="flex-1 capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-1.5">
        {isLoading ? (
          <LoadingSpinner />
        ) : Object.keys(filteredGroups).length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <AnimatePresence>
            {Object.entries(filteredGroups).map(([date, sessions]) => (
              <div key={date} className="mb-4">
                <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                  {formatGroupDate(date)}
                </div>
                {sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onClick={() => router.push(`/therapy/${session.id}`)}
                    getSessionTitle={getSessionTitle}
                  />
                ))}
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Update SessionCard props
function SessionCard({
  session,
  onClick,
  getSessionTitle,
}: {
  session: Session;
  onClick: () => void;
  getSessionTitle: (session: Session) => string;
}) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="px-1.5"
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start px-3 py-3 h-auto flex-col items-start gap-0.5",
          "hover:bg-muted/50 rounded-lg my-0.5 transition-all duration-200",
          session.isActive && "bg-primary/5 hover:bg-primary/10"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {formatDate(session.scheduledTime)}
          </span>
          {session.status === "in_progress" && (
            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
        <span className="text-sm font-medium truncate w-full">
          {getSessionTitle(session)}
        </span>
        {session.summary && (
          <div className="text-xs text-muted-foreground line-clamp-1 text-left w-full prose prose-sm dark:prose-invert">
            <ReactMarkdown>{session.summary}</ReactMarkdown>
          </div>
        )}
        {session.isActive && (
          <div className="absolute right-2 top-2.5 w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </Button>
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
    </div>
  );
}

function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      {searchQuery ? (
        <p>No sessions found matching "{searchQuery}"</p>
      ) : (
        <>
          <p>No sessions yet</p>
          <p className="text-sm">Start a new session to begin</p>
        </>
      )}
    </div>
  );
}
