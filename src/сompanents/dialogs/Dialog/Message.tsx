import React from 'react';

export type MessagePropsType = {
    message: {
        id: string;
        text: string,
    }
}

export const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div>
            <pre>
                {props.message.text}
            </pre>
        </div>
    )
}


