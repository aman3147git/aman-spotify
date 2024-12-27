import express from "express";

import { searched, searchedItem } from "../controllers/stat.js";
import { verifytoken } from "../utils/verifytoken.js";

const router = express.Router();

router.get("/search", verifytoken, searched);
router.get("/search/:id", verifytoken, searchedItem);

export default router;
