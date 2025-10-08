import Album from "../models/albumModel.js";
export const getAllAlbums =async (req, res,next) => {
    // Logic to get all albums
   try {
    const album=await Album.find();
    res.statsus(200).json(album);//without obj
   } catch (error) {
    next(error);
   }
}

export const getAlbumById =async (req, res,next) => {
   
    // Logic to get album by ID     
    try {
         const { albumId } = req.params;
        const album = await Album.findById(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }
}