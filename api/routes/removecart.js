import express from "express";
import { removecart } from "../controllers/removecart.js";
const router= express.Router();


router.get("/removetocart/:_id", removecart);

export default router;