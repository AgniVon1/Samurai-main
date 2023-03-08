import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/Textarea/Textarea";
import {requiredField} from "../../../../utils/validators";

export type AddPostFormValuesType = {
  newPost: string
}

export type AddPostFormOwnProps = {

}
const AddPostForm : React.FC<InjectedFormProps<AddPostFormValuesType, AddPostFormOwnProps> & AddPostFormOwnProps>= ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        placeholder={"Enter your post"}
        name={'newPost'}
        component={Textarea}
        validate={requiredField}
      />
      <div>
        <button >Send post</button>
      </div>
    </form>

  );
};
export default reduxForm<AddPostFormValuesType, AddPostFormOwnProps>({
  form: 'profileAddPostForm' // уникальное строковое имя для каждой формы
})(AddPostForm);

