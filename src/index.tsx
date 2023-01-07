
import {StateType, store} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



export const rerenderTree = (state:StateType) => {
    ReactDOM.render(
        <App state={state} dispatch = {store.dispatch.bind(store)}></App>,
        document.getElementById('root')
    );

}
rerenderTree(store.getState())
store.subscribe(rerenderTree)