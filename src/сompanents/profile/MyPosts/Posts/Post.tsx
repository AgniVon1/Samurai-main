import React from 'react';
import styles from './post.module.css'

type PropsType = {
    id:string,
    message:string,
    likeCounts:number,
}

export const Post:React.FC<PropsType> = (props) => {
    return (
        <div className={styles.post}>
            {props.message}
        </div>
    );
};

