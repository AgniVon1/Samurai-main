import React from 'react';
import s from "./friendMessage.module.css"
import ava from "./../../../../assets/imges/photo.jpg"
import {useAppSelector} from "../../../../store/hooks/useAppSelector";
import {
    selectProfileFriendFullName,
    selectProfileFriendPhotosSmall
} from "../../../../store/message/messages-selectors";

type PropsType = {
    text: string,
    addedAt: string,
}

export const FriendMessage:React.FC<PropsType> = ({ text,
                                                      addedAt,
                                                      }) => {

    const avatar = useAppSelector(selectProfileFriendPhotosSmall)
    const name = useAppSelector(selectProfileFriendFullName)

    return (
        <div className={s.friendMessage}>
            <div className={s.friendImageAndText}>
                <img  src={avatar? avatar: ava} alt = {"avatar"}/>
                <div className={s.friendText}>
                    <div className={s.friendName}>
                        {name}
                    </div>
                    <pre className={s.friendMessageText}>
                        {text}
                    </pre>
                </div>
            </div>
            <div className={s.friendTime}>
                {addedAt}
            </div>
        </div>
    );
};

