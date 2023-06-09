import React from "react";
import s from './Message.module.css'
import {useAppSelector} from "../../../../store/hooks/useAppSelector";
import {selectProfileFullName, selectProfileSmallPhoto} from "../../../../store/profile/profile-selectors";
import ava from "../../../../assets/imges/photo.jpg";

type PropsType = {
    text: string,
    addedAt: string
}

export const Message: React.FC<PropsType> = ({text, addedAt}) => {
    const avatar = useAppSelector(selectProfileSmallPhoto)
    const name = useAppSelector(selectProfileFullName)

    return (
        <div className={s.message}>
            <div className={s.imageAndText}>
                <img  src={avatar? avatar: ava} alt = {"avatar"}/>
                <div className={s.text}>
                    <div className={s.name}>
                        {name}
                    </div>
                    <p className={s.messageText}>
                        {text}
                    </p>
                </div>
            </div>
            <div className={s.time}>
                {addedAt}
            </div>
        </div>
    )
}
