import React, { useEffect, useState } from "react";
import axiosInstance from "../axios.js";
import { Link } from "react-router-dom";
import { MdCancelPresentation } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("albums");
  const [showForm, setShowForm] = useState(false);
  const [albumsData, setAlbumsData] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/song/get");
      setSongsData(data);
    } catch (err) {
      setError("Error fetching songs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/album/get");
      setAlbumsData(data);
    } catch (err) {
      setError("Error fetching albums.");
    } finally {
      setLoading(false);
    }
  };

  const submithandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple clicks

    setIsSubmitting(true);
    setError("");
    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }
      

      
      const endpoint =
        activeTab === "albums" ? "/api/admin/albums" : "/api/admin/songs";

      const res = await axiosInstance.post(endpoint, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      
      if (activeTab === "albums") setAlbumsData((prev) => [...prev, res.data]);
      else setSongsData((prev) => [...prev, res.data]);
      setShowForm(false);
      setFormData({});
    } catch (error) {
      
      setError(error.response?.data?.message || "Submission failed.");
    }finally {
      setIsSubmitting(false); // Re-enable button after completion
    }
  };

  const deleteItem = async (id) => {
    try {
      const endpoint =
        activeTab === "albums"
          ? `/api/admin/albums/${id}`
          : `/api/admin/songs/${id}`;
      await axiosInstance.delete(endpoint);

      if (activeTab === "albums") {
        setAlbumsData((prev) => prev.filter((item) => item._id !== id));
      } else {
        setSongsData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert("Error deleting item.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = () => {
    deleteItem(deleteId);
    setShowDeletePopup(false);
    setDeleteId(null);
  };

  if (loading) return <div className="flex min-h-dvh items-center justify-center bg-mycolor p-4 text-white">Loading...</div>;
  if (error) return <div className="flex min-h-dvh items-center justify-center bg-mycolor p-4 text-center text-red-300">{error}</div>;

  return (
    <div className="flex min-h-dvh flex-col items-center bg-mycolor p-4 sm:p-6">
      <Link to="/" className="mb-4 text-center text-2xl font-bold text-white sm:mb-6 sm:text-3xl">Control Room</Link>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full max-w-5xl">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Songs</h2>
          <p className="text-2xl font-bold text-green-500">{songsData.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Albums</h2>
          <p className="text-2xl font-bold text-green-500">
            {albumsData.length}
          </p>
        </div>
        
      </div>

     
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "albums"
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("albums")}
        >
          Albums
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "songs"
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("songs")}
        >
          Songs
        </button>
      </div>

      
      <div className="w-full max-w-3xl mb-4 flex justify-end">
        <button
          className="px-4 py-2 bg-slate-700 text-white rounded shadow"
          onClick={() => setShowForm(true)}
        >
          Add {activeTab === "albums" ? "Album" : "Song"}
        </button>
      </div>

      
      {activeTab === "albums" && (
        <div className="scroll-thin-brown w-full max-w-3xl overflow-x-auto rounded shadow-md">
        <table className="w-full min-w-[640px] bg-gray-400">
          <thead className="bg-green-900 text-white">
            <tr>
              <th className="p-2">Thumbnail</th>
              <th className="p-2">Album Title</th>
              <th className="p-2">Artists</th>
              <th className="p-2">Re. Year</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {albumsData.map((album) => (
              <tr
                key={album._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-2 text-center">
                  <img src={album.imageUrl} className="h-12 w-12" alt="" />
                </td>
                <td className="p-2">{album.title}</td>
                <td className="p-2">{album.artist}</td>
                <td className="p-2 text-center">{album.releaseYear}</td>
                <td className="p-2 text-center">
                  <button
                    className="text-red-700 text-3xl"
                    onClick={() => {
                      setDeleteId(album._id);
                      setShowDeletePopup(true);
                    }}
                  >
                    <MdDeleteOutline/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {activeTab === "songs" && (
        <div className="scroll-thin-brown w-full max-w-3xl overflow-x-auto rounded shadow-md">
        <table className="w-full min-w-[640px] bg-gray-400">
          <thead className="bg-green-900 text-white">
            <tr>
              <th className="p-2">Thumbnail</th>
              <th className="p-2">Title</th>
              <th className="p-2">Artist</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songsData.map((song) => (
              <tr
                key={song._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-2 text-center">
                  <img src={song.imageUrl} className="h-12 w-12" alt="" />
                </td>
                <td className="p-2">{song.title}</td>
                <td className="p-2">{song.artist}</td>
                <td className="p-2 text-center">{song.duration}</td>
                <td className="p-2 text-center">
                  <button
                    className="text-red-700 text-3xl"
                    onClick={() => {
                      setDeleteId(song._id);
                      setShowDeletePopup(true);
                    }}
                  >
                    <MdDeleteOutline/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
        <form
          onSubmit={submithandler}
          className="scroll-thin-brown mt-0 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-white p-4 shadow-md sm:p-6"
        >
          <div className="relative">
          <button type="button" className="absolute right-0 top-0 text-3xl" onClick={()=>setShowForm(false)}><MdCancelPresentation/></button>
          </div>
          <div className="mb-4 ">
            
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 bg-gray-300 outline-none"
              value={formData.title || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          {activeTab === "albums" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Artist</label>
                <input
                  type="text"
                  name="artist"
                  className="w-full p-2 bg-gray-300 outline-none"
                  value={formData.artist || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Year</label>
                <input
                  type="text"
                  name="releaseYear"
                  className="w-full p-2 bg-gray-300 outline-none"
                  value={formData.releaseYear || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      imageFile: e.target.files[0],
                    }))
                  }
                  required
                />
              </div>
            </>
          )}
          {activeTab === "songs" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Artist</label>
                <input
                  type="text"
                  name="artist"
                  className="w-full p-2 bg-gray-300 outline-none"
                  value={formData.artist || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  className="w-full p-2 bg-gray-300 outline-none"
                  value={formData.duration || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Audio</label>
                <input
                  type="file"
                  accept="audio/*"
                  name="audioFile"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      audioFile: e.target.files[0],
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      imageFile: e.target.files[0],
                    }))
                  }
                  required
                />
              </div>



              <div className="mb-4">
                <label className="block text-gray-700">Album</label>
                <select
                  name="albumId"
                  className="w-full p-2 bg-gray-300 outline-none"
                  value={formData.albumId || ""}
                  onChange={handleInputChange}
                  
                >
                  <option value="">Select Album</option>
                  {albumsData.map((album) => (
                    <option key={album._id} value={album._id}>
                      {album.title}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <button
            type="submit"
            className={`px-4 py-2 bg-red-700 rounded-sm text-white ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}

          >
            {activeTab === "albums" ? "Add Album" : "Add Song"}
          </button>
        </form>
        </div>
      )}

      
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 p-4">
          <div className="scroll-thin-brown max-h-[90vh] w-full max-w-md overflow-y-auto rounded bg-white p-6 shadow-md">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;







