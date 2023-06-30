// @ts-ignore
// @ts-ignore
import {
    FormInputInterface,
    InputInterface,
} from '../../../../types/IInput';
import {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';

// todo при подключении react input mask добавить в FC & Partial<Props>


const validationErrorVariants = {
    animate: {
        marginTop: 8,
        height: 'auto',
    },
    initial: {
        marginTop: 0,
        height: 0,
    },
    exit: {
        marginTop: 0,
        height: 0,
    },
};


export const FormInput = <TFormValues extends Record<string, unknown>>({
                                                                           mask,
                                                                           maskChar = null,
                                                                           variant = 'default',
                                                                           name,
                                                                           register,
                                                                           rules,
                                                                           errors,
                                                                           icon,
                                                                           iconPosition,
                                                                           placeholder,
                                                                           defaultPlaceholder,
                                                                           className,
                                                                           onIconClick,
                                                                           customError = '',
                                                                           onChange: changeHandler,
                                                                           inputClassname,
                                                                           ref,
                                                                           watch,
                                                                           ...rest
                                                                       }: FormInputInterface<TFormValues> &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>): JSX.Element => {
    const wrapperClassNames = cn(
        className,
        styles.wrapper,
        errors && errors[name] && styles.error,
        customError !== '' && styles.error,
    );
    const inputClassnames = cn(
        styles.floatingInput,
        inputClassname,
        !placeholder && !defaultPlaceholder && styles.floatingInput_nonePlaceholder,
        defaultPlaceholder && styles.floatingInput_withDefaultPlaceholder,
    );

    return (
        <div>
            <div className={wrapperClassNames}>
                {icon && iconPosition === 'left' ? <div className={styles.icon}>{icon}</div> : <></>}

                <div className={styles.wrapper_block}>

                    <input
                        className={inputClassnames}
                        placeholder={placeholder ? placeholder : defaultPlaceholder}
                        name={name}
                        onChange={changeHandler}
                        ref={ref}
                        {...watch}
                        {...(register && register(name, rules))}
                        {...rest}
                    />
                    {placeholder && !defaultPlaceholder && (
                        <label className={styles.label}>{placeholder}</label>
                    )}
                </div>

                {icon && iconPosition === 'right' ? (
                    <div onClick={onIconClick} className={cn(styles.icon, styles.iconRight)}>
                        {icon}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <AnimatePresence mode='wait'>
                {customError !== '' && (
                    <motion.div
                        variants={validationErrorVariants}
                        initial='initial'
                        exit='exit'
                        animate='animate'
                        className={styles.customError}
                    >
                        {customError}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


