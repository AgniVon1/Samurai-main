import React from 'react';
import styles from './profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";



export type ProfilePropsType = {
}


export const Profile: React.FC<ProfilePropsType> = () => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};

