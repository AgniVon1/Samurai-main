import styles from "../dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

export type PropsType = {
    dialog: {
        id: number,
        userName: string,
        hasNewMessages: boolean,
        lastDialogActivityDate: string,
        lastUserActivityDate: string,
        newMessagesCount: number,
        photos: {
            small: string | null,
            large: string | null
        }
    }
}

export const Dialog: React.FC<PropsType> = (props) => {



    //setCurrentDialog
    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <div>
                {props.dialog.newMessagesCount}
            </div>
            <NavLink to={"/dialogs/" + props.dialog.id}>{props.dialog.userName}</NavLink>
        </div>
    )
}