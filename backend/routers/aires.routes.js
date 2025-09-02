import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { postAires, postAiresChat } from "../controllers/aires.controller.js";

const router = express.Router();

router.post("/", postAires);
router.post("/chat", postAiresChat);

export default router;