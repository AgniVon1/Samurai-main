import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {useAppSelector} from "../../../store/hooks/useAppSelector";
import {selectMessages} from "../../../store/message/messages-selectors";
import {fetchMessages, sendMessage} from "../../../store/message/mesage-reducer";
import {selectAuthUserId} from "../../../store/auth/auth-selectors";
import {Message} from "./Message/Message";
import {FriendMessage} from "./friendMessage/FriendMessage";
import {fetchProfile} from "../../../store/profile/profile-reducer";
import s from "./messages.module.css"


export const Messages: React.FC = () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(selectMessages)
    const userId = useAppSelector(selectAuthUserId)

    const params = useParams<'dialogId'>();
    let dialogId = params.dialogId;

    useEffect(() => {
        if (dialogId) {
            dispatch(fetchMessages(+dialogId))
           /* dispatch(fetchProfileFriend(+dialogId))*/
            dispatch(fetchProfile(userId))
        }
    }, [dialogId])

    useEffect(() => {
        const timer = setInterval(() => {
            if (dialogId) dispatch(fetchMessages(+dialogId))
        }, 35000);
        return () => clearInterval(timer);
    });

    const [message, setMessage] = useState('')

    const sendMessageHandler = (dialogId:string| undefined) => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
        if (dialogId) dispatch(fetchMessages(+dialogId))
    }

    return (<div className={s.wrapper}>
            {messages.map(m => {
                if (m.senderId === userId)
                    return <Message key={m.id} text={m.body} addedAt={m.addedAt}/>
                else
                    return <FriendMessage key={m.id} text={m.body} addedAt={m.addedAt}/>
            })}
            <div>
                <div>
                    <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
                </div>
                <div>
                    <button onClick={() => sendMessageHandler(dialogId)}>Send</button>
                </div>
            </div>
        </div>
    )
}


