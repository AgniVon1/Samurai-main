import {combineReducers, createStore} from 'redux'

import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";

const reducers = combineReducers({
    messagePage: messageReducer,
    profilePage: profileReducer,
})
const store = createStore(reducers);

export default store