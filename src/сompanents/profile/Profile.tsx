import React from 'react';
import styles from './profile.module.css'
import {Post} from "./post/Post";
import {v1} from "uuid";


export const Profile = () => {
    return (
        <div className={styles.profile}>

           {/*AVA + descripthion*/}



            <Post id = {v1()} likeCounts={0} message={"rest"}/>
        </div>
    );
};

