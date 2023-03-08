import React from 'react';

import {addNewPost, changeTextNewPost, ProfileActionType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {RootStateType} from "../../../redux/redux-store";



const mapStateToProps = (state:RootStateType) =>{
    return {
        profilePage:state.profilePage
    }
};
const mapDispatchToProps = (dispatch:(action:ProfileActionType)=> void) =>{
    return {
        addPost:() => { dispatch(addNewPost())},
        onNewPost:(text:string) =>{dispatch(changeTextNewPost(text))}
    }
};
export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)


