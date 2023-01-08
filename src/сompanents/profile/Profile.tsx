import React from 'react';
import styles from './profile.module.css'
import {ActionType, profilePageType} from "../../redux/state";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export type ProfilePropsType = {
    state:profilePageType,
    dispatch:(action:ActionType)=>void,
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (

        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer state = {props.state} dispatch={props.dispatch}/>
        </div>
    );
};

