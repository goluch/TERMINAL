import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, className, ...rest }: IconButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        "p-2 border rounded-md hover:bg-gray-100 hover:border-blue-200",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
