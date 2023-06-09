import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {fetchDialogs, resetDialogHasNewMessages, setCurrentDialog} from "../../../store/dialog/dialog-reducer";
import {callBack} from "../../layout/utils/callBack";
import s from "./dialog.module.css"
import bullet from "./../../../assets/imges/i-bullet-svgrepo-com.svg"

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
    const dispatch = useAppDispatch()

    const redirectHandler = () => {
        dispatch(setCurrentDialog(props.dialog))
        dispatch(resetDialogHasNewMessages(props.dialog.id))
    }
    return (
        <NavLink to={"/dialogs/" + props.dialog.id}
                 className={callBack}>
            <label onClick={redirectHandler} className={s.userNameBlock}>
                <p>{props.dialog.userName}</p>
                <div className={s.bullet}>
                    {props.dialog.hasNewMessages && <img src={bullet} alt="*"/>}
                </div>
            </label>
        </NavLink>
    )
}