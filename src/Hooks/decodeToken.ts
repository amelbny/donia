import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    roles: Array<{
        _id: string;
        code: string;
    }>;
    id: string;
}

const DecodeTokenAndGetRole = (token: string): string => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        
        // Assuming the roles are stored in an array and you're interested in the 'code' of the first role
        const primaryRole = decoded.roles && decoded.roles.length > 0 ? decoded.roles[0].code : 'USER';

        return primaryRole;
    } catch (error) {
        console.error("Failed to decode token or find role:", error);
        return 'USER'; 
    }
};

export { DecodeTokenAndGetRole };

const getUseId = (token: string): string => {
    try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token); 
        const userId = decoded.id
        return userId;
    }catch (error) {
        console.error("Failed to decode token or find user ID:", error);
        return ''; 
    }
    

}
export { getUseId };


