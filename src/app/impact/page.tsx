"use client"

import Navigation from "@/components/Navigation"
import Chatbot from "@/components/Chatbot"
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle, NeonCardDescription } from "@/components/ui/neon-card"
import { TrendingUp, Users, Award, Package, Heart, Truck, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

  const monthlyData = [
    { month: "Jan", meals: 3200, donations: 450, co2: 150 },
    { month: "Feb", meals: 3800, donations: 520, co2: 180 },
    { month: "Mar", meals: 4200, donations: 600, co2: 210 },
    { month: "Apr", meals: 5100, donations: 710, co2: 270 },
    { month: "May", meals: 6300, donations: 850, co2: 340 },
    { month: "Jun", meals: 7800, donations: 1020, co2: 420 },
  ]

  const foodTypeData = [
    { name: 'Cooked Meals', value: 45, color: '#00FF66' },
    { name: 'Fresh Produce', value: 25, color: '#14C4FF' },
    { name: 'Packaged Food', value: 20, color: '#FF6B9D' },
    { name: 'Bakery Items', value: 10, color: '#A855F7' },
  ]

  const recipientTypeData = [
    { name: 'NGOs', value: 55, color: '#00FF66' },
    { name: 'Animal Shelters', value: 30, color: '#14C4FF' },
    { name: 'Community Centers', value: 15, color: '#FF6B9D' },
  ]

  const hourlyDistribution = [
    { hour: '6 AM', deliveries: 12 },
    { hour: '9 AM', deliveries: 28 },
    { hour: '12 PM', deliveries: 45 },
    { hour: '3 PM', deliveries: 38 },
    { hour: '6 PM', deliveries: 52 },
    { hour: '9 PM', deliveries: 30 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Our Impact & Analytics
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time insights into how SmartServe is transforming food redistribution in Indore.
          </p>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Live Impact Dashboard</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg text-center p-8">
              <Package className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold text-primary mb-2">
                {mealsCount.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-lg">Total Meals Redistributed</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+23% this month</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg text-center p-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold text-primary mb-2">
                {partnersCount.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-lg">Active Partners</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+18% this month</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg text-center p-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold text-primary mb-2">
                {co2Saved.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-lg">Tons CO₂ Saved</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Environmental Impact</span>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">98.5%</div>
              <div className="text-sm text-muted-foreground">Quality Rate</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Deliveries</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">Indore</div>
              <div className="text-sm text-muted-foreground">Service Area</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">24min</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Distribution Analytics</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Food Type Distribution Pie Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Food Type Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={foodTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {foodTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {foodTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Type Distribution Pie Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recipient Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={recipientTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {recipientTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-4">
                {recipientTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Growth Area Chart */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Monthly Growth Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF66" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00FF66" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14C4FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14C4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" stroke="#A9A9A9" />
                <YAxis stroke="#A9A9A9" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="meals" stroke="#00FF66" fillOpacity={1} fill="url(#colorMeals)" name="Meals" />
                <Area type="monotone" dataKey="donations" stroke="#14C4FF" fillOpacity={1} fill="url(#colorDonations)" name="Donations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Distribution Bar Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Delivery Time Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="hour" stroke="#A9A9A9" />
                <YAxis stroke="#A9A9A9" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Bar dataKey="deliveries" fill="#00FF66" name="Deliveries" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* IoT & AI Stats */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Technology Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">AI Detection Accuracy</h3>
              <div className="text-4xl font-bold text-primary mb-4">99.2%</div>
              <p className="text-muted-foreground mb-4">Food type and quality identification accuracy</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Human Food</span>
                  <span className="text-primary">99.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Animal Food</span>
                  <span className="text-primary">98.9%</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">IoT Sensor Monitoring</h3>
              <div className="text-4xl font-bold text-primary mb-4">24/7</div>
              <p className="text-muted-foreground mb-4">Real-time quality monitoring during delivery</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>pH Monitoring</span>
                  <span className="text-primary">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature</span>
                  <span className="text-primary">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Detection</span>
                  <span className="text-primary">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Chatbot Assistance</h3>
              <div className="text-4xl font-bold text-primary mb-4">3,421</div>
              <p className="text-muted-foreground mb-4">Questions answered by AI assistant</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Avg Response Time</span>
                  <span className="text-primary">2.3s</span>
                </div>
                <div className="flex justify-between">
                  <span>Satisfaction Rate</span>
                  <span className="text-primary">96.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SmartServe. All rights reserved. Powered by AI & IoT Technology.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}