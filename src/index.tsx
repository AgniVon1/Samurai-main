import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {v1} from "uuid";


const posts = [
    {id:v1(),message:"mes0", likeCounts:0},
    {id:v1(),message:"mes1", likeCounts:0},
    {id:v1(),message:"mes2", likeCounts:0},
    {id:v1(),message:"mes3", likeCounts:0},
    {id:v1(),message:"mes4", likeCounts:0},
    {id:v1(),message:"mes5", likeCounts:0},
]

let messages =[
    {message:{id: v1() , text: "cooбщение0"}},
    {message:{id: v1() , text: "cooбщение1"}},
    {message:{id: v1() , text: "cooбщение2"}},
    {message:{id: v1() , text: "cooбщение3"}},
    {message:{id: v1() , text: "cooбщение4"}},
    {message:{id: v1() , text: "cooбщение5"}},
]

let dialogs = [
    {id: v1() , name: "Mark"},
    {id: v1() , name: "Tom"},
    {id: v1() , name: "Mercava"},
]
ReactDOM.render(
    <App posts = {posts} dialogs={dialogs} messages={messages}/>,
  document.getElementById('root')
);