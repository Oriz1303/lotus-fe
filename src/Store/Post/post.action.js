import { api } from "../../configApi/config";
import * as PostAction from "./post.actionType";

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: PostAction.GET_ALL_POSTS_REQUEST });
  try {
    const { data } = await api.get("/api/posts/");
    console.log("All posts, ", data);
    dispatch({ type: PostAction.GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllPosts error ", error);
    dispatch({
      type: PostAction.GET_ALL_POSTS_FAILURE,
      payload: error.message,
    });
  }
};

export const getUsersPost = (userId) => async (dispatch) => {
  dispatch({ type: PostAction.GET_USERS_POST_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    console.log("Users Post, ", data);
    dispatch({ type: PostAction.GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("getUsersPost error ", error);
    dispatch({
      type: PostAction.GET_USERS_POST_FAILURE,
      payload: error.message,
    });
  }
};

export const findPostByLikeContainerUser = (userId) => async (dispatch) => {
  dispatch({ type: PostAction.USER_LIKE_POST_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/likes`);
    console.log("findPostByLikeContainerUser posts data, ", data);
    dispatch({ type: PostAction.USER_LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("findPostByLikeContainerUser error ", error);
    dispatch({
      type: PostAction.USER_LIKE_POST_FAILURE,
      payload: error.message,
    });
  }
};

export const findPostById = (postId) => async (dispatch) => {
  dispatch({ type: PostAction.FIND_POST_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    console.log("get Post by Id, ", data);
    dispatch({ type: PostAction.FIND_POST_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("findPossById error ", error);
    dispatch({
      type: PostAction.FIND_POST_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const createPost = (postData) => async (dispatch) => {
  dispatch({ type: PostAction.POST_CREATE_REQUEST });
  try {
    const { data } = await api.post(`/api/posts/create`, postData);
    console.log("Data of create post method, ", data);
    dispatch({ type: PostAction.POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log("createPost error ", error);
    dispatch({ type: PostAction.POST_CREATE_FAILURE, payload: error.message });
  }
};

export const createPostComment = (postData) => async (dispatch) => {
  dispatch({ type: PostAction.COMMENT_POST_REQUEST });
  try {
    const { data } = await api.post(`/api/posts/comment`, postData);
    console.log("Data of createPostComment method, ", data);
    dispatch({ type: PostAction.COMMENT_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("createPostComment error ", error);
    dispatch({ type: PostAction.COMMENT_POST_FAILURE, payload: error.message });
  }
};

export const createSharedPost = (postId) => async (dispatch) => {
  dispatch({ type: PostAction.SHARED_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/${postId}/shared`);
    console.log("Data of createSharedPost method, ", data);
    dispatch({ type: PostAction.SHARED_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("createSharedPost error ", error);
    dispatch({ type: PostAction.SHARED_POST_FAILURE, payload: error.message });
  }
};

export const likePost = (postId) => async (dispatch) => {
  dispatch({ type: PostAction.LIKE_POST_REQUEST });
  try {
    const { data } = await api.post(`/api/${postId}/likes`);
    console.log("Data of likePost method, ", data);
    dispatch({ type: PostAction.LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("likePost error ", error);
    dispatch({ type: PostAction.LIKE_POST_FAILURE, payload: error.message });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: PostAction.POST_DELETE_REQUEST });
  try {
    const { data } = await api.delete(`/api/posts/${postId}`);
    console.log("Data of deletePost method, ", data);
    dispatch({ type: PostAction.POST_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log("deletePost error ", error);
    dispatch({ type: PostAction.POST_DELETE_FAILURE, payload: error.message });
  }
};
