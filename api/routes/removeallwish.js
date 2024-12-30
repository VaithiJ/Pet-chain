import express from "express";
import { removeallwishlist } from "../controllers/removeallwish.js";
const router= express.Router();


router.get("/removeallwishlist", removeallwishlist);

export default router;