type PropsType = {
    contactsTitle: string
    contactsValue: string | null | undefined
}

export const Contact: React.FC<PropsType> = ({contactsTitle, contactsValue}) => {
    return (
        <>
             <div><b>{contactsTitle}: </b>{contactsValue} </div>
        </>
    );
}