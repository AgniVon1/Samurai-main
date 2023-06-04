import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {LoginFormOwnProps} from "../../login/LoginForm";

export type AddMessageFormValuesType = {
 newMess: string
}

export type AddMessageFormOwnProps = {

}
const AddMessageForm : React.FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnProps> & LoginFormOwnProps>= ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        placeholder={"Enter your message"}
        name={'newMess'}
        component={"input"}
      />
      <div>
        <button >Send</button>
      </div>
    </form>

  );
};

export default reduxForm<AddMessageFormValuesType, AddMessageFormOwnProps>({
  form: 'dialogAddMessageForm'
})(AddMessageForm);

