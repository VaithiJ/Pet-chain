import express from "express";
import { imageStatus } from "../controllers/imageStatus.js";
const router= express.Router();


router.get("/imageStatus/:_id", imageStatus);

export default router;