import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "../../Dialogs/Dialogs";
import s from "../Routes/routers.module.css"
import {Profile} from "../../Profile/Profile";
import {LoginContainer} from "../../Login/Login";
import {ChatPage} from "../../Chat/ChatPage";
import {Users} from "../../Users/Users";

export const AppRoutes: React.FC = () => (
    <div className={s.content}>
        <Routes>
            <Route path={"/dialogs/*"}
                   element={<Dialogs/>
                   }>
                <Route path={':dialogId'} element={<Dialogs/>}/>
            </Route>
            <Route path={'/profile/*'} element={<Profile/>}>
                <Route path={':userId'} element={<Profile/>}/>
            </Route>
            <Route path={"/login"}
                   element={<LoginContainer/>}/>
            <Route path={"/chat"}
                   element={<ChatPage/>}/>
            <Route path={"/users"} element={<Users/>}/>
        </Routes>
    </div>
);

