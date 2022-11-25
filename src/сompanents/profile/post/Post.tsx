import React from 'react';
import styles from './post.module.css'


type PostType = {
    id:string,
    message:string,
    likeCounts:number,
}

export const Post:React.FC<PostType> = (props) => {
    return (
        <div className={styles.post}>
            {props.message}
        </div>
    );
};

