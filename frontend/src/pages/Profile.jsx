import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { RiLoader4Line } from "react-icons/ri";
import axiosInstance from "../axios";

const Profile = () => {
  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    country: "",
    imageFile: null,
  });

  const [loading, setLoading] = useState(false);
  const userRef = useRef(null);
  const [selectedpic, setSelectedpic] = useState(""); 

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/api/admin/profile"); 
        setFormdata({
          fullname: data.user.fullname || "",
          email: data.user.email || "",
          country: data.user.country || "",
          imageFile: null, 
        });
        setSelectedpic(data.user.imageUrl || ""); 
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormdata((prevdata) => ({ ...prevdata, imageFile: file }));
      setSelectedpic(URL.createObjectURL(file)); 
    }
  };

  const changeHandler = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", formdata.fullname);
    formData.append("email", formdata.email);
    formData.append("country", formdata.country);
    if (formdata.imageFile) {
      formData.append("imageFile", formdata.imageFile);
    }

    try {
      const response = await axiosInstance.put("/api/admin/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      setSelectedpic(response.data.user.imageUrl || ""); 
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-7xl mx-auto my-5 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative md:h-28 md:w-28 h-20 w-20">
            <img 
              src={selectedpic} 
              
              className="w-full h-full object-cover rounded-full" 
            />
            <input ref={userRef} type="file" accept="image/*" hidden onChange={fileHandler} />
            <div
              onClick={() => userRef.current.click()}
              className="absolute inset-0 flex items-center justify-center opacity-100 hover:opacity-20 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full"
            >
              <AiOutlinePlus className="text-white h-8 w-8" />
            </div>
          </div>

          <input
            type="text"
            value={formdata.fullname}
            onChange={changeHandler}
            id="fullname"
            className="font-semibold text-2xl bg-gray-400 p-2 outline-none focus-visible:ring-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2">
          <CiMail className="text-gray-500 text-3xl" />
          <div className="w-full">
            <label className="text-white">Email</label>
            <input
              type="email"
              value={formdata.email}
              onChange={changeHandler}
              id="email"
              className="p-3 w-full text-gray-600 border-none outline-none bg-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2">
          <TbWorld className="text-gray-500 text-3xl" />
          <div className="w-full">
            <label className="text-white">Country</label>
            <input
              type="text"
              value={formdata.country}
              onChange={changeHandler}
              id="country"
              className="p-3 w-full text-gray-600 outline-none border-none bg-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        {loading ? (
          <button disabled className="p-3 bg-orange-700 text-white w-full flex items-center justify-center opacity-50 cursor-not-allowed">
            <RiLoader4Line className="mr-2 h-4 w-4 animate-spin" /> wait..
          </button>
        ) : (
          <button type="submit" className="w-full p-3 bg-orange-700 text-white rounded-sm">
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default Profile;
