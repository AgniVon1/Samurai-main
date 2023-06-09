import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {RootStateType} from "../../store/store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../store/chat/chat-reducer";
import {ChatMessageAPIType} from "../../api/chat/chat-api";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {useAuthRedirect} from "../../common/hooks/useAuthRedirect";
import {useScroll} from "../../common/hooks/useScroll";
import {SendMessageForm} from "../../common/UI/MessageForm/MessageForm";
import {useNavigate} from "react-router-dom";

export const ChatPage: React.FC = () => {
    useAuthRedirect()
    return <Chat/>
}

const Chat: React.FC = () => {
    const dispatch = useAppDispatch()
    const status = useSelector((state: RootStateType) => state.chat.status)
    const sendMessageHandler = (message: string) => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
    }

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <>
            <Messages/>
            <SendMessageForm onSubmit={sendMessageHandler} disabled={status !== "ready"}/>
        </>
    </div>
}

const Messages: React.FC = ({}) => {
    const messages = useSelector((state: RootStateType) => state.chat.messages)

    const {anchorRef,scrollHandler} = useScroll(messages)

    return <div style={{height: '80vh', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={anchorRef}></div>
    </div>
}


const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo( ({message}) => {
    const navigate = useNavigate()
    const redirectToProfileHandler = (id: number) => {
        navigate('/profile/' + id)
    }
    return <div onClick={() => redirectToProfileHandler(message.userId)}>
        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

export default ChatPage