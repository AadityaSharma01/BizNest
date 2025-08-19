import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { postAires } from "../controllers/aires.controller.js";

const router = express.Router();

router.post("/", postAires);

export default router;