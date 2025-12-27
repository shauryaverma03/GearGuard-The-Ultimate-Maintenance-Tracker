import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        {
          "bg-blue-600 text-white": variant === "default",
          "bg-gray-200 text-gray-800": variant === "secondary",
          "bg-red-600 text-white": variant === "destructive",
          "border border-gray-300 text-gray-800": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
