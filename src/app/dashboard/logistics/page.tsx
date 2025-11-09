"use client"

import { useState } from "react"
import DashboardNav from "@/components/DashboardNav"
import Chatbot from "@/components/Chatbot"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, MapPin, Package, CheckCircle, AlertTriangle, Droplet, Gauge, Thermometer, Activity, Camera, Navigation } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LogisticsDashboard() {
  const { user } = useAuth()
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  const activeJobs = [
    {
      id: 1,
      pickup: "Grand Plaza Hotel",
      delivery: "Hope Foundation",
      distance: "8.5km",
      status: "In Transit",
      items: "Cooked Meals - 100 servings",
      pickupTime: "2:30 PM",
      deliveryTime: "3:15 PM",
      sensors: {
        pH: { value: 6.8, status: "normal", label: "pH Level" },
        gas: { value: 12, status: "normal", label: "Gas PPM" },
        temp: { value: 4.2, status: "normal", label: "Temperature °C" },
        bio: { value: 98, status: "normal", label: "Bio Safety %" }
      }
    },
    {
      id: 2,
      pickup: "Green Market",
      delivery: "Animal Care Shelter",
      distance: "12.3km",
      status: "Pickup Pending",
      items: "Fresh Produce - 50kg",
      pickupTime: "4:00 PM",
      deliveryTime: "4:45 PM",
      sensors: {
        pH: { value: 7.2, status: "normal", label: "pH Level" },
        gas: { value: 8, status: "normal", label: "Gas PPM" },
        temp: { value: 3.8, status: "normal", label: "Temperature °C" },
        bio: { value: 99, status: "normal", label: "Bio Safety %" }
      }
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3">
              Logistics Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage deliveries with real-time IoT monitoring
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">8</div>
                  <div className="text-sm text-muted-foreground">Active Jobs</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">134</div>
                  <div className="text-sm text-muted-foreground">Total Deliveries</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">99.2%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">18min</div>
                  <div className="text-sm text-muted-foreground">Avg Delivery</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border border-border p-1">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid lg:grid-cols-2 gap-6">
                {activeJobs.map((job) => (
                  <div key={job.id} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Job #{job.id}</h3>
                          <p className="text-muted-foreground">{job.items}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            job.status === "In Transit" 
                              ? "bg-primary/10 text-primary border-primary"
                              : "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          {job.status}
                        </Badge>
                      </div>

                      {/* Route Info */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-muted-foreground mb-1">Pickup</div>
                            <div className="font-medium text-foreground">{job.pickup}</div>
                            <div className="text-sm text-muted-foreground">{job.pickupTime}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-muted-foreground mb-1">Delivery</div>
                            <div className="font-medium text-foreground">{job.delivery}</div>
                            <div className="text-sm text-muted-foreground">{job.deliveryTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-secondary">
                      {/* IoT Sensors */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Activity className="w-5 h-5 text-primary" />
                          <span className="text-sm font-semibold">IoT Sensor Monitoring</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <Droplet className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{job.sensors.pH.label}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {job.sensors.pH.value}
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <Gauge className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{job.sensors.gas.label}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {job.sensors.gas.value}
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <Thermometer className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{job.sensors.temp.label}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {job.sensors.temp.value}
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{job.sensors.bio.label}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {job.sensors.bio.value}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm text-primary font-medium">All sensors within safe range</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <Button variant="outline" size="sm">
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          AI Verify
                        </Button>
                      </div>

                      {job.status === "In Transit" && (
                        <Button variant="default" className="w-full mt-4">
                          Complete Delivery
                        </Button>
                      )}
                      {job.status === "Pickup Pending" && (
                        <Button variant="default" className="w-full mt-4">
                          Start Pickup
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-semibold mb-2">Live Map Navigation</h3>
                  <p className="text-muted-foreground">Real-time tracking of all active deliveries</p>
                </div>
                <div className="p-6">
                  <div className="aspect-video rounded-lg bg-secondary border border-border flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <MapPin className="w-16 h-16 mx-auto text-primary" />
                      <p className="text-foreground font-medium">Interactive map with live GPS tracking</p>
                      <p className="text-sm text-muted-foreground">Shows all active routes, pickup points, and delivery destinations</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-semibold mb-2">Delivery History</h3>
                  <p className="text-muted-foreground">Past successful deliveries</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center justify-between p-5 rounded-lg bg-secondary border border-border hover:bg-muted transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground mb-1">Sweet Bakery → Hope NGO</div>
                            <div className="text-sm text-muted-foreground">Bakery items - 200 pieces</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-primary mb-1">Completed</div>
                          <div className="text-xs text-muted-foreground">2 hours ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}