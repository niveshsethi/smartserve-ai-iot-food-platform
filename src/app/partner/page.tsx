"use client"

import Navigation from "@/components/Navigation"
import Chatbot from "@/components/Chatbot"
import { Button } from "@/components/ui/button"
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle, NeonCardDescription } from "@/components/ui/neon-card"
import { NeonInput } from "@/components/ui/neon-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, Users, Truck, Heart, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnerType: "",
    location: "",
    description: "",
    agreedToTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full neon-bg-cyan blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,var(--neon-magenta)_0%,transparent_70%)] blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold neon-glow-cyan mb-6">
            Partner With SmartServe
          </h1>
          <p className="text-xl text-muted-foreground">
            Join our network of partners making a real difference in food redistribution. Together, we can end food waste and hunger.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold neon-glow-magenta text-center mb-12">Why Partner With Us?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NeonCard glowColor="cyan" className="hover-glow-cyan">
              <NeonCardHeader>
                <div className="w-12 h-12 rounded-full bg-[var(--neon-cyan)]/20 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-[var(--neon-cyan)]" />
                </div>
                <NeonCardTitle>Corporate Partners</NeonCardTitle>
                <NeonCardDescription>
                  Restaurants, hotels, and food businesses can reduce waste and improve their CSR impact.
                </NeonCardDescription>
              </NeonCardHeader>
            </NeonCard>

            <NeonCard glowColor="magenta" className="hover-glow-magenta">
              <NeonCardHeader>
                <div className="w-12 h-12 rounded-full bg-[var(--neon-magenta)]/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[var(--neon-magenta)]" />
                </div>
                <NeonCardTitle>NGO Partners</NeonCardTitle>
                <NeonCardDescription>
                  Access reliable food sources to serve your communities with guaranteed quality.
                </NeonCardDescription>
              </NeonCardHeader>
            </NeonCard>

            <NeonCard glowColor="purple" className="hover-glow-purple">
              <NeonCardHeader>
                <div className="w-12 h-12 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-[var(--neon-purple)]" />
                </div>
                <NeonCardTitle>Logistics Partners</NeonCardTitle>
                <NeonCardDescription>
                  Expand your delivery network with IoT-enabled smart transportation solutions.
                </NeonCardDescription>
              </NeonCardHeader>
            </NeonCard>

            <NeonCard glowColor="green" className="hover-glow-cyan">
              <NeonCardHeader>
                <div className="w-12 h-12 rounded-full bg-[var(--neon-green)]/20 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[var(--neon-green)]" />
                </div>
                <NeonCardTitle>Animal Shelters</NeonCardTitle>
                <NeonCardDescription>
                  Receive suitable food donations for animals through AI-powered routing.
                </NeonCardDescription>
              </NeonCardHeader>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <NeonCard glowColor="cyan" intensity="high">
            <NeonCardHeader>
              <NeonCardTitle className="text-3xl text-center neon-glow-cyan">
                Partnership Application Form
              </NeonCardTitle>
              <NeonCardDescription className="text-center">
                Fill out the form below and our team will get back to you within 24 hours
              </NeonCardDescription>
            </NeonCardHeader>
            <NeonCardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <NeonInput
                      id="organizationName"
                      placeholder="Enter your organization name"
                      required
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <NeonInput
                        id="contactPerson"
                        placeholder="Full name"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <NeonInput
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <NeonInput
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnerType">Partner Type *</Label>
                      <Select 
                        required
                        value={formData.partnerType}
                        onValueChange={(value) => setFormData({...formData, partnerType: value})}
                      >
                        <SelectTrigger className="neon-border-cyan">
                          <SelectValue placeholder="Select partner type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donor">Food Donor (Restaurant/Hotel)</SelectItem>
                          <SelectItem value="ngo">NGO/Charity Organization</SelectItem>
                          <SelectItem value="shelter">Animal Shelter</SelectItem>
                          <SelectItem value="logistics">Logistics Provider</SelectItem>
                          <SelectItem value="volunteer">Volunteer Organization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location/City *</Label>
                    <NeonInput
                      id="location"
                      placeholder="City, State"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Tell us about your organization *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your organization, capacity, and how you'd like to partner with SmartServe..."
                      className="min-h-32 neon-border-cyan"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms"
                      required
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreedToTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the terms and conditions and privacy policy *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    variant="neonSolid" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Partnership Application"}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[var(--neon-green)]/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-[var(--neon-green)]" />
                  </div>
                  <h3 className="text-2xl font-bold neon-glow-cyan">Application Submitted!</h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest in partnering with SmartServe. Our team will review your application and contact you within 24 hours.
                  </p>
                  <Button variant="neon" onClick={() => setIsSubmitted(false)}>
                    Submit Another Application
                  </Button>
                </div>
              )}
            </NeonCardContent>
          </NeonCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--neon-cyan)]/30 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SmartServe. All rights reserved. Powered by AI & IoT Technology.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}