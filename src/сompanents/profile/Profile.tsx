import React from 'react';
import styles from './profile.module.css'
import {Post} from "./post/Post";


export const Profile = () => {
    return (
        <div className={styles.profile}>

           {/*AVA + descripthion*/}



            <Post message={"rest"}/>
        </div>
    );
};

