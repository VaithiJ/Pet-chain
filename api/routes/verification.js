import express from "express";
import { verification } from "../controllers/verification.js";
const router= express.Router();


router.get("/verification/:id", verification);

export default router;