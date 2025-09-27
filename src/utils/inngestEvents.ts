import { inngest } from "../inngest/client";
import { logger } from "./logger";

export const sendTherapySessionEvent = async (sessionData: any) => {
  try {
    await inngest.send({
      name: "therapy/session.created",
      data: {
        sessionId: sessionData.id,
        userId: sessionData.userId,
        timestamp: new Date().toISOString(),
        requiresFollowUp: sessionData.requiresFollowUp || false,
        sessionType: sessionData.type,
        duration: sessionData.duration,
        notes: sessionData.notes,
        ...sessionData,
      },
    });
    logger.info("Therapy session event sent successfully");
  } catch (error) {
    logger.error("Failed to send therapy session event:", error);
    throw error;
  }
};

// Add more event sending functions as needed
export const sendMoodUpdateEvent = async (moodData: any) => {
  try {
    await inngest.send({
      name: "mood/updated",
      data: {
        userId: moodData.userId,
        mood: moodData.mood,
        timestamp: new Date().toISOString(),
        context: moodData.context,
        activities: moodData.activities,
        notes: moodData.notes,
        ...moodData,
      },
    });
    logger.info("Mood update event sent successfully");
  } catch (error) {
    logger.error("Failed to send mood update event:", error);
    throw error;
  }
};

export const sendActivityCompletionEvent = async (activityData: any) => {
  try {
    await inngest.send({
      name: "activity/completed",
      data: {
        userId: activityData.userId,
        activityId: activityData.id,
        timestamp: new Date().toISOString(),
        duration: activityData.duration,
        difficulty: activityData.difficulty,
        feedback: activityData.feedback,
        ...activityData,
      },
    });
    logger.info("Activity completion event sent successfully");
  } catch (error) {
    logger.error("Failed to send activity completion event:", error);
    throw error;
  }
};
