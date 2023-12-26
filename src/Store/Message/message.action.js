import { api } from "../../configApi/config";
import * as action from "./message.actionType";

export const createMessage = (requestData) => async (dispatch) => {
  dispatch({ type: action.CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(
      `/api/messages/chat/${requestData.message.chatId}`,
      requestData.message
    );
    requestData.sendMessageToServer(data);
    console.log("created message data", data);
    dispatch({ type: action.CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("create message error", error);
    dispatch({ type: action.CREATE_MESSAGE_FAILURE, payload: error });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: action.CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post(`/api/chats`, chat);
    console.log("created chat data", data);
    dispatch({ type: action.CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("create chat error", error);
    dispatch({ type: action.CREATE_CHAT_FAILURE, payload: error });
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: action.GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await api.get(`/api/chats`);
    console.log("get all chats data", data);
    dispatch({ type: action.GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    console.log("get all chat error", error);
    dispatch({ type: action.GET_ALL_CHATS_FAILURE, payload: error });
  }
};
