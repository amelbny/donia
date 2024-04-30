import React, { useState } from "react";
import axios from "axios";
import { useModals } from "../../Context/ModalContext";
import { IoClose } from "react-icons/io5";

const ResetPwd: React.FC = () => {
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const { currentModal, openModal, closeModal, email } = useModals();

  if (currentModal !== "resetPwd") return null;

  const handleSaveNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPwd.trim() || !confirmPwd.trim()) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (newPwd !== confirmPwd) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/reset-password",
        {
          user_email: email,
          new_password: newPwd,
        }
      );
      console.log("Password updated successfully:", response.data);
      closeModal();
      openModal("signIn");
    } catch (error) {
      console.error("Password update failed:", error);
      setError("Password update failed, please try again.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white p-6 px-16 rounded-2xl w-full max-w-md">
        <h2 className="text-xl lg:text-2xl text-center font-bold text-gray-900">
          Reset Password
        </h2>
        <form onSubmit={handleSaveNewPassword}>
          <div className="flex flex-col py-8 items-center justify-center">
            <label htmlFor="newPwd" className="self-start mb-2 font-medium">
              New Password
            </label>
            <input
              id="newPwd"
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="Enter new password"
              className="input self-start input-bordered w-full max-w-xs"
            />
            <label
              htmlFor="confirmPwd"
              className="self-start mt-4 mb-2 font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPwd"
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="Confirm new password"
              className="input self-start input-bordered w-full max-w-xs"
            />
            {error && (
              <p className="text-red-500 text-md my-2 items-center">{error}</p>
            )}
            <button
              type="submit"
              className="btn w-80 max-w-xs mt-4 border-yellow-500 input-bordered bg-white text-xl hover:text-white hover:bg-yellow-500"
            >
              Save
            </button>
          </div>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 text-xl rounded-full bg-yellow-500 text-white p-2 hover:bg-yellow-400"
          aria-label="Close modal"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ResetPwd;
