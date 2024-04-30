import React, { useState, FormEvent } from "react";
import { axiosPrivate } from "../../api/axios";

const ConnectionAndSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordError("Please enter all fields");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        "http://localhost:3000/api/v1/profile/change-password",
        { currentPassword, newPassword }
      );
      setPasswordSuccess("Password successfully updated!");
      setPasswordError("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      setPasswordError(
        error.response?.data?.message || "Failed to update password"
      );
      setPasswordSuccess("");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      try {
        const response = await axiosPrivate.delete(
          "http://localhost:3000/api/v1/profile/delete-account"
        );
        setDeleteSuccess("Account deleted successfully.");
        setDeleteError("");
      } catch (error: any) {
        setDeleteError(
          error.response?.data?.message || "Failed to delete account"
        );
        setDeleteSuccess("");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl px-4 ">
        <h1 className="text-xl font-semibold mb-4 text-center text-yellow-600">
          Change Password
        </h1>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Update Password
          </button>
          {passwordError && (
            <p className="mt-2 text-sm text-red-600">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="mt-2 text-sm text-green-600">{passwordSuccess}</p>
          )}
        </form>
        <div className="mt-8">
          <h1 className="text-xl font-semibold mb-4 text-center text-yellow-600">
            Delete Account
          </h1>
          <button
            onClick={handleDeleteAccount}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Delete Account
          </button>
          {deleteError && (
            <p className="mt-2 text-sm text-red-600">{deleteError}</p>
          )}
          {deleteSuccess && (
            <p className="mt-2 text-sm text-green-600">{deleteSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionAndSecurity;
