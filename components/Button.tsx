import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  bgcolor?: string;
  textcolor?: string;
  weight?: string;
  py?: string;
  px?: string;
  className?: string;
};

export default function Button({
  children,
  bgcolor = "bg-slate-900",
  textcolor = "text-white",
  weight = "font-normal",
  py = "3",
  px = "0",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full py-${py} px-${px} ${bgcolor} ${textcolor} ${weight} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
