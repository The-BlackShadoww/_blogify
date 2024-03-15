import { useReducer } from "react";
import { BlogToEdit } from "../context";
import { editReducer, initialState } from "../reducers/EditReducer";

const EditProvider = ({ children }) => {
    const [editState, editDispatch] = useReducer(editReducer, initialState);

    return (
        <BlogToEdit.Provider value={{ editState, editDispatch }}>
            {children}
        </BlogToEdit.Provider>
    );
};

export default EditProvider;
