"use client"

import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "donor" | "ngo" | "shelter" | "logistics" | "volunteer" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationName?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface SignupData {
  email: string
  password: string
  name: string
  role: UserRole
  organizationName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("smartserve_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: "donor",
        organizationName: "Test Organization"
      }
      
      localStorage.setItem("smartserve_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockUser: User = {
        id: "1",
        email: "user@gmail.com",
        name: "Google User",
        role: "donor",
      }
      
      localStorage.setItem("smartserve_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      throw new Error("Google login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        role: data.role,
        organizationName: data.organizationName
      }
      
      localStorage.setItem("smartserve_user", JSON.stringify(newUser))
      setUser(newUser)
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("smartserve_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
