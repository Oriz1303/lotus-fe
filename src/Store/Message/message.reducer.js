import * as MessageAction from "./message.actionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MessageAction.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case MessageAction.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [action.payload, ...state.chats],
      };

    case MessageAction.GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      };

    default:
      return state;
  }
};
