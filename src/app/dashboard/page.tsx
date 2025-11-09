"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        // Route based on user role
        switch (user.role) {
          case "donor":
            router.push("/dashboard/donor")
            break
          case "ngo":
          case "shelter":
            router.push("/dashboard/recipient")
            break
          case "logistics":
            router.push("/dashboard/logistics")
            break
          case "volunteer":
            router.push("/dashboard/volunteer")
            break
          case "admin":
            router.push("/dashboard/admin")
            break
          default:
            router.push("/")
        }
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 mx-auto animate-spin text-[var(--neon-cyan)]" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  )
}
