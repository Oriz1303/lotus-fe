import * as PostAction from "./post.actionType";

const initialState = {
  loading: false,
  error: null,
  post: null,
  data: null,
  posts: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request type BEGIN
    case PostAction.POST_CREATE_REQUEST:
    case PostAction.POST_DELETE_REQUEST:
    case PostAction.USER_LIKE_POST_REQUEST:
    case PostAction.LIKE_POST_REQUEST:
    case PostAction.SHARED_POST_REQUEST:
    case PostAction.FIND_POST_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    // Request type END

    // Success type BEGIN
    case PostAction.POST_CREATE_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [action.payload, ...state.posts],
      };

    case PostAction.GET_ALL_POSTS_SUCCESS:
    case PostAction.GET_USERS_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
      };

    case PostAction.USER_LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedPost: action.payload,
      };

    case PostAction.LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        like: action.payload,
      };

    case PostAction.POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case PostAction.SHARED_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        shared: action.payload,
      };

    case PostAction.FIND_POST_BY_ID_SUCCESS:
    case PostAction.COMMENT_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    // Success type END

    // Failure type BEGIN
    case PostAction.POST_CREATE_FAILURE:
    case PostAction.POST_DELETE_FAILURE:
    case PostAction.USER_LIKE_POST_FAILURE:
    case PostAction.LIKE_POST_FAILURE:
    case PostAction.SHARED_POST_FAILURE:
    case PostAction.FIND_POST_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Failure type END

    default:
      return state;
  }
};
