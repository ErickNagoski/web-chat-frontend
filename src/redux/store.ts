import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import sessionReducer from "./session";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  auth: persistReducer({ key: "auth", storage }, authReducer),
  session: sessionReducer,
});

export const store = configureStore({
  reducer,
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
