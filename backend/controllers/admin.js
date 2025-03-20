import {Song} from "../models/song.js";
import {Album} from "../models/album.js";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.js";


const uploadToCloudinary=async(filePath)=>{
    try {
        const result=await cloudinary.uploader.upload(filePath,{
            resource_type:"auto"
        })
        
        return result.secure_url;
    } catch (error) {
        
        throw new Error("Error uploading to cloudinary");
    }
}

export const createSong=async(req,res,next)=>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message:"Please upload all files"});
        }
        const {title,artist,albumId,duration}=req.body;
        const audioFile=req.files.audioFile;
        const imageFile=req.files.imageFile;
        const audioUrl=await uploadToCloudinary(audioFile.tempFilePath);
        const imageUrl=await uploadToCloudinary(imageFile.tempFilePath);
        const song=new Song({
            title,artist,audioUrl,imageUrl,duration,albumId:albumId||null
        });
        await song.save();
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id},
            });
        }
        res.status(201).json(song);
    } catch (error) {
        
        next(error)
    }
}

export const deleteSong=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const song=await Song.findById(id);
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{   
                $pull:{songs:song._id}
            });
        }
            await Song.findByIdAndDelete(id);
            res.status(200).json({message:"Song deleted successfully"});
        
    } catch (error) {
        next(error);
    }
}

export const createAlbum=async(req,res,next)=>{
    try {
        
        const {title,artist,releaseYear}=req.body;
        
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ error: 'Image file is required' });
        }
        const {imageFile}=req.files;
        
        const imageUrl=await uploadToCloudinary(imageFile.tempFilePath);
        const album=new Album({
            title,artist,imageUrl,releaseYear
        });
        await album.save();
        
        res.status(201).json(album);
    } catch (error) {
        
        next(error)
    }
}


export const deleteAlbum=async(req,res,next)=>{
    try {
        const {id}=req.params;
        await Song.deleteMany({albumId:id})
        await Album.findByIdAndDelete(id);
        
            res.status(200).json({message:"Album deleted successfully"});
        
    } catch (error) {
        next(error);
    }
}

export const checkAdmin = (req, res) => {
    try {
        
        res.status(200).json({ admin:true });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to check admin status." });
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { fullname, email, country } = req.body;
        
       
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (country) user.country = country; 
       
        if (req.files && req.files.imageFile) {
            const { imageFile } = req.files;
            if (imageFile.tempFilePath) {
                user.imageUrl = await uploadToCloudinary(imageFile.tempFilePath);
            }
        }

        

        await user.save();

        return res.status(200).json({
            success: true,
            user: {
                fullname: user.fullname,    //sending only these things to frontend from user
                email: user.email,
                country: user.country,
                imageUrl: user.imageUrl,  
            },
            message: "Profile updated successfully",
        });
    } catch (error) {
        
        next(error);
    }
};


export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user: {
                fullname: user.fullname,
                email: user.email,
                country: user.country,
                imageUrl: user.imageUrl, 
            },
        });
    } catch (error) {
        
        next(error);
    }
};



