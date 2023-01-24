import {combineReducers, createStore} from 'redux'

import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";

const reducers = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
})
const store = createStore(reducers);

export default store