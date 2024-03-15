import { actions } from "./actions";

const initialState = {
    blogs: null,
    loading: false,
    error: null,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }
        case actions.blog.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                blogs: action.payload,
            };
        }
        case actions.blog.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.blog.BLOG_DELETED: {
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        }

        case actions.blog.COMMENT_POSTED: {
            return {
                ...state,
                loading: false,
                blogs: {
                    ...action.payload,
                    isFavourite: state.blogs.isFavourite,
                },
            };
        }

        case actions.blog.COMMENT_DELETED: {
            return {
                ...state,
                blogs: action.payload,
            };
        }

        case actions.blog.BLOG_LIKED: {
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    isLiked: action.payload.isLiked,
                    likes: action.payload.likes,
                },
            };
        }

        case actions.blog.BLOG_FAVORITE: {
            return {
                ...state,
                blogs: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, blogReducer };
