import { Song } from "../models/song.js";
export const getAllSongs=async(req,res,next)=>{
    try {
        const songs=await Song.find().sort({createdAt:-1});
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}
export const getFeaturedSongs=async(req,res,next)=>{
    try {
        const songs=await Song.aggregate([
            {
                $sample:{size:10}
            },{
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}
export const getMadeForYouSongs=async(req,res,next)=>{
    try {
        const songs=await Song.aggregate([
            {
                $sample:{size:12}
            },{
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}
export const getTrendingSongs=async(req,res,next)=>{
    try {
        const songs=await Song.aggregate([
            {
                $sample:{size:10}
            },{
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

export const getSongById=async(req,res,next)=>{
    try {
       const {songId}=req.params;
       
       const song=await Song.findById(songId);
       if(!song){
        return res.status(404).json({message:"Song not found"})
       } 
       res.status(200).json(song);
    } catch (error) {
        next(error);
    }
}