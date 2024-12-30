import express from "express";

import { wishlist } from "../controllers/wishlist.js";
const router= express.Router();


router.get("/wishlist/:_id", wishlist);

export default router;