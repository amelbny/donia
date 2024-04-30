import React, { useState, useEffect } from "react";
import { UserProfileInfo } from "../services/UserTypes";
import { axiosPrivate } from "../../api/axios";
import { sendVerificationCode } from "../services/apiService";
import { useModals } from "../../Context/ModalContext";
import ProfileImage from "./ProfileImage";

interface ApiResponse {
  message: string;
  statusCode: number;
  data: UserProfileInfo;
}

const AccountSetting: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserProfileInfo | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [editedInfo, setEditedInfo] = useState({firstname: '', lastname: '', email: '',profilePicUrl:''})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { email, reason, openModal, closeModal, setEmail } = useModals();


  useEffect(() => {
    const fetchUserInfo = async () => {
      
      try {
        const response = await axiosPrivate.get<ApiResponse>(
          "http://localhost:3000/api/v1/profile/my"
        );
        console.log("User Informations:", response.data);
        setUserInfo(response.data.data);
        setEditedInfo({
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email,
          profilePicUrl: response.data.data.profilePicUrl,
        });
      } catch (error) {
        console.error("Failed to fetch user Information", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleEditName = () => setEditingName(true);
  const handleEditingEmail = () => setEditingEmail(true);

  const handleSave = async (field: string) => {
    setIsLoading(true);
    setError("");

    if (field === "email" && editedInfo.email !== userInfo?.email) {
      console.log("New email", editedInfo.email);
      try {
        const result = await sendVerificationCode(
          editedInfo.email,
          "profileSettings"
        );
        if (result.success) {
          setEmail(editedInfo.email);
          
          openModal("VerifyEmailSetting", editedInfo.email, undefined, 'profileSettings');
        } else {
          setError(
            result.errorMessage || "Failed to send verification code. Please try again."
          );
        }
      } catch (error) {
        setError("Failed to send verification code. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      const dataToSend = {
        firstname: editedInfo.firstname,
        lastname: editedInfo.lastname,
      };
      console.log("data to send", dataToSend);
      setIsLoading(true);
      setError("");
      try {
        const response = await axiosPrivate.put(
          "http://localhost:3000/api/v1/profile/",
          dataToSend
        );
        console.log("Update successful:", response.data);
        setUserInfo(response.data.data);
        setEditingName(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to update name", error);
        setError("Failed to update name");
        setIsLoading(false);
      }
    }
  };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
   };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

return (
  <div className="p-4 md:p-8 rounded-lg">
    <h1 className="text-lg md:text-xl font-semibold mb-4 text-center text-yellow-600 tracking-widest">
      Account Settings
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 p-10">
        <div className="flex flex-col items-center mb-2">
          <ProfileImage />
        </div>
      </div>
      <div className="md:col-span-2 py-16">
        <div className="mb-4">
          <div>
            <span className="text-base font-medium text-gray-700 tracking-tight pb-4">
              Full name
            </span>
            <div
              className={
                editingName
                  ? "flex flex-col md:flex-row items-center justify-between gap-2"
                  : "flex flex-row items-center justify-between"
              }
            >
              {editingName ? (
                <>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="FirstName"
                    value={editedInfo.firstname}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="LastName"
                    value={editedInfo.lastname}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  <button
                    onClick={() => handleSave("name")}
                    className="mt-2 md:mt-0 md:ml-2 px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md focus:outline-none"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="font-light">{`${userInfo.firstname} ${userInfo.lastname}`}</span>
                  <button
                    onClick={handleEditName}
                    className="text-yellow-600 text-semibold underline hover:text-yellow-500 focus:outline-none"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Email Section */}
          <div className="mb-4 mt-4">
            <span className="text-base font-medium text-gray-700 tracking-tight">
              Email address
            </span>
            <div
              className={
                editingEmail
                  ? "flex flex-col md:flex-row items-center justify-between"
                  : "flex flex-row items-center justify-between"
              }
            >
              {editingEmail ? (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editedInfo.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  <button
                    onClick={() => handleSave("email")}
                    className="mt-2 md:mt-0 md:ml-2 px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md focus:outline-none"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="font-light">{userInfo.email}</span>
                  <button
                    onClick={handleEditingEmail}
                    className="text-yellow-600 underline hover:text-yellow-500 focus:outline-none"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  </div>
);

};

export default AccountSetting