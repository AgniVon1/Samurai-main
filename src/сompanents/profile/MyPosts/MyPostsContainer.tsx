import React from 'react';
import {addNewPost, ProfileActionType} from "../../../store/profile/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {RootStateType} from "../../../store/store";

const mapStateToProps = (state:RootStateType) =>{
    return {
        profilePage:state.profilePage
    }
};

const mapDispatchToProps = (dispatch:(action:ProfileActionType)=> void) =>{
    return {
        addPost:(newPost:string) => { dispatch(addNewPost(newPost))},
    }
};

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)


