import React, {ChangeEvent} from 'react';
import {Post} from "./Posts/Post";
import {ProfilePageType} from "../../../redux/profile-reducer";


export type MyPostsPropsType = {
    profilePage: ProfilePageType,
    addPost: () => void,
    onNewPost: (text: string) => void,
}

export const MyPosts: React.FC<MyPostsPropsType> = ({
                                                        profilePage:
                                                            {
                                                                posts: posts,
                                                                text: textNewPost
                                                            },
                                                        addPost,
                                                        onNewPost,
                                                    }) => {
    const mappedPosts = posts.map((p) => <Post  key = {p.id} id={p.id} likeCounts={p.likeCounts} message={p.message}/>)
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onNewPost(e.currentTarget.value)
    }
    const addPostOnClickHandler = () => {
        addPost()
    }
    return (

        <div>
            <div>
                <textarea onChange={onChangeHandler} value={textNewPost}></textarea>
            </div>
            <div>
                <button onClick={addPostOnClickHandler}>Add post</button>
            </div>
            {mappedPosts}
        </div>


    );
};

