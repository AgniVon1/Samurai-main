import React from 'react';
import styles from "../dialogs.module.css";

type MessagePropsType = {
    message: {
        id: number,
        user: {
            avatar: string,
            name: string,
        },
        message: {
            text: string,
            time: string,
        }
    }
}

export const Message:React.FC<MessagePropsType> = (props) => {
    return (
        <div id={'message-' + props.message.id} className={styles.message}>
            <div className={styles.imageAndText}>
                <img id={'avatar-' + props.message.id} src={props.message.user.avatar} alt={""}/>
                <div className={styles.text}>
                    <div id={'name-' + props.message.id} className={styles.name}>
                        {props.message.user.name}
                    </div>
                    <pre id={'text-' + props.message.id} className={styles.messageText}>
                        {props.message.message.text}
                    </pre>
                </div>
            </div>
            <div id={'time-' + props.message.id} className={styles.time}>
                {props.message.message.time}
            </div>
        </div>
    )
}


