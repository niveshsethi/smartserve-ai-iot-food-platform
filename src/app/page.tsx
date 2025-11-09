"use client"

import Navigation from "@/components/Navigation"
import Chatbot from "@/components/Chatbot"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Activity, Users, Heart, Truck, Bot, Droplet, Gauge, Thermometer } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-card border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Food Redistribution Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
              Connect Food Surplus with Those in Need
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              SmartServe uses AI image detection and IoT sensors to safely redistribute food from donors to NGOs, animal shelters, and communities in need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button variant="default" size="xl" asChild>
                <Link href="/auth/signup">
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/partner">Partner With Us</Link>
              </Button>
              <Button variant="secondary" size="xl" asChild>
                <Link href="/impact">View Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Meals Redistributed</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Active Partners</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Food Quality Rate</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">The Problem We're Solving</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every year, tons of edible food goes to waste while millions go hungry. SmartServe bridges this gap with technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">For Donors</h3>
                </div>
                <p className="text-muted-foreground">
                  Easily list surplus food with AI-powered image detection that automatically routes donations to the right recipients.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">For Recipients</h3>
                </div>
                <p className="text-muted-foreground">
                  NGOs and animal shelters can browse, claim, and track food donations in real-time with guaranteed quality.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">For Logistics</h3>
                </div>
                <p className="text-muted-foreground">
                  Smart routing, IoT sensor monitoring (pH, Gas, Thermal, Bio), and AI verification ensure safe delivery.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary">
                  AI & IoT Technology
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">AI image detection automatically identifies food type and quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Droplet className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">pH sensors monitor food acidity levels during transport</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Gas sensors detect spoilage and contamination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Thermal sensors ensure optimal temperature control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Bio sensors verify food safety in real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Bot className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">AI chatbot assistance available 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Role Platform */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Join as Multiple Roles</h2>
            <p className="text-xl text-muted-foreground">Choose your role and start making an impact today</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Donor</h3>
                <p className="text-sm text-muted-foreground">
                  Restaurants, hotels, or individuals with surplus food
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">NGO</h3>
                <p className="text-sm text-muted-foreground">
                  Organizations feeding communities in need
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Animal Shelter</h3>
                <p className="text-sm text-muted-foreground">
                  Shelters caring for animals with food needs
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Logistics</h3>
                <p className="text-sm text-muted-foreground">
                  Delivery partners ensuring safe transport
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Volunteer</h3>
                <p className="text-sm text-muted-foreground">
                  Individuals helping with distribution
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="xl" asChild>
              <Link href="/auth/signup">
                Choose Your Role & Sign Up <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of partners already using SmartServe to reduce food waste and feed communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" asChild>
              <Link href="/auth/signup">Get Started Now</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/partner">Become a Partner</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SmartServe. All rights reserved. Powered by AI & IoT Technology.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}