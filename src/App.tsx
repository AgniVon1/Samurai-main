import './App.css';
import {Header} from "./сompanents/header/Header";
import {Navbar} from "./сompanents/navbar/Navbar";
import {Profile} from "./сompanents/profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {Dialogs} from "./сompanents/dialogs/Dialogs";
import React from "react";
import {ActionType,StateType} from "./redux/state";


type AppType = {
    state:StateType
    dispatch: (action: ActionType) => void
}

const App: React.FC<AppType> = ({
                                    state,
                                    dispatch
                                }) => {

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
                               render={() => <Dialogs messages={state.messagePage.messages}
                                                      dialogs={state.messagePage.dialogs}
                                                      textNewMess={state.messagePage.textNewMess}
                                                      dispatch={dispatch}/>}/>
                        <Route path={"/profile"}
                               render={() => <Profile state={state.profilePage} dispatch={dispatch}/>}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
