import React from 'react';
import {Field} from "redux-form";
import {Input} from "../../../../../common/UI/Input/Input";
import {requiredField} from "../../../../../utils/validators";
import {ContactsType} from "../../../../../store/profile/profile-reducer";


type PropsType = {
    contacts:ContactsType,
}

export const ContactsForm:React.FC<PropsType> = ({contacts}) => {
    return (
        <div>
            <div>
                <b>Контакты:</b>
            </div>
            {
                Object.entries(contacts).map(([key]) => {
                    return (
                        <>
                            <div>
                                {key}
                            </div>
                            <Field
                                key={key}
                                placeholder={`${key}`}
                                name={`contacts.${key}`}
                                component={Input}
                                validate={[requiredField]}
                                style={{height: '20px'}}
                            />
                        </>
                    )
                })
            }
        </div>

    );
};

