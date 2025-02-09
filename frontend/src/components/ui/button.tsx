import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({ children, variant = "default", size = "md", ...props }: ButtonProps) {
  const variants = {
    default: "bg-blue-500 text-white",
    outline: "border border-blue-500 text-blue-500",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={`${variants[variant]} ${sizes[size]} rounded`} {...props}>
      {children}
    </button>
  );
}
