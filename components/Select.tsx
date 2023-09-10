import { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  w?: string;
  bordercolor?: string;
  borderwidth?: string;
  py?: string;
  px?: string;
  className?: string;
  children: ReactNode;
};
export default function Select({
  w = "full",
  bordercolor = "slate-200",
  borderwidth = "2",
  px = "2",
  py = "2",
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={`px-${px} py-${py} w-${w} border-${bordercolor} border-${borderwidth} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
