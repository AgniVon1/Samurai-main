import React from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Dialog/Message";


export const Dialogs = () => {

    const message0 ={
        id: 100,
            user: {
        avatar: "https://belarustime.by/wp-content/uploads/2022/08/bez-nazvaniya-44.jpg",
            name: 'Ilya',
    },
        message: {
            text: 'сообщение',
                time: '22:00',
        },

    }
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                <Dialog id={1} name={"Ilya"}/>
            </div>
            <div className={styles.messages}>
                <Message message={message0}/>
            </div>
        </div>
    );
};
