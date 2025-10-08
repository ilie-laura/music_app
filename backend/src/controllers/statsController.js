import { Song } from "../models/songModel.js";
import { User } from "../models/userModel.js"; 
import { Album } from "../models/albumModel.js";
export const getStats = async (req, res, next) => {
    try {
      // const TotalSongs=await Song.countDocuments(); 
      //const TotalUsers=await User.countDocuments(); 
      //const TotalAlbums=await Album.countDocuments(); 
      // res.status(200).json({TotalSongs,TotalUsers,TotalAlbums});

      const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          { $unionWith: {
              coll: "albums",
              pipeline: []
            }
          },
          {
            $group: { _id: "$artist" }
          },
          {
            $count: "count"
          }
        ])
      ]);
      res.status(200).json({
        TotalSongs: totalSongs,
        TotalUsers: totalUsers,
        TotalAlbums: totalAlbums,
        TotalArtists: uniqueArtists[0]?.count || 0
      });

    } catch (error) {
        next(error);
    }
};