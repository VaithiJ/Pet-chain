import express from "express";
import { removeallcart } from "../controllers/removeallcart.js";
const router= express.Router();


router.get("/removeallcart", removeallcart);

export default router;