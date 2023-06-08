import React from 'react';
import styles from './profile.module.css'
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useAuthRedirect} from "../../common/hooks/useAuthRedirect";


export const Profile: React.FC = () => {

    useAuthRedirect()

    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};

