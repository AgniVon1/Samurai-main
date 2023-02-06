import './App.css';
import {Header} from "./сompanents/header/Header";
import {Navbar} from "./сompanents/navbar/Navbar";
import {Profile} from "./сompanents/profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import DialogsContainer from "./сompanents/dialogs/Dialog/DialogsContainer";
import UsersContainer from "./сompanents/Users/UsersContainer";
import ProfileContainer from "./сompanents/profile/ProfileContainer";



type AppType = {}

const App: React.FC<AppType> = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="App__gird">
                    <Header/>
                    <Navbar/>
                    <div className="App_content">
                        {/* <Route path={"/profile"} component={Profile}/>
                        <Route path={"/dialogs"} component={Dialogs}/>*/}
                        <Route path={"/dialogs"}
                               render={() => <DialogsContainer/>}/>
                        <Route path={"/profile"}
                               render={() => <ProfileContainer />}/>

                            <Route path={"/users"}  render={() => <UsersContainer/>}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
