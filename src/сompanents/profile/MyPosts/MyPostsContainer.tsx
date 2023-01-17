import React from 'react';
import {ActionType, StateType} from "../../../redux/state";
import {addNewPostAC, changeTextNewPostAC} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";


const mapStateToProps = (state:StateType) =>{
    return {
        profilePage:state.profilePage
    }
};
const mapDispathToProps = (dispatch:(action:ActionType)=> void) =>{
    return {
        addPost:() => { dispatch(addNewPostAC())},
        onNewPost:(text:string) =>{dispatch(changeTextNewPostAC(text))}
    }
};
export const MyPostsContainer = connect(mapStateToProps,mapDispathToProps)(MyPosts)


