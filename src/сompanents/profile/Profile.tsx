import React from 'react';
import styles from './profile.module.css'

import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType, updateUserStatus} from "../../redux/profile-reducer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";




export type ProfilePropsType = {
    profile:ProfileType | null

  status:string,
  updateUserStatus:(newStatus :string) =>void,
}


export const Profile: React.FC<ProfilePropsType> = ({status,profile,updateUserStatus}) => {

    return (
        <div className={styles.profile}>
            <ProfileInfo profile = {profile}   status ={status}  updateUserStatus = {updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    );
};

