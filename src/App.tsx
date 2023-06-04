import './App.css';
import {Navbar} from "./сompanents/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import React, {lazy, Suspense, useEffect} from "react";
import HeaderContainer from "./сompanents/header/HeaderContainer";
import {LoginContainer} from "./сompanents/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./store/app/app-reducer";
import {Preloader} from "./common/UI/Preloader/Preloader";
import {Profile} from "./сompanents/profile/Profile";
import {RootStateType} from "./store/store";


const DialogsContainer = lazy(() => import('./сompanents/dialogs/Dialog/DialogsContainer'));
const UsersContainer = lazy(() => import('./сompanents/Users/UsersContainer'));

type PropsType = {
    isInitApp: boolean,
    initializeApp: () => void
}

const App: React.FC<PropsType> = ({isInitApp, initializeApp}) => {

    useEffect(() => {
        initializeApp()
    }, []);

    if (!isInitApp) return (<Preloader/>)

    return (
        <div className="App">
            <div className="App__gird">
                <HeaderContainer/>
                <Navbar/>
                <div className="App_content">

                    <Routes>
                        <Route path={"/dialogs"}
                               element={<Suspense fallback={<Preloader/>}>
                                   <DialogsContainer/>
                               </Suspense>
                               }/>
                        <Route path={'/profile/*'} element={<Profile/>}>
                            <Route path={':userId'} element={<Profile/>}/>
                        </Route>

                        <Route path={"/login"}
                               element={<LoginContainer/>}/>
                        <Route path={"/users"} element={
                            <Suspense fallback={<Preloader/>}>
                                <UsersContainer/>
                            </Suspense>
                        }/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootStateType) => ({
    isInitApp: state.app.initialized
})

export default compose<React.ComponentType>(
    /*withRouter,*/
    connect(mapStateToProps, {initializeApp}),)
(App)

