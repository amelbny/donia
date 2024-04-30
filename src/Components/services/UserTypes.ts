export type UserProfileInfo = {
    email: string;
    firstname: string;
    lastname: string;
    profilePicUrl: string;
}

export const defaultUserImage = "https://example.com/path-to-default-avatar.png"; 

export const defaultUserProfile: UserProfileInfo = {
  email: "", 
  firstname: "", 
  lastname: "", 
  profilePicUrl: defaultUserImage
};

export interface UserContextType {
  user: UserProfileInfo | null;
  setUser: (newUserData: Partial<UserProfileInfo>) => void;
  updateUser: (newUserData: Partial<UserProfileInfo>) => void;
}



export const defaultState = {
   user: null,
  setUser: () => {},  
  updateUser: () => {},
};