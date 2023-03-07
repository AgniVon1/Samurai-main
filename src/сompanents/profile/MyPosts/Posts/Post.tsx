import React from 'react';
import styles from './post.module.css'
import {updateUserStatus} from "../../../../redux/profile-reducer";


export type PostPropsType = {
    id:string,
    message:string,
    likeCounts:number,
}

export const Post:React.FC<PostPropsType> = (props) => {
    return (
        <div className={styles.post}>
            {props.message}
        </div>
    );
};

