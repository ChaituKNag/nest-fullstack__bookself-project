import React, { ChangeEvent, FC, FocusEvent } from "react";

interface InputFieldProps {
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  onChange: (event: ChangeEvent) => void;
  onBlur?: (event?: FocusEvent) => void;
  value?: string;
  showError?: boolean;
  errorMessage?: string;
}

const InputField: FC<InputFieldProps> = ({
  id,
  type = "text",
  placeholder = "",
  value = "",
  label = "",
  errorMessage = "",
  required = false,
  showError = false,
  onChange,
  onBlur = () => {}
}) => {
  return (
    <label className="block relative mb-2" htmlFor={id}>
      {label && (
        <span className="block text-sm font-semibold text-base-500">
          {label}
        </span>
      )}
      <input
        className="w-full md:w-1/2 px-4 py-3 mb-5  rounded outline-0 bg-base-100"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required={required}
      />
      {showError && (
        <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
          {errorMessage}
        </p>
      )}
    </label>
  );
};

export default InputField;
