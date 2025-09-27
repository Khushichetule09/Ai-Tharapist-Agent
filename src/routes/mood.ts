import express from "express";
import { auth } from "../middleware/auth";
import { createMood } from "../controllers/moodController";

const router = express.Router();

// All routes are protected with authentication
router.use(auth);

// Track a new mood entry
router.post("/", createMood);

export default router;
