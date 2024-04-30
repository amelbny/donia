import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import camera from "../../img/camera.png";
import Avatar from "../../img/Avatar.png";

const ProfileImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");

  useEffect(() => {
    axiosPrivate
      .get("http://localhost:3000/api/v1/profile/my")
      .then((response) => {
        console.log("get profile response", response);
        setProfilePicUrl(response.data.data.profilePicUrl);
        console.log('profile image:', profilePicUrl)
      })
      .catch((error) => {
        console.error("Failed to fetch profile", error);
        toast.error("Failed to load profile image.");
      });
  }, []);

  useEffect(() => {
    console.log("profile image updated to:", profilePicUrl);
  }, [profilePicUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("images", file);

      try {
        console.log('profilePicUrl:',profilePicUrl)
        const response = await axiosPrivate.post(
          "http://localhost:3000/api/v1/profile/picture",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProfilePicUrl(response.data.data.profilePicUrl);
        console.log('profilePicUrl:',profilePicUrl)
        toast.success("Profile image updated successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload new profile image.");
      }
    } else {
      toast.info("Please select a file first.");
    }
  };

  return (
    <div className="relative">
      <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={profilePicUrl || Avatar}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <label
        htmlFor="file-upload"
        className="absolute bottom-0 right-0 mb-14 mr-5 bg-white p-1 rounded-full border border-gray-300 cursor-pointer"
      >
        <img src={camera} alt="Update profile" className="w-8 h-7" />
        <input
          id="file-upload"
          type="file"
          className="hidden"
          //onChange={e => setFile(e.target.files[0])}
          onChange={handleFileChange}
        />
      </label>
      <button
        onClick={handleUpload}
        className="mt-4 mx-12 text-md bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-3 rounded"
      >
        Upload
      </button>

    </div>
  );
};

export default ProfileImage;
