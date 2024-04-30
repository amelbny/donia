import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { axiosPrivate } from "../api/axios";
import {
  UserContextType,
  UserProfileInfo,
  defaultState,
  defaultUserImage,
} from "../Components/services/UserTypes";



const UserContext = createContext<UserContextType>(defaultState);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<UserProfileInfo | null>(null);


const setUser = useCallback((newUserData: Partial<UserProfileInfo>) => {
  setUserState((currentUserData) => {
    return {
      ...currentUserData,
      ...newUserData, 
    } as UserProfileInfo; 
  });
}, []);

 const updateUser = useCallback(
   (newUserData: Partial<UserProfileInfo>) => {
     setUser(newUserData);
   },
   [setUser]
 );

 const loadUserProfile = async () => {
   try {
     const response = await axiosPrivate.get(
       "http://localhost:3000/api/v1/profile/my"
     );
     const userData = response.data.data;
     setUser({
       ...userData,
       profilePicUrl: userData.profilePicUrl || defaultUserImage,
     });
   } catch (error) {
     console.error("Failed to fetch user profile", error);
   }
 };



  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
