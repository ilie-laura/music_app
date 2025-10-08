import  Song  from "../models/songModel.js";
import  Album  from "../models/albumModel.js";
import cloudinary from "cloudinary";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
           rrsource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
}
export const createSong = async(req,res,next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).send("Not all files were uploaded.");
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

const audioURL=await uploadToCloudinary(audioFile,"audio");
const imageURL=await uploadToCloudinary(imageFile,"image");

        const song = new Song({
            title,
            artist,

            audioURL,
            imageURL,
            albumId: albumId || null,
            duration
        });
        await song.save();
       //song belongs to album
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id}
            });
        }
        res.status(201).json({message:"Song created successfully ;)", song});

    } catch (error) {
        console.log("Error in createSong:", error);
        next(error);
    }
}

export const deleteSong=async(req,res,next)=>{


try {
    const {id}=req.params;
    const song=await Song.findById(id);
    if(!song){
        return res.status(404).json({message:"Song not found"});
    }
    //remove from album
    if(song.albumId){
        await Album.findByIdAndUpdate(song.albumId,{
            $pull:{songs:song._id}
        });
    }
    await song.findByIdAndDelete(id);
    res.status(200).json({message:"Song deleted successfully", song});
} catch (error) {
    console.log("Error in deleteSong:", error);
    next(error);
}


}
export const createAlbum=async(req,res,next)=>{
    try {
        if(!req.files || !req.files.imageFile) {
            return res.status(400).send("Image file was not uploaded.");
        }
        const { title, artist ,releaseDate} = req.body;
        const imageFile = req.files.imageFile;

        const imageURL = await uploadToCloudinary(imageFile, "image");

        const album = new Album({
            title,
            artist,
            imageURL,
            releaseDate
        });
        await album.save();
        res.status(201).json({ message: "Album created successfully ;)", album });
    } catch (error) {
        console.log("Error in createAlbum:", error);
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        //remove all songs from album
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully", album });
    } catch (error) {
        console.log("Error in deleteAlbum:", error);
        next(error);
    }
}


export const checkAdmin=async(req,res,next)=>{
    res.status(200).json({admin:true});
}