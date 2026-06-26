import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      className={`border border-gray-200 rounded-lg px-3 py-2 outline-none transition focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
    />
  );
};

export default Input;
