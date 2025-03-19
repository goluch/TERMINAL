import React from "react";
import { Input, Label, Field } from "@headlessui/react";
import clsx from "clsx";

/**
 * Props interface for InputField component
 */
<<<<<<< HEAD
export interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  description?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  validationInfo?: string;
=======
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    isValid?: boolean;
    validationInfo?: string;
>>>>>>> main
}

/**
 * Reusable input field component with validation support.
 *
 * @component
 * @param {InputFieldProps} props - The props for the InputField component
 */
<<<<<<< HEAD
const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  isValid = true,
  validationInfo,
}) => {
  return (
    <Field>
      <Label className="text-sm font-semibold text-gray-700">{label}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="disabled"
        className={clsx(
          "w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500",
          {
            "border-red-500": !isValid,
          },
        )}
      />
      {!isValid && (
        <>
          <p className="text-sm text-red-500">Invalid {label}</p>
          <p className="text-sm text-red-500">{validationInfo}</p>
        </>
      )}
    </Field>
  );
=======
const InputField = ({ label, isValid = true, validationInfo, ...rest }: InputFieldProps) => {
    return (
        <Field>
            <Label className="text-sm font-normal font-sans text-gray-700">{label}:</Label>
            <Input
                {...rest}
                autoComplete="disabled"
                className={clsx(
                    "w-full px-3 py-2 mt-1 border-[1px] border-black/15 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-2",
                    {
                        "border-red-500": !isValid,
                    },
                )}
            />
            <div className={clsx(isValid && "invisible")}>
                <p className="text-sm text-red-500">Invalid {label}</p>
                <p className="text-sm text-red-500">{validationInfo}</p>
            </div>
        </Field>
    );
>>>>>>> main
};

export default InputField;
