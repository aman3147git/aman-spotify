import { Album } from "../models/album.js";
import { Song } from "../models/song.js";


export const searched = async (req, res) => {
  const { query } = req.query;

  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    const albums = await Album.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    res.status(200).json({
      songs,

      albums,
    });
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const searchedItem = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id);
    const song = await Song.findById(id);

    res.status(200).json(album || song || { message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error });
  }
};
