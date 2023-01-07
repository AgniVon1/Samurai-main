import React, {ChangeEvent, useState} from 'react';
import styles from './profile.module.css'
import {Post, PostType} from "./post/Post";
import {ActionType, addPostAC, changeTextAC} from "../../redux/state";



export type ProfilePropsType = {
    posts: Array<PostType>,
    dispatch:(action:ActionType)=>void,
    text: string,
}

export const Profile: React.FC<ProfilePropsType> = (props) => {

    const mappedPosts = props.posts.map((p) => <Post id={p.id} likeCounts={p.likeCounts} message={p.message}/>)

    const addPostOnClickHandler = () =>{
        alert("addPost was called")
        props.dispatch( addPostAC())
        props.dispatch( changeTextAC(""))

    }
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        props.dispatch( changeTextAC(e.currentTarget.value))
    }

    return (
        <div className={styles.profile}>
            <div>
                <div>
                    <textarea onChange={onChangeHandler} value={props.text}></textarea>
                </div>
                <div>
                    <button onClick={addPostOnClickHandler}>Add post</button>
                </div>
            </div>
            {mappedPosts}
        </div>
    );
};

