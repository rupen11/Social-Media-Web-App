import getUserReducer from "./getUser";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    getUserReducer
})

export default rootReducer;