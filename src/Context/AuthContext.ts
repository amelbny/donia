import { createContext } from 'react';


export interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    showLoginModal: () => void;
    closeModal: () => void;    
    attemptTokenRefresh: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);