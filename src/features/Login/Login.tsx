import React from 'react';
import {LoginForm, LoginFormOwnProps, LoginFormValuesType} from "./LoginForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../store/auth/auth-reducer";
import {Navigate} from "react-router-dom";
import {RootStateType} from "../../store/store";
import s from "./login.module.css"
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {selectAuthUserId} from "../../store/auth/auth-selectors";

export type PropsType = MapStateToPropsLoginType & MapDispatchToPropsLoginType;

export type MapDispatchToPropsLoginType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string| null) => void,
}
export type MapStateToPropsLoginType = {
    isAuth: boolean,
    captchaUrl: string | null,
}

const mapStateToProps = (state: RootStateType): MapStateToPropsLoginType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export const Login = (props: PropsType) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe,formData.captchaUrl)
    }
    const id = useAppSelector(selectAuthUserId)
    if (props.isAuth) {
        return <Navigate to={'/profile/' + id}/>
    }
    return (
        <div className={s.login}>
            <div>
                <h2>Login</h2>
            </div>
            <LoginReduxForm initialValues = {
                {email:"iliatron00@gmail.com", password:"forgetman", rememberMe:false}
            }onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

export const LoginContainer = connect(mapStateToProps, {login})(Login)