import React from 'react';
import { Input, Label, Field } from '@headlessui/react';
import clsx from 'clsx';

export interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    description?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValid?: boolean;
}


/**
 * Reusable input field component with validation support.
 * 
 * @example
 * ```tsx
 * <InputField
 *   label="Email"
 *   type="email"
 *   name="email"
 *   value={email}
 *   onChange={handleEmailChange}
 *   isValid={isEmailValid}
 * />
 * ```
 */
const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, description, onChange, isValid = true }) => {
    return (
        console.log(isValid),
        <Field>
            <Label className="text-sm font-semibold text-gray-700">{label}</Label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete='disabled'
                className={clsx("w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500", {
                    "border-red-500": !isValid
                })}
            />
            {!isValid && <p className="text-sm text-red-500">Invalid {description}</p>}
        </Field>
    );
};

export default InputField;