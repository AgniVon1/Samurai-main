import React, {useEffect} from 'react';
import styles from './profile.module.css'
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {selectIsAuth} from "../../store/auth/auth-selectors";


export const Profile: React.FC = () => {

    const navigate = useNavigate()
    const isAuth = useAppSelector(selectIsAuth)

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, [isAuth])

    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};

