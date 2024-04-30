import { axiosPrivate } from "../../api/axios";


export const saveAvatarUrlToServer = async (profilePicUrl: string) => {
    try {
        const response = await axiosPrivate.post('http://localhost:3000/api/v1/profile/picture', { avatarUrl: profilePicUrl });
        if (response.status === 200) {
            console.log('Profile picture updated successfully on server.', response.data.message);
            return response.data;

        } else {
            console.error('Server responded with an error:', response.data);
            throw new Error("Failed to update avatar URL on server. Details: " + response.data.message);
        }
    } catch (error:any) {
        if (error.response) {
            console.error("Server responded with status code:", error.response.status);
            console.error("Server error details:", error.response.data);
        } else {
            console.error("Error saving avatar URL to server: ", error);
        }
        throw error; // Re-throwing the error after logging it to handle it further up the call stack
    }
}
