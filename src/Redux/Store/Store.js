import { createStore } from "redux";
import LoginReducer from "../Reducer/LoginReducer";

export const store = createStore(LoginReducer)