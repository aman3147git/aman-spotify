import express from "express";

import { requireAdmin, verifytoken } from "../utils/verifytoken.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong, getProfile, updateProfile } from "../controllers/admin.js";
const router=express.Router();

router.get('/check',verifytoken,requireAdmin,checkAdmin);
router.post('/songs',verifytoken,requireAdmin,createSong);
router.delete('/songs/:id',verifytoken,requireAdmin,deleteSong);
router.post('/albums',verifytoken,requireAdmin,createAlbum);
router.delete('/albums/:id',verifytoken,requireAdmin,deleteAlbum);

router.get('/profile',verifytoken,getProfile);
router.put('/update-profile',verifytoken,updateProfile);

export default router;