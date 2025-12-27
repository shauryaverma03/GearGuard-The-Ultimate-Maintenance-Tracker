import { cn } from "@/lib/utils"
import React from "react"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'premium'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {

        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            premium: "bg-gradient-to-r from-primary to-amber-600 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-white/20"
        }

        const sizes = {
            default: "h-12 px-6 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-14 rounded-full px-10 text-lg",
            icon: "h-10 w-10"
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
