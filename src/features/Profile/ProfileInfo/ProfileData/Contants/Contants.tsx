import React from 'react';
import {Contact} from "./Contact";
import {ContactsType} from "../../../../../store/profile/profile-reducer";

type PropsType = {
    contacts: ContactsType
}

export const Contacts: React.FC<PropsType> =({contacts}) => {

    const copyContacts = {...contacts}

    Object.keys(copyContacts).forEach((k) => copyContacts[k as keyof ContactsType] == null && delete copyContacts[k as keyof ContactsType])

    const mappedContacts =
        Object.keys(copyContacts).map((key) => {
            return <Contact key={key}
                            contactsTitle={key}
                            contactsValue={copyContacts[key as keyof ContactsType]}
            />
        })

    return (
        <>
            {
                Object.keys(copyContacts).length !== 0 &&
                <div>
                    <b>Контакты:</b>
                    {mappedContacts}
                </div>
            }
        </>
    );
};
