import React from 'react';
import {Contact} from "./Contact";
import {ContactsType} from "../../../../../redux/profile-reducer";

type PropsType = {
    contacts: ContactsType
}

export const Contacts: React.FC<PropsType> =({contacts}) => {

    const mappedContacts =
        Object.keys(contacts).map((key) => {
            return <Contact key={key}
                             contactsTitle={key}
                             contactsValue={contacts[key as keyof ContactsType]}
            />
        })

    return (
        <div>
            <div>
                <b>Контакты:</b>
            </div>
            {contacts
                ?
                mappedContacts
                :
                <> </>
            }
        </div>
    );
};
