import React from "react";
import { Input, Label, Field } from "@headlessui/react";
import clsx from "clsx";

/**
 * Props interface for InputField component
 */
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isValid?: boolean;
  validationInfo?: string;
}

/**
 * Reusable input field component with validation support.
 *
 * @component
 * @param {InputFieldProps} props - The props for the InputField component
 */
const InputField = ({
  label,
  isValid = true,
  className,
  validationInfo,
  ...rest
}: InputFieldProps) => {
  return (
    <Field>
      <Label className="text-sm font-normal font-sans text-gray-700">
        {label}:
      </Label>
      <Input
        {...rest}
        autoComplete="disabled"
        className={clsx(
          "w-full px-3 py-2 mt-1 border-[1px] border-black/15 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-2",
          {
            "border-red-500": !isValid,
          },
          className,
        )}
      />
      <div className={clsx(isValid && "invisible")}>
        <p className="text-xs py-1 text-red-500">{validationInfo}</p>
      </div>
    </Field>
  );
};

export default InputField;
