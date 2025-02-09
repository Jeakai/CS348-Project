import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={`rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
