import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import {Provider} from "react-redux";
import App from "./features/App/App";
import {HashRouter} from "react-router-dom";
import store from "./store/store";


ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
    ,
    document.getElementById('root')
);




