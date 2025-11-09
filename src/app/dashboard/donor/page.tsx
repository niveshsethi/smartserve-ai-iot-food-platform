"use client"

import { useState } from "react"
import DashboardNav from "@/components/DashboardNav"
import Chatbot from "@/components/Chatbot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Sparkles, Package, TrendingUp, Clock, CheckCircle, Camera, DollarSign } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function DonorDashboard() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [aiResult, setAiResult] = useState<{ type: string; confidence: number } | null>(null)
  const [isRecurring, setIsRecurring] = useState(false)
  const [isVoluntary, setIsVoluntary] = useState(false)

  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    location: "",
    description: "",
    donationAmount: ""
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setTimeout(() => {
        const types = ["human", "animal"]
        const randomType = types[Math.floor(Math.random() * types.length)]
        setAiResult({
          type: randomType,
          confidence: 95 + Math.random() * 5
        })
      }, 1500)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({
      foodType: "",
      quantity: "",
      unit: "",
      expiryDate: "",
      location: "",
      description: "",
      donationAmount: ""
    })
    setImageFile(null)
    setAiResult(null)
    alert("Food donation listed successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground text-lg">
              List your surplus food and make a difference
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">24</div>
                  <div className="text-sm text-muted-foreground">Total Donations</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">1,247</div>
                  <div className="text-sm text-muted-foreground">Meals Provided</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">8</div>
                  <div className="text-sm text-muted-foreground">Active Donations</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="new" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border border-border p-1">
              <TabsTrigger value="new">New Donation</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="new">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Plus className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">List New Food Donation</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI will analyze your food image and route it to the right recipients
                  </p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* AI Image Detection */}
                    <div className="space-y-4">
                      <Label>Upload Food Image (AI Detection)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors bg-secondary">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="food-image"
                        />
                        <label htmlFor="food-image" className="cursor-pointer">
                          <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, JPEG (MAX. 5MB)
                          </p>
                        </label>
                      </div>

                      {imageFile && (
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="flex items-center gap-3 mb-3">
                            <Upload className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">{imageFile.name}</span>
                          </div>
                          {aiResult && (
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary">
                              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                              <div>
                                <div className="font-medium text-primary">
                                  AI Detection: {aiResult.type === "human" ? "Human Food" : "Animal Food"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Confidence: {aiResult.confidence.toFixed(1)}%
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Will be routed to: {aiResult.type === "human" ? "NGOs" : "Animal Shelters"}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="foodType">Food Type *</Label>
                        <Select
                          value={formData.foodType}
                          onValueChange={(value) => setFormData({...formData, foodType: value})}
                          required
                        >
                          <SelectTrigger className="border-border">
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cooked">Cooked Meals</SelectItem>
                            <SelectItem value="packaged">Packaged Food</SelectItem>
                            <SelectItem value="produce">Fresh Produce</SelectItem>
                            <SelectItem value="bakery">Bakery Items</SelectItem>
                            <SelectItem value="dairy">Dairy Products</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="quantity"
                            type="number"
                            placeholder="100"
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                            required
                            className="flex-1"
                          />
                          <Select
                            value={formData.unit}
                            onValueChange={(value) => setFormData({...formData, unit: value})}
                            required
                          >
                            <SelectTrigger className="w-32 border-border">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">Kg</SelectItem>
                              <SelectItem value="servings">Servings</SelectItem>
                              <SelectItem value="items">Items</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Pickup Location *</Label>
                        <Input
                          id="location"
                          placeholder="Enter address"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Additional Details</Label>
                      <Textarea
                        id="description"
                        placeholder="Any special storage requirements, allergen information, etc."
                        className="border-border min-h-24"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    {/* Recurring Donation */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border">
                      <div className="space-y-0.5">
                        <Label className="text-base">Recurring Donation</Label>
                        <p className="text-sm text-muted-foreground">
                          Set this as a weekly recurring donation
                        </p>
                      </div>
                      <Switch
                        checked={isRecurring}
                        onCheckedChange={setIsRecurring}
                      />
                    </div>

                    {/* Voluntary Donation */}
                    <div className="space-y-4 p-4 rounded-lg bg-secondary border border-border">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Voluntary Donation
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Add a monetary donation to support delivery costs
                          </p>
                        </div>
                        <Switch
                          checked={isVoluntary}
                          onCheckedChange={setIsVoluntary}
                        />
                      </div>
                      
                      {isVoluntary && (
                        <Input
                          type="number"
                          placeholder="Enter amount ($)"
                          value={formData.donationAmount}
                          onChange={(e) => setFormData({...formData, donationAmount: e.target.value})}
                        />
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "List Food Donation"}
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Cooked Meals - 50 Servings</h3>
                      <p className="text-sm text-muted-foreground mb-4">Listed 2 hours ago</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="text-primary font-medium">Claimed by Hope Foundation</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pickup:</span>
                          <span>Today, 5:00 PM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Driver:</span>
                          <span>On the way</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          Track Delivery
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-semibold mb-2">Donation Impact History</h3>
                  <p className="text-muted-foreground">Your contribution to the community</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center justify-between p-5 rounded-lg bg-secondary border border-border hover:bg-muted transition-colors">
                        <div>
                          <div className="font-medium text-foreground mb-1">Fresh Produce - 25kg</div>
                          <div className="text-sm text-muted-foreground">Delivered to Green Hope NGO</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-primary mb-1">Completed</div>
                          <div className="text-xs text-muted-foreground">2 days ago</div>
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