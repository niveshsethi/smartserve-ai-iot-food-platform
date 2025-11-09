"use client"

import Navigation from "@/components/Navigation"
import Chatbot from "@/components/Chatbot"
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle, NeonCardDescription } from "@/components/ui/neon-card"
import { TrendingUp, Users, MapPin, Award, Package, Heart, Truck, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function ImpactPage() {
  const [mealsCount, setMealsCount] = useState(0)
  const [partnersCount, setPartnersCount] = useState(0)
  const [co2Saved, setCo2Saved] = useState(0)

  // Animate counters on mount
  useEffect(() => {
    const animateCounter = (setter: (val: number) => void, target: number, duration: number) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    animateCounter(setMealsCount, 52347, 2000)
    animateCounter(setPartnersCount, 234, 2000)
    animateCounter(setCo2Saved, 1250, 2000)
  }, [])

  const cityData = [
    { city: "New York", meals: 15234, color: "cyan" },
    { city: "Los Angeles", meals: 12456, color: "magenta" },
    { city: "Chicago", meals: 9876, color: "purple" },
    { city: "Houston", meals: 7654, color: "green" },
    { city: "Phoenix", meals: 6127, color: "orange" },
  ]

  const monthlyData = [
    { month: "Jan", meals: 3200 },
    { month: "Feb", meals: 3800 },
    { month: "Mar", meals: 4200 },
    { month: "Apr", meals: 5100 },
    { month: "May", meals: 6300 },
    { month: "Jun", meals: 7800 },
  ]

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
            Our Impact & Analytics
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time insights into how SmartServe is transforming food redistribution and making a difference in communities.
          </p>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold neon-glow-magenta text-center mb-12">Live Impact Dashboard</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <NeonCard glowColor="cyan" intensity="high" className="text-center p-8">
              <Package className="w-12 h-12 mx-auto mb-4 text-[var(--neon-cyan)]" />
              <div className="text-5xl font-bold neon-glow-cyan mb-2">
                {mealsCount.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-lg">Total Meals Redistributed</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[var(--neon-green)]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+23% this month</span>
              </div>
            </NeonCard>

            <NeonCard glowColor="magenta" intensity="high" className="text-center p-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-[var(--neon-magenta)]" />
              <div className="text-5xl font-bold neon-glow-magenta mb-2">
                {partnersCount.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-lg">Active Partners</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[var(--neon-green)]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+18% this month</span>
              </div>
            </NeonCard>

            <NeonCard glowColor="green" intensity="high" className="text-center p-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-[var(--neon-green)]" />
              <div className="text-5xl font-bold text-[var(--neon-green)]" style={{ textShadow: "0 0 20px var(--neon-green)" }}>
                {co2Saved.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-lg">Tons CO₂ Saved</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[var(--neon-green)]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Environmental Impact</span>
              </div>
            </NeonCard>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <NeonCard glowColor="purple" className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-[var(--neon-purple)]" />
              <div className="text-2xl font-bold mb-1">98.5%</div>
              <div className="text-sm text-muted-foreground">Quality Rate</div>
            </NeonCard>

            <NeonCard glowColor="orange" className="p-6 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-[var(--neon-orange)]" />
              <div className="text-2xl font-bold mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Deliveries</div>
            </NeonCard>

            <NeonCard glowColor="cyan" className="p-6 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-[var(--neon-cyan)]" />
              <div className="text-2xl font-bold mb-1">15</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </NeonCard>

            <NeonCard glowColor="magenta" className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-[var(--neon-magenta)]" />
              <div className="text-2xl font-bold mb-1">24min</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* City-wise Distribution */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-accent/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold neon-glow-cyan text-center mb-12">City-wise Distribution</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <NeonCard glowColor="cyan" intensity="medium">
              <NeonCardHeader>
                <NeonCardTitle>Top Performing Cities</NeonCardTitle>
                <NeonCardDescription>Meals redistributed by location</NeonCardDescription>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-4">
                  {cityData.map((city, index) => (
                    <div key={city.city} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 text-[var(--neon-${city.color})]`} />
                          <span className="font-medium">{city.city}</span>
                        </div>
                        <span className="text-muted-foreground">{city.meals.toLocaleString()} meals</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-[var(--neon-${city.color})]`}
                          style={{ 
                            width: `${(city.meals / 15234) * 100}%`,
                            boxShadow: `0 0 10px var(--neon-${city.color})`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </NeonCardContent>
            </NeonCard>

            <NeonCard glowColor="magenta" intensity="medium">
              <NeonCardHeader>
                <NeonCardTitle>Monthly Growth Trend</NeonCardTitle>
                <NeonCardDescription>Meal distribution over time</NeonCardDescription>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-end gap-2 h-24">
                      <div className="flex-1 flex flex-col justify-end items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-[var(--neon-magenta)] to-[var(--neon-purple)] rounded-t-lg transition-all"
                          style={{ 
                            height: `${(data.meals / 8000) * 100}%`,
                            boxShadow: `0 0 15px var(--neon-magenta)`
                          }}
                        />
                        <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Growth</span>
                      <span className="text-[var(--neon-green)] font-semibold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +143%
                      </span>
                    </div>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* IoT & AI Stats */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold neon-glow-purple text-center mb-12">Technology Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <NeonCard glowColor="cyan">
              <NeonCardHeader>
                <NeonCardTitle>AI Detection Accuracy</NeonCardTitle>
                <NeonCardDescription className="mt-4">
                  <div className="text-4xl font-bold neon-glow-cyan mb-2">99.2%</div>
                  <p>Food type and quality identification accuracy</p>
                </NeonCardDescription>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Human Food</span>
                    <span className="text-[var(--neon-cyan)]">99.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Animal Food</span>
                    <span className="text-[var(--neon-cyan)]">98.9%</span>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>

            <NeonCard glowColor="magenta">
              <NeonCardHeader>
                <NeonCardTitle>IoT Sensor Monitoring</NeonCardTitle>
                <NeonCardDescription className="mt-4">
                  <div className="text-4xl font-bold neon-glow-magenta mb-2">24/7</div>
                  <p>Real-time quality monitoring during delivery</p>
                </NeonCardDescription>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>pH Monitoring</span>
                    <span className="text-[var(--neon-green)]">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperature</span>
                    <span className="text-[var(--neon-green)]">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gas Detection</span>
                    <span className="text-[var(--neon-green)]">Active</span>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>

            <NeonCard glowColor="purple">
              <NeonCardHeader>
                <NeonCardTitle>Chatbot Assistance</NeonCardTitle>
                <NeonCardDescription className="mt-4">
                  <div className="text-4xl font-bold neon-glow-purple mb-2">3,421</div>
                  <p>Questions answered by AI assistant</p>
                </NeonCardDescription>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Avg Response Time</span>
                    <span className="text-[var(--neon-cyan)]">2.3s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Satisfaction Rate</span>
                    <span className="text-[var(--neon-green)]">96.8%</span>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>
          </div>
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