import * as React from "react"
import { cn } from "@/lib/utils"

export interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "cyan" | "magenta" | "purple" | "green" | "orange"
  intensity?: "low" | "medium" | "high"
}

const NeonCard = React.forwardRef<HTMLDivElement, NeonCardProps>(
  ({ className, glowColor = "cyan", intensity = "medium", ...props }, ref) => {
    const glowColors = {
      cyan: "var(--neon-cyan)",
      magenta: "var(--neon-magenta)",
      purple: "var(--neon-purple)",
      green: "var(--neon-green)",
      orange: "var(--neon-orange)",
    }

    const intensityStyles = {
      low: `shadow-[0_0_5px_${glowColors[glowColor]}]`,
      medium: `shadow-[0_0_10px_${glowColors[glowColor]},0_0_20px_${glowColors[glowColor]}]`,
      high: `shadow-[0_0_15px_${glowColors[glowColor]},0_0_30px_${glowColors[glowColor]},0_0_45px_${glowColors[glowColor]}]`,
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground backdrop-blur-sm",
          "glass-card transition-all duration-300",
          intensityStyles[intensity],
          className
        )}
        style={{
          borderColor: glowColors[glowColor],
        }}
        {...props}
      />
    )
  }
)
NeonCard.displayName = "NeonCard"

const NeonCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
NeonCardHeader.displayName = "NeonCardHeader"

const NeonCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
NeonCardTitle.displayName = "NeonCardTitle"

const NeonCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
NeonCardDescription.displayName = "NeonCardDescription"

const NeonCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
NeonCardContent.displayName = "NeonCardContent"

const NeonCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
NeonCardFooter.displayName = "NeonCardFooter"

export { NeonCard, NeonCardHeader, NeonCardFooter, NeonCardTitle, NeonCardDescription, NeonCardContent }
