import React from 'react';
import {ActionType, profilePageType} from "../../../redux/state";
import {addNewPostAC, changeTextNewPostAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";


export type MyPostsContainerType = {
    state: profilePageType,
    dispatch: (action: ActionType) => void,
}

export const MyPostsContainer: React.FC<MyPostsContainerType> = ({
                                                                 state: {text, posts},
                                                                 dispatch,

                                                             }) => {
    const addPost = () => {
        dispatch(addNewPostAC())
    }
    const onNewPost = (text:string) => {
        dispatch(changeTextNewPostAC(text))
    }

    return (
        <MyPosts addPost={addPost} onNewPost={onNewPost} textNewPost={text} posts={posts}/>
    );
};

