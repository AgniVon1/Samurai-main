import {Form, Formik} from "formik";
import React from "react";
import s from "./MessageForm.module.css"

export interface FormDataType {
    message: string
}

interface SendMessageFormInterface {
    initialValue?: string
    placeholder?: string
    onSubmit: (message:string) => void
}

export const SendMessageForm = (props: SendMessageFormInterface) => {
    return (
        <Formik
            initialValues={{
                message: props.initialValue || ''
            }}
            onSubmit={( values: FormDataType, {resetForm} ) => {
                props.onSubmit(values.message)
                resetForm()
            }}
        >
            {({handleChange,values }) => (
            <Form className={s.form}>
                <textarea id="message" name="message"
                          placeholder={props.placeholder}
                          onChange={handleChange}
                          value={values.message}/>
                <button type="submit">Send</button>
            </Form>
                )}
        </Formik>
    )
}