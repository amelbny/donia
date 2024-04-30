import axios, { AxiosResponse } from "axios";

export const sendVerificationCode = async (email: string, reason: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/posts/sendVerifCode", { user_email: email, request_type: reason});
    console.log('request_type', reason)
    console.log("Verification code sent", response.data);
    return response.data; 
  } catch (error) {
    console.error("Failed to send verification code", error);
    throw error; 
  }
};

export const verifyCode = async (
  email: string,
  code: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/posts/verifyCode",
      {
        user_email: email,
        verificationCode: code,
      }
    );
    console.log("Code verified successfully!");
    return response;
  } catch (error) {
    console.error("Verification failed:", error);
    throw error; 
  }
};

export const resendVerificationCode = async (
    email: string, 
    reason : string
  ): Promise<AxiosResponse<any>> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/posts/sendVerifCode",
        { user_email: email, request_type: reason  }
      );
      console.log("Resend successful:", response.data);
      return response;
    } catch (error) {
      console.error("Resend failed:", error);
      throw error; 
    }
  };
