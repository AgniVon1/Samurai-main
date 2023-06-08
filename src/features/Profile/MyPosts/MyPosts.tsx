import React, {useState} from 'react';
import {Post} from "./Posts/Post";
import {ProfilePageType} from "../../../store/profile/profile-reducer";
import s from "./myPosts.module.css"
import {FormDataType, SendMessageForm} from "../../../common/UI/MessageForm/MessageForm";

export type PropsType = {
    profilePage: ProfilePageType,
    addPost: (newPost:string) => void,
}

export const MyPosts: React.FC<PropsType> = React.memo( ({
                                                        profilePage:
                                                            {
                                                                posts: posts,
                                                            },
                                                        addPost,
                                                    }) => {
    const mappedPosts = posts.map((p) => <Post  key = {p.id} post = {p}/>)
    const [error, setError] = useState("")

    const addNewPost = (message: string) => {
        if (!message.trim()) setError("Your post is empty!")
        else {
            addPost(message)
            setError("")
        }

    }
    return (
            <div className={s.wrapper}>
                <div className={s.addBlock}>
                    <SendMessageForm
                        placeholder={'Write a post...'}
                        onSubmit={addNewPost}
                    />
                    <div className={s.error}>{error}</div>
                </div>
                {mappedPosts}
            </div>
    );
})

