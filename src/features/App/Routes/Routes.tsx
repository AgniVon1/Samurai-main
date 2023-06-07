import React, {lazy} from 'react';
import {Route,Routes} from "react-router-dom";
import {Dialogs} from "../../Dialogs/Dialogs";
import s from "../Routes/routers.module.css"
import {Profile} from "../../Profile/Profile";
import {LoginContainer} from "../../Login/Login";
import ChatPage from "../../Chat/ChatPage";
import {withSuspense} from "../../../common/hoc/withSuspense";

const UsersContainer = lazy(() => import('../../Users/UsersContainer'));

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
            <Route path={"/users"} element={
                withSuspense(UsersContainer)
            }/>
        </Routes>
    </div>
);

