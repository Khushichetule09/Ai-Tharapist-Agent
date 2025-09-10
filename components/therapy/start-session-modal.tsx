"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export function StartSessionModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>("text");
  const [error, setError] = useState<string>("");

  const handleStartSession = async () => {
    try {
      // Only allow text sessions for now
      if (type !== "text") {
        setError("This session type is coming soon. Please select Text Chat.");
        return;
      }

      setOpen(false);
      // Redirect to the therapy chat page with a static session ID
      router.push(`/therapy/343`);
    } catch (error) {
      console.error("Failed to start session:", error);
      setError("Failed to start session. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2 w-full">
          <MessageSquare className="w-4 h-4" />
          Start Therapy Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start New Session</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label>Session Type</label>
            <Select
              value={type}
              onValueChange={(value) => {
                setType(value);
                setError("");
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="video"
                  className="flex items-center justify-between"
                >
                  Video Call
                  <span className="text-xs text-muted-foreground ml-2">
                    (Coming Soon)
                  </span>
                </SelectItem>
                <SelectItem
                  value="audio"
                  className="flex items-center justify-between"
                >
                  Audio Call
                  <span className="text-xs text-muted-foreground ml-2">
                    (Coming Soon)
                  </span>
                </SelectItem>
                <SelectItem value="text">Text Chat</SelectItem>
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleStartSession}>Start Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
