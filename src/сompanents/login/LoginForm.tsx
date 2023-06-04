import React from 'react';
import {Field, InjectedFormProps} from "redux-form";
import {requiredField} from "../../utils/validators";
import {Input} from "../../common/UI/Input/Input";


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
  ({ handleSubmit, error,captchaUrl})  => {
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
            captchaUrl &&
            <div style={{marginTop: '100px'}}>
            <img src={captchaUrl} alt='captcha'/>
            </div>
          }

          {
            error &&
            <div>
          {error}
            </div>
          }

          {captchaUrl &&
                        <Field
                            placeholder={'Введите символы'}
                            name={'captchaUrl'}
                            component={Input}
                            validate={[requiredField]}
                        />
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
