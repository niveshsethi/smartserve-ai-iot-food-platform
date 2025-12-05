"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle, NeonCardDescription } from "@/components/ui/neon-card"
import { NeonInput } from "@/components/ui/neon-input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserPlus, Loader2, Heart, Users, Truck } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

type UserRole = "donor" | "ngo" | "shelter" | "logistics" | "volunteer" | "admin"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole | "",
    organizationName: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const roleOptions = [
    { value: "donor", label: "Food Donor", icon: Heart, description: "Restaurant, Hotel, or Individual" },
    { value: "ngo", label: "NGO", icon: Users, description: "Charity feeding communities" },
    { value: "shelter", label: "Animal Shelter", icon: Heart, description: "Caring for animals" },
    { value: "logistics", label: "Logistics Partner", icon: Truck, description: "Delivery services" },
    { value: "volunteer", label: "Volunteer", icon: Users, description: "Individual helper" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      toast.error("Password must be at least 8 characters")
      return
    }

    if (!formData.role) {
      setError("Please select your role")
      toast.error("Please select your role")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      })

      if (error?.code) {
        const errorMap: Record<string, string> = {
          USER_ALREADY_EXISTS: "Email already registered"
        }
        const errorMessage = errorMap[error.code] || "Registration failed"
        setError(errorMessage)
        toast.error(errorMessage)
        setIsLoading(false)
        return
      }

      toast.success("Account created successfully! Please sign in.")
      router.push("/auth/login?registered=true")
    } catch (err) {
      setError("Signup failed. Please try again.")
      toast.error("Signup failed")
      setIsLoading(false)
    }
  }

  const selectedRole = roleOptions.find(r => r.value === formData.role)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full neon-bg-cyan blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,var(--neon-magenta)_0%,transparent_70%)] blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[var(--neon-cyan)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <NeonCard glowColor="magenta" intensity="high">
          <NeonCardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)] flex items-center justify-center">
              <span className="text-black font-bold text-2xl">S</span>
            </div>
            <NeonCardTitle className="text-3xl neon-glow-magenta">Join SmartServe</NeonCardTitle>
            <NeonCardDescription>Create your account and start making an impact</NeonCardDescription>
          </NeonCardHeader>
          
          <NeonCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/20 border border-destructive text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <NeonInput
                    id="name"
                    placeholder="John Doe"
                    glowColor="magenta"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <NeonInput
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    glowColor="magenta"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role *</Label>
                <Select 
                  value={formData.role}
                  onValueChange={(value) => setFormData({...formData, role: value as UserRole})}
                  required
                >
                  <SelectTrigger className="neon-border-magenta h-12">
                    <SelectValue placeholder="Choose your role in the platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-3">
                          <role.icon className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedRole && (
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <selectedRole.icon className="w-3 h-3" />
                    {selectedRole.description}
                  </p>
                )}
              </div>

              {(formData.role === "donor" || formData.role === "ngo" || formData.role === "shelter" || formData.role === "logistics") && (
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name (Optional)</Label>
                  <NeonInput
                    id="organizationName"
                    placeholder="Your organization or business name"
                    glowColor="magenta"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    autoComplete="organization"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <NeonInput
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    glowColor="magenta"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <NeonInput
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    glowColor="magenta"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="neonSolid" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <UserPlus className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[var(--neon-magenta)] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </NeonCardContent>
        </NeonCard>
      </div>
    </div>
  )
}