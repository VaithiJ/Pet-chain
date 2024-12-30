import express from "express";
import { imageUrl } from "../controllers/imageUrl.js";
const router = express.Router();

router.post("/imageUrl", imageUrl);


export default router;