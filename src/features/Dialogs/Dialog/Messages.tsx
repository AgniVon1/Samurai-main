import React, {useEffect} from 'react';
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
import {useScroll} from "../../../common/hooks/useScroll";
import {SendMessageForm} from "../../../common/UI/MessageForm/MessageForm";
import {selectCurrentDialogHasNewMessages} from "../../../store/dialog/dialog-selectors";


export const Messages: React.FC = () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(selectMessages)
    const currentDialogHasNewMessages = useAppSelector(selectCurrentDialogHasNewMessages)
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
        if (dialogId) dispatch(fetchMessages(+dialogId))
    }, [currentDialogHasNewMessages]);

    const sendMessageHandler = (message: string) => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        if (dialogId) dispatch(fetchMessages(+dialogId))
    }

    const {scrollHandler, anchorRef} = useScroll(messages)

    return (<div className={s.wrapper}>
        <div className={s.chatBlock} style={{overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map(m => {
                return m.senderId === userId ?
                    <Message key={m.id} text={m.body} addedAt={m.addedAt}/>
                    :
                    <FriendMessage key={m.id} text={m.body} addedAt={m.addedAt}/>;
            })}
            <div ref={anchorRef}></div>
        </div>
        {dialogId &&
            <SendMessageForm onSubmit={sendMessageHandler} initialValue={""} placeholder={"Enter message..."}/>}
    </div>)
}


