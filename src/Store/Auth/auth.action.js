import axios from "axios";
import { API_BASE_URL, api } from "../../configApi/config";
import * as AuthAction from "./auth.actionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("loginUser", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: AuthAction.LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: AuthAction.LOGIN_USER_FAILURE, payload: error });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: AuthAction.REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: AuthAction.REGISTER_USER_FAILURE, payload: error });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: AuthAction.GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AuthAction.GET_USER_PROFILE_FAILURE, payload: error });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    console.log("findUserById", data);
    dispatch({ type: AuthAction.FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AuthAction.FIND_USER_BY_ID_FAILURE, payload: error });
  }
};

export const updateUserProfile = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, requestData);
    console.log("updateUserProfile DATA, ", data);
    dispatch({ type: AuthAction.UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("updateUserProfile ERROR, ", error);
    dispatch({ type: AuthAction.UPDATE_USER_FAILURE, payload: error });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log("followUserAction DATA, ", data);
    dispatch({ type: AuthAction.FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("followUserAction ERROR, ", error);
    dispatch({ type: AuthAction.FOLLOW_USER_FAILURE, payload: error });
  }
};

export const searchUser = (query) => async (dispatch) => { 
  try {
    const { data } = await api.get(`/api/users/search?search=${query}`);
    console.log("searchUser", data);
    dispatch({ type: AuthAction.SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AuthAction.SEARCH_USER_FAILURE, payload: error });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");

  dispatch({ type: AuthAction.LOGOUT, payload: null });
};
