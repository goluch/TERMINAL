import React, { useState } from 'react';
import { Input, Label, Field } from '@headlessui/react';
import clsx from 'clsx';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange }) => {
    const [isValid, setIsValid] = useState(true);

    const validateEmail = (email: string) =>{
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }    

    const validatePassword = (password: string) =>{
        return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (type === "email") {
            setIsValid(validateEmail(value));
        } else if (type === "password") {
            setIsValid(validatePassword(value));
        }
        onChange(e);
    }

    return (
        <Field>
            <Label className="text-sm font-semibold text-gray-700">{label}</Label>
            <Input 
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className={clsx("w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500", {
                    "border-red-500": !isValid
                })}
            />
            {!isValid && <p className="text-sm text-red-500">Invalid {label}</p>}
        </Field>
    );
};

export default InputField;