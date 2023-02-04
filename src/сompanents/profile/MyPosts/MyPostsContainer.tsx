import React from 'react';
import {ActionType} from "../../../redux/state";
import {addNewPostAC, changeTextNewPostAC} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {rootStateType} from "../../../redux/redux-store";


const mapStateToProps = (state:rootStateType) =>{
    return {
        profilePage:state.profilePage
    }
};
const mapDispatchToProps = (dispatch:(action:ActionType)=> void) =>{
    return {
        addPost:() => { dispatch(addNewPostAC())},
        onNewPost:(text:string) =>{dispatch(changeTextNewPostAC(text))}
    }
};
export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)


