import { Song } from "../models/Song.js";
import { Album } from "../models/Album.js";
export const createSong = async(req,res,next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).send("Not all files were uploaded.");
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

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
