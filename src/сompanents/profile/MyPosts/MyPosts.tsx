import React, {ChangeEvent} from 'react';
import {Post, PostPropsType} from "./Posts/Post";

export type MyPostsPropsType = {
    posts: Array<PostPropsType>,
    textNewPost: string,
    addPost: () => void,
    onNewPost: (text: string) => void,
}

export const MyPosts: React.FC<MyPostsPropsType> = ({
                                                        posts,
                                                        textNewPost,
                                                        addPost,
                                                        onNewPost,
                                                    }) => {
    const mappedPosts = posts.map((p) => <Post id={p.id} likeCounts={p.likeCounts} message={p.message}/>)
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        onNewPost(e.currentTarget.value)
    }
    const addPostOnClickHandler =()=>{
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

