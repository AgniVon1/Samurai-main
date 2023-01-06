import React from 'react';
import styles from './profile.module.css'
import {Post, PostType} from "./post/Post";


export type ProfilePropsType = {
    posts: Array<PostType>,
    addPost:  () =>void,
}

export const Profile: React.FC<ProfilePropsType> = (props) => {

    const mappedPosts = props.posts.map((p) => <Post id={p.id} likeCounts={p.likeCounts} message={p.message}/>)

    const addPostOnClickHandler = () =>{
        alert("addPost was called")
        props.addPost()
    }

    return (
        <div className={styles.profile}>
            <div>

                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button onClick={addPostOnClickHandler}>Add post</button>
                </div>


            </div>
            {mappedPosts}
        </div>
    );
};

