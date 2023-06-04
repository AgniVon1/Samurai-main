import React from 'react';
import {LoginForm, LoginFormOwnProps, LoginFormValuesType} from "./LoginForm";
import {RootStateType} from "../../redux/redux-store";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";


export type LoginPropsType = MapStateToPropsLoginType & MapDispatchToPropsLoginType;

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

export const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe,formData.captchaUrl)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <div>
                Login
            </div>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>

    );
};


//Hoc
export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

export const LoginContainer = connect(mapStateToProps, {login})(Login)