import React, { FC, ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ type = "button", disabled, children }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="self-end px-2 py-1 rounded bg-accent-500 text-base-50 font-semibold disabled:opacity-60"
    >
      {children}
    </button>
  );
};

export default Button;
