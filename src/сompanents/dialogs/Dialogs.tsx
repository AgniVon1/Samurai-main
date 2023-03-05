import React, {ChangeEvent} from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Dialog/Message";
import {DialogPageType} from "../../redux/state";
import {Redirect} from "react-router-dom";


export type DialogsPropsType = {
    dialogPage:DialogPageType

    sendNewMess: () => void,
    changeTextNewMess: (value: string) => void,
}

export const Dialogs: React.FC<DialogsPropsType> = ({
                                                        dialogPage: {
                                                            textNewMess: textNewMess,
                                                            dialogs: dialogs,
                                                            messages: messages,
                                                        },
                                                        sendNewMess,
                                                        changeTextNewMess,
                                                    }) => {

  const mappedMessages = messages.map((m) => <Message message={m.message}/>)
    const mappedDialogs = dialogs.map((d) => <Dialog id={d.id} name={d.name}/>)

    const sendMessOnClickHandler = () => {
        sendNewMess()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeTextNewMess(e.currentTarget.value)
    }
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDialogs}
            </div>
            <div className={styles.messages}>
                {mappedMessages}
            </div>
            <div>
                <div>
                    <textarea onChange={onChangeHandler} value={textNewMess}></textarea>
                </div>
                <div>
                    <button onClick={sendMessOnClickHandler}>Send</button>
                </div>
            </div>

        </div>
    );
};
