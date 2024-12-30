import express from "express";

import { removewishlist } from "../controllers/removewishlist.js";
const router= express.Router();


router.get("/removewishlist/:_id", removewishlist);

export default router;