import { combineReducers } from "redux";
import catalog from "./catalog";
import partners from "./partners"
import metrics from "./metrics"

export default combineReducers({ catalog, partners, metrics });
