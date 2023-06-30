import {
    FormInputInterface,
    InputInterface,
} from './Input.interface';
import {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';
import {ReactComponent as IconCopy} from '@/assets/icons/icon-copy.svg';
// import InputMask from 'react-input-mask';
// import ReactInputMask, { Props } from 'react-input-mask';
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
                    {mask ? (
                        // <InputMask
                        //     ref={ref as LegacyRef<ReactInputMask>}
                        //     mask={mask}
                        //     maskChar={maskChar}
                        //     maskPlaceholder={null}
                        //     placeholder={placeholder ? placeholder : defaultPlaceholder}
                        //     className={inputClassnames}
                        //     onChange={changeHandler}
                        //     {...(register && register(name, rules))}
                        //     {...rest}
                        // />
                        <></>
                    ) : (
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
                    )}
                    {placeholder && !defaultPlaceholder && (
                        <label className={styles.label}>{placeholder}</label>
                    )}
                </div>

                {variant === 'copy' ? (
                    <div className={styles.iconCopy} onClick={onIconClick}>
                        <IconCopy/>
                    </div>
                ) : (
                    <></>
                )}

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


