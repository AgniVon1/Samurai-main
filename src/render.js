import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost,changeText} from "./redux/state";


export const rerenderTree = (state) => {
    ReactDOM.render(
        <App state={state} addPost={addPost} changeText = {changeText}></App>,
        document.getElementById('root')
    );
}