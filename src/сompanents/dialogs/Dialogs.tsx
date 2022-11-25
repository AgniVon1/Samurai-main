import React from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Dialog/Message";
import { v1 } from "uuid"


export const Dialogs = () => {

    const message0 ={
            id: v1(),
            text:"сообщение",
    }
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                <Dialog id={1} name={"Ilya"}/>
            </div>
            <div className={styles.messages}>
                <Message message = {message0}/>
            </div>
        </div>
    );
};
