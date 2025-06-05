import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "~/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                destructive:
                    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                success:
                    "border-transparent bg-green-600 text-white [a&]:hover:bg-green-600/90 focus-visible:ring-green-600/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/80",
                warning:
                    "border-transparent bg-yellow-600 text-white [a&]:hover:bg-yellow-600/90 focus-visible:ring-yellow-600/20 dark:focus-visible:ring-yellow-600/40 dark:bg-yellow-600/80",
                info:
                    "border-transparent bg-blue-600 text-white [a&]:hover:bg-blue-600/90 focus-visible:ring-blue-600/20 dark:focus-visible:ring-blue-600/40 dark:bg-blue-600/80",
                outline:
                    "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                ghost:
                    "border-transparent bg-transparent text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                // Variantes light
                light:
                    "border-transparent bg-primary/10 text-primary [a&]:hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground",
                "light-secondary":
                    "border-transparent bg-secondary/50 text-secondary-foreground [a&]:hover:bg-secondary/70",
                "light-destructive":
                    "border-transparent bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20 dark:bg-destructive/20 dark:text-destructive-foreground",
                "light-success":
                    "border-transparent bg-green-100 text-green-800 [a&]:hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400",
                "light-warning":
                    "border-transparent bg-yellow-100 text-yellow-800 [a&]:hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400",
                "light-info":
                    "border-transparent bg-blue-100 text-blue-800 [a&]:hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
                // Variantes avec bordures colorées
                "outline-success":
                    "border-green-600 text-green-600 [a&]:hover:bg-green-50 [a&]:hover:text-green-700 dark:border-green-400 dark:text-green-400 dark:[a&]:hover:bg-green-900/20",
                "outline-warning":
                    "border-yellow-600 text-yellow-600 [a&]:hover:bg-yellow-50 [a&]:hover:text-yellow-700 dark:border-yellow-400 dark:text-yellow-400 dark:[a&]:hover:bg-yellow-900/20",
                "outline-info":
                    "border-blue-600 text-blue-600 [a&]:hover:bg-blue-50 [a&]:hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:[a&]:hover:bg-blue-900/20",
                "outline-destructive":
                    "border-destructive text-destructive [a&]:hover:bg-destructive/5 [a&]:hover:text-destructive dark:[a&]:hover:bg-destructive/10",
            },
            size: {
                sm: "px-1.5 py-0.5 text-xs",
                default: "px-2 py-0.5 text-xs",
                lg: "px-2.5 py-1 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Badge({
                   className,
                   variant,
                   size,
                   asChild = false,
                   ...props
               }: React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({variant, size}), className)}
            {...props}
        />
    )
}

export {Badge, badgeVariants}