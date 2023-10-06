import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, error, success, className, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="w-full">
        {label && <label className="mb-2 block">{label}</label>}
        <input
          ref={ref}
          {...rest}
          className={`input-auth disabled:border-none disabled:text-gray-500 ${
            success
              ? "border-[2px] border-blue-500"
              : error
              ? "border-[2px] border-red-500"
              : ""
          } ${className}`}
        />
        {error && <div className="mt-2 text-red-500">{error}</div>}
      </div>
    );
  },
);

export default Input;
