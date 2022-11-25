import React from 'react';
import styles from './profile.module.css'
import {Post, PostType} from "./post/Post";


export type ProfileType = {
    posts: Array<PostType>,
}

export const Profile: React.FC<ProfileType> = (props) => {

    const mappedPosts = props.posts.map((p) => <Post id={p.id} likeCounts={p.likeCounts} message={p.message}/>)

    return (
        <div className={styles.profile}>
            {/*AVA + descripthion*/}
            {mappedPosts}
        </div>
    );
};

