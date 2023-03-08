import React from 'react';
import {LoginForm, LoginFormOwnProps, LoginFormValuesType} from "./LoginForm";
import {RootStateType} from "../../redux/redux-store";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
/*import {Redirect} from "react-router-dom";*/


export type LoginPropsType = MapStateToPropsLoginType & MapDispatchToPropsLoginType;

export type MapDispatchToPropsLoginType = {
  login:(email: string, password: string, rememberMe: boolean) => void,
}
export type MapStateToPropsLoginType = {
  isAuth: boolean

}

const mapStateToProps = (state: RootStateType): MapStateToPropsLoginType => {
  return {
    isAuth: state.auth.isAuth,
  }
}

export const Login = (props: LoginPropsType) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email,formData.password,formData.rememberMe)
  }

  /*if (props.isAuth) {
     return <Redirect to={'/profile'}/>
  }*/
  return (
    <div>
      <div>
        Login
      </div>
      <LoginReduxForm onSubmit = {onSubmit}/>
    </div>

  );
};


//Hooc
export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login' // уникальное строковое имя для каждой формы
})(LoginForm)

export const LoginContainer = connect(mapStateToProps, {login})(Login)