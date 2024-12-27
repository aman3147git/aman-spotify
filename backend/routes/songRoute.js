import express from "express";
import {getAllSongs, getSongById } from "../controllers/song.js";
import { requireAdmin, verifytoken } from "../utils/verifytoken.js";
import { getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.js";

const router=express.Router();


router.get('/get',verifytoken,getAllSongs);
router.get('/featured',getFeaturedSongs);
router.get('/made-for-you',getMadeForYouSongs);
router.get('/trending',getTrendingSongs);
router.get('/:songId',getSongById);

export default router;