import React from 'react';
import {Field, InjectedFormProps} from "redux-form";
import s from "./login.module.css"

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string | null
}

export type LoginFormOwnProps = {
    captchaUrl: string | null
}
export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, error, captchaUrl}) => (
        <form onSubmit={handleSubmit}>
            <div><Field
                placeholder={"Login"}
                name={'email'}
                component={"input"}
            /></div>
            <div>
                <Field
                    placeholder={"Password"}
                    name={'password'}
                    component={"input"}
                /></div>
            <div><Field
                name={'rememberMe'}
                type={"checkbox"}
                component={"input"}
            /> Remember me
            </div>
            <div className={s.formErrorBlock}>
                {
                    error &&
                    <div className={s.formError}>
                        {error}
                    </div>
                }
                {/*
            captchaUrl &&
            <div style={{marginTop: '100px'}}>
            <img src={captchaUrl} alt='captcha'/>
            </div>
          }
          {captchaUrl &&
                        <Field
                            placeholder={'Введите символы'}
                            name={'captchaUrl'}
                            component={Input}
                            validate={[requiredField]}
                        />
                    }*/}
            </div>
            <div>
                <button className={s.loginButton}>
                    Login
                </button>
            </div>
        </form>
    )
