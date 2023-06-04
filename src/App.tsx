import './App.css';
import {Navbar} from "./сompanents/navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import React, {lazy, Suspense, useEffect} from "react";

import ProfileContainer from "./сompanents/profile/ProfileContainer";
import HeaderContainer from "./сompanents/header/HeaderContainer";
import {LoginContainer} from "./сompanents/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {RootStateType} from "./redux/redux-store";
import {Preloader} from "./сompanents/common/preloader/Preloader";

const DialogsContainer = lazy(() => import('./сompanents/dialogs/Dialog/DialogsContainer'));
const UsersContainer = lazy(() => import('./сompanents/Users/UsersContainer'));

type PropsType = {
    isInitApp:boolean,
    initializeApp:() => void
}

const App: React.FC<PropsType> = ({isInitApp,initializeApp}) => {

   useEffect(() => {
       initializeApp()
    },[]);

    if (!isInitApp) return (<Preloader />)

    return (
            <div className="App">
                <div className="App__gird">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="App_content">
                        {/* <Route path={"/profile"} component={Profile}/>
                        <Route path={"/dialogs"} component={Dialogs}/>*/}
                        <Route path={"/dialogs"}
                               render={() =>
                                   <Suspense fallback={<Preloader/>}>
                                       <DialogsContainer/>
                                   </Suspense>
                        }/>
                        <Route path={"/profile/:userId?"}
                               render={() => <ProfileContainer/>}/>
                        <Route path={"/login"}
                               render={() => <LoginContainer/>}/>
                        <Route path={"/users"} render={
                            () => <Suspense fallback={<Preloader/>}>
                                    <UsersContainer/>
                                </Suspense>
                            }/>
                    </div>
                </div>
            </div>
    );
}

const mapStateToProps = (state:RootStateType) => ({
    isInitApp:state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}),)
(App)

