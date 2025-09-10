"use client";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-screen-2xl mx-auto px-2.5 md:px-20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
