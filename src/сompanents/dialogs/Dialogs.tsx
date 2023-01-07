import React, {ChangeEvent} from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Dialog/Message";
import {ActionType, messagePageType} from "../../redux/state";
import {changeTextNewMessAC, sendNewMessAC} from "../../redux/message-reducer";

export type DialogsPropsType = messagePageType & {
    dispatch: (action: ActionType) => void,
}

export const Dialogs: React.FC<DialogsPropsType> = ({
                                                        textNewMess,
                                                        dialogs,
                                                        messages,
                                                        dispatch,
                                                    }) => {
    const mappedMessages = messages.map((m) => <Message message={m.message}/>)
    const mappedDiologs = dialogs.map((d) => <Dialog id={d.id} name={d.name}/>)

    const sendMessOnClickHandler = () => {
        alert("addMess was called")
        dispatch(sendNewMessAC())
        dispatch(changeTextNewMessAC(""))

    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeTextNewMessAC(e.currentTarget.value))
    }
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDiologs}
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
