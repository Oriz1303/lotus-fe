import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from "./Message/message.reducer";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";


const rootReducers = combineReducers({
  auth: authReducer,
  postStore: postReducer,
  chat: chatReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
