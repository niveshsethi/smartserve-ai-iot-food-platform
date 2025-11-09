"use client"

import { useState, useMemo } from "react"
import DashboardNav from "@/components/DashboardNav"
import Chatbot from "@/components/Chatbot"
import { Button } from "@/components/ui/button"
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle, NeonCardDescription } from "@/components/ui/neon-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search, Bell, MapPin, Clock, CheckCircle, TrendingUp, AlertCircle, ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function RecipientDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const availableDonations = [
    {
      id: 1,
      title: "Cooked Meals - 100 Servings",
      donor: "Grand Plaza Hotel",
      location: "Downtown, 2.5km away",
      distance: 2.5,
      foodType: "Cooked Food",
      quantity: "100 servings",
      expiry: "Today, 8:00 PM",
      category: "human",
      status: "available"
    },
    {
      id: 2,
      title: "Fresh Produce - 50kg",
      donor: "Green Market",
      location: "East District, 4.1km away",
      distance: 4.1,
      foodType: "Fresh Produce",
      quantity: "50kg",
      expiry: "Tomorrow, 6:00 PM",
      category: "human",
      status: "available"
    },
    {
      id: 3,
      title: "Pet Food - 30kg",
      donor: "Pet Store Plus",
      location: "West Side, 3.2km away",
      distance: 3.2,
      foodType: "Animal Food",
      quantity: "30kg",
      expiry: "3 days",
      category: "animal",
      status: "available"
    },
  ]

  const claimedDonations = [
    {
      id: 1,
      title: "Bakery Items - 200 pieces",
      donor: "Sweet Bakery",
      status: "Driver assigned",
      eta: "45 minutes",
      driver: "John Delivery"
    },
    {
      id: 2,
      title: "Packaged Food - 75kg",
      donor: "FoodMart",
      status: "In transit",
      eta: "20 minutes",
      driver: "Sarah Transport"
    },
  ]

  const handleClaim = (donationId: number) => {
    alert(`Donation ${donationId} claimed successfully! A driver will be assigned shortly.`)
  }

  const isAnimalShelter = user?.role === "shelter"
  
  const filteredDonations = useMemo(() => {
    let filtered = availableDonations.filter(donation => {
      const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === "all" || donation.foodType.toLowerCase().includes(filterType.toLowerCase())
      const matchesCategory = isAnimalShelter ? donation.category === "animal" : donation.category === "human"
      return matchesSearch && matchesType && matchesCategory
    })

    // Sort by selected option
    if (sortBy === "distance-asc") {
      filtered = filtered.sort((a, b) => a.distance - b.distance)
    } else if (sortBy === "distance-desc") {
      filtered = filtered.sort((a, b) => b.distance - a.distance)
    }

    return filtered
  }, [availableDonations, searchQuery, filterType, isAnimalShelter, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-glow-magenta mb-2">
              {isAnimalShelter ? "Animal Shelter" : "NGO"} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Browse and claim food donations for your {isAnimalShelter ? "shelter" : "organization"}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <NeonCard glowColor="magenta" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold neon-glow-magenta">47</div>
                  <div className="text-sm text-muted-foreground">Total Received</div>
                </div>
                <Package className="w-8 h-8 text-[var(--neon-magenta)]" />
              </div>
            </NeonCard>

            <NeonCard glowColor="cyan" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold neon-glow-cyan">2,340</div>
                  <div className="text-sm text-muted-foreground">People Fed</div>
                </div>
                <TrendingUp className="w-8 h-8 text-[var(--neon-cyan)]" />
              </div>
            </NeonCard>

            <NeonCard glowColor="purple" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold neon-glow-purple">5</div>
                  <div className="text-sm text-muted-foreground">Active Claims</div>
                </div>
                <Clock className="w-8 h-8 text-[var(--neon-purple)]" />
              </div>
            </NeonCard>

            <NeonCard glowColor="green" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[var(--neon-green)]" style={{ textShadow: "0 0 20px var(--neon-green)" }}>12</div>
                  <div className="text-sm text-muted-foreground">New Alerts</div>
                </div>
                <Bell className="w-8 h-8 text-[var(--neon-green)]" />
              </div>
            </NeonCard>
          </div>

          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="claimed">Claimed</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              <NeonCard glowColor="magenta" intensity="high">
                <NeonCardHeader>
                  <NeonCardTitle>Available Food Donations</NeonCardTitle>
                  <NeonCardDescription>
                    {isAnimalShelter ? "Animal food filtered for your shelter" : "Human food filtered for your organization"}
                  </NeonCardDescription>
                </NeonCardHeader>
                <NeonCardContent>
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search donations..."
                        className="pl-10 neon-border-magenta"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full md:w-48 neon-border-magenta">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="cooked">Cooked Food</SelectItem>
                        <SelectItem value="produce">Fresh Produce</SelectItem>
                        <SelectItem value="packaged">Packaged</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-48 neon-border-magenta">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="distance-asc">Distance: Nearest</SelectItem>
                        <SelectItem value="distance-desc">Distance: Farthest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Donations Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredDonations.map((donation) => (
                      <div key={donation.id} className="p-6 rounded-lg glass-card border border-[var(--neon-magenta)]/30 hover:border-[var(--neon-magenta)] transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{donation.title}</h3>
                            <p className="text-sm text-muted-foreground">{donation.donor}</p>
                          </div>
                          <Badge variant="outline" className="bg-[var(--neon-green)]/20 text-[var(--neon-green)] border-[var(--neon-green)]">
                            Available
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-[var(--neon-cyan)]" />
                            <span>{donation.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Package className="w-4 h-4 text-[var(--neon-magenta)]" />
                            <span>{donation.quantity}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-[var(--neon-orange)]" />
                            <span>Expires: {donation.expiry}</span>
                          </div>
                        </div>

                        <Button 
                          variant="neonSolid" 
                          className="w-full"
                          onClick={() => handleClaim(donation.id)}
                        >
                          Claim Donation
                        </Button>
                      </div>
                    ))}
                  </div>

                  {filteredDonations.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No donations match your search</p>
                    </div>
                  )}
                </NeonCardContent>
              </NeonCard>
            </TabsContent>

            <TabsContent value="claimed">
              <div className="grid md:grid-cols-2 gap-6">
                {claimedDonations.map((donation) => (
                  <NeonCard key={donation.id} glowColor="cyan">
                    <NeonCardHeader>
                      <NeonCardTitle>{donation.title}</NeonCardTitle>
                      <NeonCardDescription>From: {donation.donor}</NeonCardDescription>
                    </NeonCardHeader>
                    <NeonCardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg glass-card">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge variant="outline" className="bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border-[var(--neon-cyan)]">
                            {donation.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg glass-card">
                          <span className="text-sm text-muted-foreground">ETA</span>
                          <span className="font-medium">{donation.eta}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg glass-card">
                          <span className="text-sm text-muted-foreground">Driver</span>
                          <span className="font-medium">{donation.driver}</span>
                        </div>
                        <Button variant="neon" className="w-full">
                          Track Delivery
                        </Button>
                      </div>
                    </NeonCardContent>
                  </NeonCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts">
              <NeonCard glowColor="purple">
                <NeonCardHeader>
                  <NeonCardTitle>Real-time Alerts</NeonCardTitle>
                  <NeonCardDescription>Get notified about new donations</NeonCardDescription>
                </NeonCardHeader>
                <NeonCardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start gap-4 p-4 rounded-lg glass-card border border-[var(--neon-purple)]/30">
                        <div className="w-10 h-10 rounded-full bg-[var(--neon-cyan)]/20 flex items-center justify-center flex-shrink-0">
                          <Bell className="w-5 h-5 text-[var(--neon-cyan)]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">New donation available nearby</div>
                          <p className="text-sm text-muted-foreground">
                            Fresh produce - 30kg available 1.5km away
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">5 minutes ago</p>
                        </div>
                        <Button variant="neon" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </NeonCardContent>
              </NeonCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}