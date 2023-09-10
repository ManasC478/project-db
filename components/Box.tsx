import { ReactNode } from "react";

type BoxProps = {
  children: ReactNode;
  shadow?: string;
  borderwidth?: string;
  bordercolor?: string;
  className?: string;
};

export default function Box({
  children,
  shadow = "shadow-md",
  borderwidth = "border",
  bordercolor = "border-slate-200",
  className = "",
}: BoxProps) {
  return (
    <div className={`${bordercolor} ${borderwidth} ${shadow} ${className}`}>
      {children}
    </div>
  );
}
