import {Field, InjectedFormProps} from "redux-form";
import {Input} from "../../../../common/UI/Input/Input";
import {requiredField} from "../../../../utils/validators";

export type ProfileDataFormPropsType = {
    aboutMe: string
    lookingForAJobDescription: string
    fullName: string
    contacts: any
}

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormPropsType>> =
    ({initialValues,handleSubmit, error}) => {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <button>
                            Сохранить
                        </button>
                    </div>
                    <div>
                        {
                            error &&
                            <div>
                                {error}
                            </div>
                        }
                    </div>

                    <div style={{height: '55px'}}>
                        <span><b>Имя:</b></span>
                        <Field
                            placeholder={'Имя'}
                            name={'fullName'}
                            component={Input}
                            validate={[requiredField]}
                        />
                    </div>

                    <div style={{height: '55px'}}>
                        <span><b>Работа:</b></span>
                        <Field
                            placeholder={'Работа'}
                            name={'lookingForAJobDescription'}
                            component={Input}
                            validate={[requiredField]}
                        />
                    </div>

                    <div style={{height: '55px'}}>
                        <span><b>Обо мне:</b></span>
                        <Field
                            placeholder={'Обо мне'}
                            name={'aboutMe'}
                            component={Input}
                            validate={[requiredField]}
                        />
                    </div>
                  {/*  <ContactsForm contacts={initialValues.contacts}/>*/}
                </form>
            </>
        );
    }