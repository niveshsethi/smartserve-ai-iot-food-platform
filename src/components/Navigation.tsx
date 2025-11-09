"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-primary">SmartServe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/partner" className="text-foreground hover:text-primary transition-colors font-medium">
              Partner With Us
            </Link>
            <Link href="/impact" className="text-foreground hover:text-primary transition-colors font-medium">
              Impact & Analytics
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link 
              href="/" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/partner" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partner With Us
            </Link>
            <Link 
              href="/impact" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact & Analytics
            </Link>
            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}