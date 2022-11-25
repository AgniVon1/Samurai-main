import './App.css';
import {Header} from "./сompanents/header/Header";
import {Navbar} from "./сompanents/navbar/Navbar";
import {Profile} from "./сompanents/profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {Dialogs} from "./сompanents/dialogs/Dialogs";
import React from "react";
import {PostType} from "./сompanents/profile/post/Post";
import {MessagePropsType} from "./сompanents/dialogs/Dialog/Message";
import {DialogPropsType} from "./сompanents/dialogs/Dialog/Dialog";

type AppType = {
    posts: Array<PostType>,
    messages:Array<MessagePropsType>,
    dialogs:Array<DialogPropsType>
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

                        <Route path={"/dialogs"} render={() => <Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                        <Route path={"/profile"} render={() => <Profile posts={props.posts}/>}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
