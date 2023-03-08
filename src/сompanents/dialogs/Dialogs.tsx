import React from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Dialog/Message";
import AddMessageForm, {AddMessageFormValuesType} from "./AddMessageForm/AddMessageForm";
import {DialogPageType} from "../../redux/dialog-reducer";


export type DialogsPropsType = {
    dialogPage:DialogPageType
    sendNewMess: (newMess:string) => void,

}

export const Dialogs: React.FC<DialogsPropsType> = ({
                                                        dialogPage: {
                                                            dialogs: dialogs,
                                                            messages: messages,
                                                        },
                                                        sendNewMess,
                                                    }) => {

  const mappedMessages = messages.map((m) => <Message message={m}/>)
  const mappedDialogs = dialogs.map((d) => <Dialog id={d.id} name={d.name}/>)

  const  addNewMessage = (formData: AddMessageFormValuesType) => {
    sendNewMess(formData.newMess)
  }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDialogs}
            </div>
            <div className={styles.messages}>
                {mappedMessages}
            </div>
           <AddMessageForm onSubmit ={addNewMessage}/>
        </div>
    );
};

