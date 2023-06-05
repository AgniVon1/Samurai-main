import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {useAppSelector} from "../../../store/hooks/useAppSelector";
import {selectMessages} from "../../../store/message/messages-selectors";
import {fetchMessages, sendMessage} from "../../../store/message/mesage-reducer";




export const Messages: React.FC = () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(selectMessages)

    const params = useParams<'dialogId'>();
    let dialogId = params.dialogId;

    useEffect(() => {
        if (dialogId) dispatch(fetchMessages(+dialogId))
    }, [dialogId])

    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (<>
            {messages.map(m => m.body)}
            <div>
                <div>
                    <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
                </div>
                <div>
                    <button onClick={sendMessageHandler}>Send</button>
                </div>
            </div>
        </>
    )
}


