import * as AuthAction from "./auth.actionType";

const initialState = {
  loading: false,
  error: null,
  jwt: null,
  user: null,
  searchUser: []
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request type BEGIN
    case AuthAction.LOGIN_USER_REQUEST:
    case AuthAction.REGISTER_USER_REQUEST:
    case AuthAction.GET_USER_PROFILE_REQUEST:
    case AuthAction.SEARCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    // Request type BEGIN

    // Success type BEGIN
    case AuthAction.LOGIN_USER_SUCCESS:
    case AuthAction.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action.payload,
      };

    case AuthAction.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };

    case AuthAction.UPDATE_USER_SUCCESS:
    case AuthAction.FIND_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case AuthAction.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case AuthAction.SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchUser: action.payload,
      };

    // Success type END

    case AuthAction.LOGOUT:
      return initialState;

    // Failure type BEGIN
    case AuthAction.LOGIN_USER_FAILURE:
    case AuthAction.REGISTER_USER_FAILURE:
    case AuthAction.GET_USER_PROFILE_FAILURE:
    case AuthAction.SEARCH_USER_FAILURE:
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
