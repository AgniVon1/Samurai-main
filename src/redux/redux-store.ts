import {combineReducers, createStore} from 'redux'

import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import {messagePageType, profilePageType} from "./state";

const reducers = combineReducers({
    messagePage: messageReducer,
    profilePage: profileReducer,
})
 const storeRedux = createStore(reducers);

export default storeRedux