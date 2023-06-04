import React from 'react';
import styles from './profile.module.css'
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useLoginRedirect} from "../../common/hooks/useLoginRedirect";


export const Profile: React.FC = () => {

    useLoginRedirect()

    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};

