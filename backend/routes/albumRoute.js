import express from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.js";


const router=express.Router();


router.get('/get',getAllAlbums);
router.get('/:albumId',getAlbumById);


export default router;