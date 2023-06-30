import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import {
    DeepMap,
    FieldError,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
    WatchObserver,
} from 'react-hook-form';

type IVariants = 'default' | 'copy' | 'password';

export interface FormInputInterface<TFormValues extends FieldValues> {
    mask?: string;
    maskChar?: string | null;
    variant?: IVariants;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    name: Path<TFormValues>;
    watch?: WatchObserver<HTMLInputElement>;
    rules?: RegisterOptions;
    register?: UseFormRegister<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
    onIconClick?: () => void;
    inputClassname?: string;
    customError?: string;
    defaultPlaceholder?: string
}

export type InputInterface = {
    label?: string;
    withSelect?: boolean;
    mask?: string;
    maskChar?: string | null;
    variant?: IVariants;
    icon?: ReactNode;
    onIconClick?: () => void;
    iconPosition?: 'right' | 'left';
    defaultPlaceHolder?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
