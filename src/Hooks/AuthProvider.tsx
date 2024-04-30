import { useEffect, useState, ReactNode, useContext, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useModals } from "../Context/ModalContext";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "./RefreshToken";




 const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [userRole, setUserRole] = useState<string>("");
   const { currentModal, openModal, closeModal } = useModals();

   const showLoginModal = () => {
     if (currentModal !== "signIn") {
       openModal("signIn");
     }
   };


  const login = (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    const decoded = jwtDecode<{ roles: Array<{ code: string }> }>(accessToken);
    const primaryRole = decoded.roles[0]?.code; // Get the primary role code

    if (primaryRole) {
      sessionStorage.setItem("userRole", primaryRole); // Storing role as a string
      setIsAuthenticated(true);
      setUserRole(primaryRole);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUserRole("");
    showLoginModal();
  };

  const attemptTokenRefresh = useCallback(async () => {
    try {
      await refreshAccessToken();
      window.location.reload(); // Refresh the page or re-initiate component state after successful token refresh
    } catch {
      logout(); // If the refresh attempt fails, log the user out
    }
  }, []);

   useEffect(() => {
     const handleAuthRefreshFailed = () => {
       logout();
       showLoginModal();
     };

     // Add the event listener for handling refresh token failure
     window.addEventListener("authRefreshFailed", handleAuthRefreshFailed);

     const token = sessionStorage.getItem("accessToken");
     if (token) {
       try {
         const decoded = jwtDecode<{ roles: Array<{ code: string }> }>(token);
         const primaryRole = decoded.roles[0]?.code; // Get the primary role code
         if (primaryRole) {
           setIsAuthenticated(true);
           setUserRole(primaryRole);
         }
       } catch (error) {
         console.error("Token decoding failed:", error);
         // Token might be expired or invalid, attempt to refresh it
         attemptTokenRefresh();
       }
     }
     // Cleanup the event listener on component unmount
     return () => {
       window.removeEventListener("authRefreshFailed", handleAuthRefreshFailed);
     };
   }, [logout, showLoginModal, attemptTokenRefresh]); // Make sure to include dependencies here
  
   

   return (
     <AuthContext.Provider
       value={{
         isAuthenticated,
         userRole,
         login,
         logout,
         showLoginModal,
         closeModal,
         attemptTokenRefresh,
       }}
     >
       {children}
     </AuthContext.Provider>
   );
 }

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export default AuthProvider;