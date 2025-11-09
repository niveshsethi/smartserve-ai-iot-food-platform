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
import { useAuth, type UserRole } from "@/lib/auth-context"

export default function SignupPage() {
  const router = useRouter()
  const { signup, loginWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole | "",
    organizationName: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
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
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (!formData.role) {
      setError("Please select your role")
      return
    }

    setIsLoading(true)

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as UserRole,
        organizationName: formData.organizationName || undefined
      })
      router.push("/dashboard")
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError("")
    setIsGoogleLoading(true)

    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (err) {
      setError("Google signup failed")
    } finally {
      setIsGoogleLoading(false)
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
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
