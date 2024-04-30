import axios from "axios";

let refreshPromise: Promise<string> | null = null;

 export const refreshAccessToken = async (): Promise<string> => {
    if (!refreshPromise) {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
            console.error("No refresh token available.");
            throw new Error("Login required");
        }
        refreshPromise = axios.post('http://localhost:3000/api/v1/refresh', { refreshToken })
            .then(response => {
                const { accessToken, refreshToken } = response.data.data;
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);
                return accessToken;
            }).catch(error => {
                console.error("Token refresh failed:", error);
                sessionStorage.removeItem("refreshToken"); 
                throw error;
            }).finally(() => {
                refreshPromise = null; // Reset refreshPromise to null after the operation is complete
            });
    }
    return await refreshPromise;
};
