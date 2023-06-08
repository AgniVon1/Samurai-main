import React from 'react';
import s from "./friendMessage.module.css"
import ava from "./../../../../assets/imges/photo.jpg"
import {useAppSelector} from "../../../../store/hooks/useAppSelector";
import {selectCurrentDialog} from "../../../../store/dialog/dialog-selectors";

type PropsType = {
    text: string,
    addedAt: string,
}

export const FriendMessage:React.FC<PropsType> = ({ text,
                                                      addedAt,
                                                      }) => {

    const currentDialog = useAppSelector(selectCurrentDialog)

    return (
        <div className={s.friendMessage}>
            <div className={s.friendImageAndText}>
                <img  src={currentDialog.photos.small? currentDialog.photos.small: ava} alt = {"avatar"}/>
                <div className={s.friendText}>
                    <div className={s.friendName}>
                        {currentDialog.userName}
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

