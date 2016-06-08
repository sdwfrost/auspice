import { combineReducers } from "redux";
import metadata from "./metadata";
import tree from "./tree";
import sequences from "./sequences";
import frequencies from "./frequencies";
import entropy from "./entropy";


const rootReducer = combineReducers({
  metadata,
  tree,
  sequences,
  frequencies,
  entropy
});

export default rootReducer;
