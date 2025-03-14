

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext} from "react-router-dom";
import axiosInstance from "../axios";
import CardList from "./CardList";

const RightSide = () => {
  const [madeData, setMadeData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user } = useOutletContext();

  if (!user) {
    return (
      <div className="text-red-700 p-6">
        <h2>Please log in to view songs and playlists.</h2>
      </div>
    );
  }


  useEffect(() => {
    fetchSongs("/api/song/made-for-you", setMadeData);
    fetchSongs("/api/song/trending", setTrendingData);
    fetchSongs("/api/song/featured", setFeaturedData);
  }, []);

  const fetchSongs = async (endpoint, setData) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(endpoint);
      setData(data);
    } catch (err) {
      setError("Error fetching songs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSongClick = (id) => {
    navigate(`/song/${id}`);
  };

  return (
    <div>
      <CardList
        title="Made For You"
        data={madeData}
        onSongClick={handleSongClick}
      />
      <CardList
        title="Trending Songs"
        data={trendingData}
        onSongClick={handleSongClick}
      />
      <CardList
        title="Featured Songs"
        data={featuredData}
        onSongClick={handleSongClick}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default RightSide;
