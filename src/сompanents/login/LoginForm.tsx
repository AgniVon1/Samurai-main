import React from 'react';
import {Field, InjectedFormProps} from "redux-form";


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
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            placeholder={"Login"}
            name={'email'}
            component={"input"}
          />
        </div>
        <div>
          <Field
            placeholder={"Password"}
            name={'password'}
            component={"input"}
          />
        </div>
        <div>
          <Field
            name={'rememberMe'}
            type={"checkbox"}
            component={"input" }
          /> Remember me
        </div>
        <div>
          {
            error &&
              <div>
                {error}
              </div>
          }
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
