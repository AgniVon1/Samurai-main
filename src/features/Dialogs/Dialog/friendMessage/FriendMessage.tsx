import React from 'react';
import s from "./friendMessage.module.css"
import ava from "./../../../../assets/imges/photo.jpg"
import {useAppSelector} from "../../../../store/hooks/useAppSelector";
import {selectCurrentDialog} from "../../../../store/dialog/dialog-selectors";
import {useNavigate} from "react-router-dom";

type PropsType = {
    text: string,
    addedAt: string,
}

export const FriendMessage: React.FC<PropsType> = ({
                                                       text,
                                                       addedAt,
                                                   }) => {

    const currentDialog = useAppSelector(selectCurrentDialog)
    const navigate = useNavigate()
    const redirectToProfile = (id: number) => {
        navigate('/profile/' + id)
    }
    return (
        <div className={s.friendMessage}>
            <div className={s.friendImageAndText} onClick={() => redirectToProfile(currentDialog.id)}>
                <img src={currentDialog.photos.small ? currentDialog.photos.small : ava} alt={"avatar"}/>
                <div className={s.friendText}>
                    <div className={s.friendName}>
                        {currentDialog.userName}
                    </div>
                    <p className={s.friendMessageText}>
                        {text}
                    </p>
                </div>
            </div>
            <div className={s.friendTime}>
                {addedAt}
            </div>
        </div>
    );
};

