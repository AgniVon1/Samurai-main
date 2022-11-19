import React from 'react';
import styles from './post.module.css'


type PostType = {
    message:string;
}

export const Post:React.FC<PostType> = (props) => {
    return (
        <div className={styles.post}>
            {props.message}
        </div>
    );
};

