import React from "react";
import {Field, InjectedFormProps} from "redux-form";
import {LoginFormOwnProps} from "../../login/LoginForm";



export type AddMessageFormValuesType = {
 newMess: string
}

export type AddMessageFormOwnProps = {

}
 export  const AddMessageForm : React.FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnProps> & LoginFormOwnProps>= ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        placeholder={"Enter your message"}
        name={'newMessageBody'}
        component={"input"}
      />
      <div>
        <button >Send</button>
      </div>
    </form>

  );
};

