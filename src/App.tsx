import './App.css';
import {Navbar} from "./сompanents/navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import DialogsContainer from "./сompanents/dialogs/Dialog/DialogsContainer";
import UsersContainer from "./сompanents/Users/UsersContainer";
import ProfileContainer from "./сompanents/profile/ProfileContainer";
import HeaderContainer from "./сompanents/header/HeaderContainer";
import {LoginContainer} from "./сompanents/login/Login";



type AppType = {}

const App: React.FC<AppType> = () => {

    return (
        <BrowserRouter>
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
                               render={() => <ProfileContainer />}/>
                        <Route path={"/login"}
                               render={() => <LoginContainer />}/>
                        <Route path={"/users"}  render={() => <UsersContainer/>}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
