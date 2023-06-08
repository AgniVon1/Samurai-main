import styles from "../dialogs.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {setCurrentDialog} from "../../../store/dialog/dialog-reducer";

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

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const redirectHandler = () => {
        dispatch(setCurrentDialog(props.dialog))
        navigate("/dialogs/" + props.dialog.id)
    }

    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <label onClick={redirectHandler}>
                {props.dialog.newMessagesCount}
                {props.dialog.userName}
            </label>
        </div>
    )
}