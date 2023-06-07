import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import {Provider} from "react-redux";
import App from "./features/App/App";
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);




