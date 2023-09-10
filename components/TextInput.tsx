import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  w?: string;
  bordercolor?: string;
  borderwidth?: string;
  py?: string;
  px?: string;
  className?: string;
};

export default function TextInput({
  w = "full",
  bordercolor = "slate-200",
  borderwidth = "2",
  px = "2",
  py = "2",
  className,
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={`py-${py} px-2 w-${w} border-${bordercolor} border-${borderwidth} ${className}`}
    />
  );
}
