import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className = "", ...props }: Props) => {
  return (
    <textarea
      {...props}
      className={`border border-gray-200 rounded-lg px-3 py-2 outline-none transition focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
    />
  );
};

export default Textarea;