import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import weatherReduser from "./reducers/weatherReducer";

const rootReducer = combineReducers({
  weatherReduser
  });


const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25
  });
  
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  window.store = store;
  export default store;