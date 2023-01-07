import React, {ChangeEvent} from 'react';
import styles from './profile.module.css'
import {Post, PostType} from "./post/Post";
import {ActionType} from "../../redux/state";
import {addNewPostAC, changeTextNewPostAC} from "../../redux/profile-reducer";



export type ProfilePropsType = {
    posts: Array<PostType>,
    dispatch:(action:ActionType)=>void,
    text: string,
}

export const Profile: React.FC<ProfilePropsType> = (props) => {

    const mappedPosts = props.posts.map((p) => <Post id={p.id} likeCounts={p.likeCounts} message={p.message}/>)

    const addPostOnClickHandler = () =>{
        alert("addPost was called")
        props.dispatch( addNewPostAC())
        props.dispatch( changeTextNewPostAC(""))

    }
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        props.dispatch( changeTextNewPostAC(e.currentTarget.value))
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

