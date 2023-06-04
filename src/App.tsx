import './App.css';
import {Navbar} from "./сompanents/navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import React, {useEffect} from "react";
import DialogsContainer from "./сompanents/dialogs/Dialog/DialogsContainer";
import UsersContainer from "./сompanents/Users/UsersContainer";
import ProfileContainer from "./сompanents/profile/ProfileContainer";
import HeaderContainer from "./сompanents/header/HeaderContainer";
import {LoginContainer} from "./сompanents/login/Login";
import {connect, useDispatch} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {RootStateType} from "./redux/redux-store";
import {Preloader} from "./сompanents/common/preloader/Preloader";



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
                               render={() => <DialogsContainer/>}/>
                        <Route path={"/profile/:userId?"}
                               render={() => <ProfileContainer/>}/>
                        <Route path={"/login"}
                               render={() => <LoginContainer/>}/>
                        <Route path={"/users"} render={() => <UsersContainer/>}/>
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

