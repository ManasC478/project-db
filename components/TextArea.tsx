import { TextareaHTMLAttributes } from "react";

type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  w?: string;
  bordercolor?: string;
  borderwidth?: string;
  py?: string;
  px?: string;
  className?: string;
};

export default function TextArea({
  w = "full",
  bordercolor = "slate-200",
  borderwidth = "2",
  px = "2",
  py = "2",
  className,
  ...props
}: TextAreaInputProps) {
  return (
    <textarea
      {...props}
      className={`px-${px} py-${py} w-${w} border-${bordercolor} border-${borderwidth} ${className}`}
    />
  );
}
