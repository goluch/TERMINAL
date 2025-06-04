import React from "react";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import InputLabelAndValidation, {
  InputLabelAndValidationProps,
} from "./InputLabelAndValidation";

/**
 * Props type for InputField component
 */
export type InputFieldProps = InputLabelAndValidationProps &
  React.InputHTMLAttributes<HTMLInputElement>;

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
    <InputLabelAndValidation
      label={label}
      isValid={isValid}
      validationInfo={validationInfo}
    >
      <Input
        {...rest}
        autoComplete="disabled"
        className={clsx(
          "w-full px-3 py-2 border-[1px] border-black/15 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-2",
          {
            "border-red-500": !isValid,
          },
          className,
        )}
      />
    </InputLabelAndValidation>
  );
};

export default InputField;
