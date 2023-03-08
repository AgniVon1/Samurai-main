import React from 'react';
import {InjectedFormProps} from "redux-form";


export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean

}

export type LoginFormOwnProps = {

}
export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
  ({ handleSubmit, error})  => {
  return (
    <div>
      <form>
        <div>
          <input placeholder={ "Login"}/>
        </div>
        <div>
          <input placeholder={ "Password"}/>
        </div>
        <div>
          <input type = {"checkbox"} placeholder={ "Password"}/> Remember me
        </div>
        <div>
          <button>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
