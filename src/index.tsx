
import {messagePageType, StateType} from "./redux/state";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storeRedux from "./redux/redux-store";
import {Provider} from "react-redux";

const rerenderTree = (state:StateType) => {
     ReactDOM.render(
         <App state={state} dispatch={storeRedux.dispatch}></App>,
         document.getElementById('root')
     );
}
rerenderTree(storeRedux.getState())

storeRedux.subscribe(() =>  {rerenderTree(storeRedux.getState())})

