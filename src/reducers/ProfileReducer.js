import { actions } from "./actions";

const initialState = {
    user: null,
    blogs: [],
    loading: false,
    error: null,
};

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                user: action.payload,
                blogs: action.payload.blogs,
            };
        }

        case actions.profile.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.profile.USER_DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        }

        case actions.profile.IMAGE_UPDATED: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.payload.avatar,
                },
            };
        }

        case actions.profile.BLOG_DELETED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    blogs: action.payload,
                },
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, profileReducer };
