import React, { useState, FormEvent } from "react";
import { useModals } from "../../Context/ModalContext";
import { verifyCode, resendVerificationCode } from "../services/apiService";
import axios from "axios";
import { IoClose } from "react-icons/io5";


const SignUpEmailVerify: React.FC = () => {
   const [code, setCode] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [sending, setSending] = useState<boolean>(false);
   const {currentModal, openModal, closeModal, email, UserData, reason} = useModals()

  if (currentModal !== "SignUpVerifyCode") return null;

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!code.trim()) {
      setError("Please enter the verification code.");
      return;
    }
    setError("");
    console.log("Verifying code:", code);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/posts/verifyCode",
        {
          user_email: email,
          verificationCode: code,
        }
      );
        console.log("Code verified successfully!");
        console.log(response);
        setCode("");
        handleRegistrationData();
        closeModal();
        openModal('signIn')
    } catch (error) {
      console.error("Verification failed:", error);
      setError("Verification failed, please try again.");

      throw error; 
    }
  };

  const handleRegistrationData = async () => {
    if (!UserData) {
      setError("No registration data available.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        UserData
      );
      console.log("User registered successfully:", response.data);
    } catch (error) {
      console.error("Failed to register user:", error);
      setError("Registration failed. Please try again.");
    }
  };


  const handleResendCode = async (): Promise<void> => {
    setSending(true);
    if (email == null || reason == null) {
      setError("Email or operation context missing.");
      setSending(false);
      return;
    }
    try {
      await resendVerificationCode(email, reason);
      setError("");
    } catch (error: any) {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const navigateBack = () => {
    openModal("signUp"); 
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-2xl w-full max-w-md">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 text-xl rounded-full bg-yellow-500 text-white p-2 hover:bg-yellow-400"
        >
          <IoClose />
        </button>
        <div className="text-center my-2">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
            Verify Email
          </h2>
          <p className="text-gray-600 mt-2">
            We have sent a code to your email <strong>{email}</strong>.
          </p>
        </div>
        <form onSubmit={handleVerifyCode}>
          <div className="flex flex-col py-4 items-center justify-center">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="input input-bordered w-full max-w-xs mb-4"
            />
            {error && <p className="text-red-500 text-md my-1">{error}</p>}
            <button
              type="submit"
              className="btn w-80 max-w-xs border-yellow-500 bg-white hover:text-white hover:bg-yellow-500"
            >
              Verify Code
            </button>
            <div className="flex flex-row gap-2 mt-2">
              <p>Didn't receive the code?</p>
              <button
                onClick={handleResendCode}
                disabled={sending}
                className="text-yellow-500 font-bold"
              >
                Resend Code
              </button>
            </div>
          </div>
        </form>
        <button
          onClick={navigateBack}
          className="btn mt-4 bg-yellow-500 hover:bg-yellow-400 text-white border-yellow-500"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SignUpEmailVerify;