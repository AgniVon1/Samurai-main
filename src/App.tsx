import './App.css';
import {Header} from "./сompanents/header/Header";
import {Navbar} from "./сompanents/navbar/Navbar";
import {Profile, ProfilePropsType} from "./сompanents/profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {Dialogs, DialogsPropsType} from "./сompanents/dialogs/Dialogs";
import React from "react";

type AppType = {
    state: {
        profilePage:ProfilePropsType,
        messagePage:DialogsPropsType,
    }
}

const App: React.FC<AppType> = ({state:{profilePage,messagePage}}) => {

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
                               render={() => <Dialogs  messages={messagePage.messages} dialogs={messagePage.dialogs}/>}/>
                        <Route path={"/profile"} render={() => <Profile posts={profilePage.posts}/>}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
