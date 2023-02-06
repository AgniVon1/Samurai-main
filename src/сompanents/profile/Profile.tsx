import React from 'react';
import styles from './profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";



export type ProfilePropsType = {
    profile:ProfileType | null
}


export const Profile: React.FC<ProfilePropsType> = ({profile}) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo profile = {profile}/>
            <MyPostsContainer/>
        </div>
    );
};

