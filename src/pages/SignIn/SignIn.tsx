import React from 'react';
import styles from "./SignIn.module.scss";
import {NavLink} from "react-router-dom";
import {FormInput} from "../../../src/components/UI/Form/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {ValidationError} from "../../../src/components/UI/ValidationError/ValidationError";

// Сделать валидацию на email и всю форму (чтобы пароль не включал в себя русские символы, minlength = 5, maxlength <= 24)
// Сделать button(универсальный) и компонент isValidError
// Сделать все функции на логин и регистрацию
interface IFormState {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}

export const SignIn = () => {
    const {register, formState: {errors, isValid, submitCount}, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        },
        mode: 'onSubmit',
        reValidateMode: "onChange"
    })
    const loginHandler: SubmitHandler<IFormState> = (data) => {
        alert(JSON.stringify(data))
    }
    return (
        <div className={styles.signIn}>
            <div className={styles.signInForm}>
                <form onSubmit={handleSubmit(loginHandler)}>
                    <h1>Create your account</h1>
                    <div className={styles.inputs}>
                        <FormInput name={'name'} placeholder={'Введите имя'} register={register} rules={{
                            required: {
                                value: true,
                                message: 'Обязательное поле'
                            },
                            minLength: {
                                value: !submitCount ? 1 : 4,
                                message: 'Слишком короткое имя'
                            },
                        }}/>
                        {
                            errors?.name && <ValidationError error={errors?.name?.message as string}/>
                        }
                        <FormInput name={'email'} placeholder={'Введите email'} register={register} rules={{
                            required: {
                                value: true,
                                message: 'Обязательное поле'
                            },
                            pattern: {
                                value: !submitCount ? /1/ : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: 'Не верная форма email',
                            },
                            minLength: {
                                value: !submitCount ? 1 : 5,
                                message: 'Слишком короткое имя'
                            },
                            maxLength: {
                                value: !submitCount ? 1 : 24,
                                message: 'Слишком длинное имя'
                            }
                        }}/>

                        {
                            errors?.email && <ValidationError error={errors?.email?.message as string}/>
                        }
                        <FormInput name={'password'} type={'password'} placeholder={'Введите пароль'}
                                   register={register} rules={{
                            required: {
                                value: true,
                                message: 'Обязательное поле'
                            }
                        }}/>

                        {
                            errors?.password && <ValidationError error={errors?.password?.message as string}/>
                        }
                        <FormInput name={'repeatPassword'} type={'password'} placeholder={'Повторите пароль'}
                                   register={register} rules={{
                            required: {
                                value: true,
                                message: 'Обязательное поле'
                            }
                        }}/>

                        {
                            errors?.repeatPassword && <ValidationError error={errors?.repeatPassword?.message as string}/>
                        }
                    </div>
                    <div className={styles.buttonPanel}>
                        <button className={styles.btn} disabled={!isValid}>CREATE ACCOUNT</button>
                        <p className={styles.newAcc}>Do you have an account? <NavLink className={styles.active}
                                                                                      to="/login">Login in
                            account</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

