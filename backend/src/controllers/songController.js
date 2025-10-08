import Song from "../models/songModel.js";


export const getAllSongs = async(req, res,next) => {
    // Logic to get all songs
    //descending order by creation date
    try {
        const songs = (await Song.find()).sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }   
};
export const getFeaturedSongs = async(req, res,next) => {

    try {
        //with mongoose aggregate and sample get 6 random songs
        const songs = await Song.aggregate([
            { $sample: { size: 6 }, },
            {
                $project: {
                    title: 1,
                    artist: 1,
                    _id: 1,
                    imageUrl: 1,
                    audioUrl: 1
            }
        }
        ])
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}
//instead of ML its random
export const getMadeForYou = async(req, res,next) => {
 try {
        //with mongoose aggregate and sample get 4 random songs
        const songs = await Song.aggregate([
            { $sample: { size: 4 }, },
            {
                $project: {
                    title: 1,
                    artist: 1,
                    _id: 1,
                    imageUrl: 1,
                    audioUrl: 1
            }
        }
        ])
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}
export const getTrendingSongs = async(req, res,next) => {
    try {
        
        const songs = await Song.aggregate([
            { $sample: { size: 4 }, },
            {
                $project: {
                    title: 1,
                    artist: 1,
                    _id: 1,
                    imageUrl: 1,
                    audioUrl: 1
            }
        }
        ])
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}
