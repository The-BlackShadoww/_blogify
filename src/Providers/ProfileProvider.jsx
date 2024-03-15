import { useReducer } from "react";
import { initialState, profileReducer } from "../reducers/ProfileReducer";
import { ProfileContext } from "../context";


const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initialState);
    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
