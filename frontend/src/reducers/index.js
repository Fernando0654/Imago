import { combineReducers } from "redux";
import photos from "./photos";
import translated from "./trans";
import results from "./results";
import model from "./model";

export default combineReducers({ photos, translated, results, model });
