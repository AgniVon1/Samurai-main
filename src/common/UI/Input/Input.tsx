// тип пропсов обычного инпута
import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes,KeyboardEvent} from "react";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form/lib/Field";
import s from './input.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    input: WrappedFieldProps
    meta: WrappedFieldMetaProps
}

export const Input: React.FC<SuperInputTextPropsType> = (
    {
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        input, meta,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
/*    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {*/
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    //const finalSpanClassName = `${error ? s.error : ''} ${spanClassName ? spanClassName : ''}`
    //const finalInputClassName = `${error ? s.errorInput : ''} ${className ? className : s.superInputDone}`

    const validateError = meta.touched && meta.error;

    const finalInputClassName = `${s.superInputDone} ${validateError ? s.errorInput : ''}`
    const finalSpanClassName = `${s.error}`

    return (
        <>
            <div className={s.inputBlock}>
                <input
                    //type={'text'}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    {...input}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
            </div>
            {/*<div>{error && <span className={finalSpanClassName}>{error}</span>}</div>*/}
            <div className={s.errorBlock}>
                {validateError && <span className={finalSpanClassName}>{meta.error}</span>}
            </div>
        </>
    )
}