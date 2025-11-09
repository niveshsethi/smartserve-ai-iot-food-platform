import * as React from "react"
import { cn } from "@/lib/utils"

export interface NeonInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  glowColor?: "cyan" | "magenta" | "purple" | "green" | "orange"
}

const NeonInput = React.forwardRef<HTMLInputElement, NeonInputProps>(
  ({ className, type, glowColor = "cyan", ...props }, ref) => {
    const glowColors = {
      cyan: "var(--neon-cyan)",
      magenta: "var(--neon-magenta)",
      purple: "var(--neon-purple)",
      green: "var(--neon-green)",
      orange: "var(--neon-orange)",
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-input px-3 py-2 text-base shadow-sm transition-all",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          className
        )}
        style={{
          borderColor: glowColors[glowColor],
          boxShadow: `0 0 5px ${glowColors[glowColor]}`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 10px ${glowColors[glowColor]}, 0 0 20px ${glowColors[glowColor]}`
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = `0 0 5px ${glowColors[glowColor]}`
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
NeonInput.displayName = "NeonInput"

export { NeonInput }
