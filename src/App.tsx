import './App.css';
import {Header} from "./сompanents/header/Header";
import {Navbar} from "./сompanents/navbar/Navbar";
import {Profile} from "./сompanents/profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {Dialogs} from "./сompanents/dialogs/Dialogs";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="App__gird">
                    <Header/>
                    <Navbar/>
                    <div className="App_content">
                        <Route path={"/profile"} component={Profile}/>
                        <Route path={"/dialogs"} component={Dialogs}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
