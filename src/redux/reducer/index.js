import { combineReducers } from "redux";
import userReducer from "./userResducer";

export default combineReducers({
  user: userReducer,
});
