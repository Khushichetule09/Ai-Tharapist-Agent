"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, CheckCircle, XCircle } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  duration: number;
  scheduledFor: Date;
  completedAt?: Date;
}

interface ActivityListProps {
  activities: Activity[];
  onStatusUpdate: (activityId: string, status: string) => Promise<void>;
}

export function ActivityList({
  activities,
  onStatusUpdate,
}: ActivityListProps) {
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusUpdate = async (activityId: string, newStatus: string) => {
    setUpdating(activityId);
    try {
      await onStatusUpdate(activityId, newStatus);
    } finally {
      setUpdating(null);
    }
  };

  if (!activities.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No activities scheduled for today
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-medium">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(activity.scheduledFor).toLocaleTimeString()} -{" "}
                  {activity.duration} mins
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activity.status === "completed" ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-500"
                  disabled
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(activity.id, "completed")}
                    disabled={updating === activity.id}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusUpdate(activity.id, "skipped")}
                    disabled={updating === activity.id}
                  >
                    Skip
                  </Button>
                </>
              )}
            </div>
          </div>
          {activity.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {activity.description}
            </p>
          )}
          {activity.status === "in_progress" && (
            <Progress value={50} className="mt-2" />
          )}
        </div>
      ))}
    </div>
  );
}
