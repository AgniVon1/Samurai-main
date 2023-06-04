import {combineReducers} from "redux";
import dialogReducer from "./dialog/dialog-reducer";
import profileReducer from "./profile/profile-reducer";
import usersReducer from "./users/users-reducer";
import authReducer from "./auth/auth-reducer";
import {appReducer} from "./app/app-reducer";
import {reducer as formReducer} from "redux-form/lib/reducer";

export const reducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
    app:appReducer,
    form: formReducer,
})