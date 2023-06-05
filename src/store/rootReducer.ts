import {combineReducers} from "redux";
import dialogReducer from "./dialog/dialog-reducer";
import profileReducer from "./profile/profile-reducer";
import usersReducer from "./users/users-reducer";
import authReducer from "./auth/auth-reducer";
import {appReducer} from "./app/app-reducer";
import reducer from "redux-form/lib/reducer";
import chatReducer from "./chat/chat-reducer";
import messagesReducer from "./message/mesage-reducer";

export const rootReducer = combineReducers({
    dialog: dialogReducer,
    messages: messagesReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
    app: appReducer,
    form: reducer,
    chat: chatReducer,
})