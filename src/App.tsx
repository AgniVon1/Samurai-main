import './App.css';
import {Header} from "./сompanents/header/Header";
import {Navbar} from "./сompanents/navbar/Navbar";
import {Profile, ProfilePropsType} from "./сompanents/profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {Dialogs, DialogsPropsType} from "./сompanents/dialogs/Dialogs";
import React from "react";
import {ActionType, StateType} from "./redux/state";

type AppType = {
    state: StateType,
    dispatch:(action:ActionType)=>void,
}

const App: React.FC<AppType> = (props) => {

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
                               render={() => <Dialogs  messages={props.state.messagePage.messages} dialogs={props.state.messagePage.dialogs}/>}/>
                        <Route path={"/profile"} render={() => <Profile posts={props.state.profilePage.posts} dispatch = {props.dispatch} text = {props.state.profilePage.text}/>}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
