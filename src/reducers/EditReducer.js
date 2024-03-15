import { actions } from "./actions";

const initialState = {
    blog: null,
};

const editReducer = (state, action) => {
    switch (action.type) {
        case actions.edit.EDIT_BLOG: {
            return {
                ...state,
                blog: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export { initialState, editReducer };
