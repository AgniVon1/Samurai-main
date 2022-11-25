import React from 'react';
import styles from './dialogs.module.css'
import {Dialog, DialogPropsType} from "./Dialog/Dialog";
import {Message, MessagePropsType} from "./Dialog/Message";

export type DialogsPropsType = {
    dialogs: Array<DialogPropsType>,
    messages: Array<MessagePropsType>
}

export const Dialogs: React.FC<DialogsPropsType> = ({dialogs,
                                                        messages,
                                                    }) => {
    const mappedMessages = messages.map((m) => <Message message = {m.message}/>)
    const mappedDiologs = dialogs.map((d) => <Dialog id={d.id} name={d.name}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDiologs}
            </div>
            <div className={styles.messages}>
                {mappedMessages}
            </div>
        </div>
    );
};
