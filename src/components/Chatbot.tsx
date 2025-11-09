"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm SmartServe AI Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    "How do I donate food?",
    "Track my delivery",
    "IoT sensor info",
    "Partnership details"
  ]

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    let botResponse = "I understand your question. "
    
    if (messageText.toLowerCase().includes("donate") || messageText.toLowerCase().includes("food")) {
      botResponse = "To donate food, simply sign up as a donor, upload an image of your food, and our AI will automatically route it to the right recipients. You can also set up recurring donations!"
    } else if (messageText.toLowerCase().includes("track")) {
      botResponse = "You can track your delivery in real-time from your dashboard. We provide live GPS tracking and IoT sensor data to ensure food quality during transport."
    } else if (messageText.toLowerCase().includes("sensor") || messageText.toLowerCase().includes("iot")) {
      botResponse = "Our IoT sensors monitor pH levels, gas detection, temperature, and bio-safety in real-time during delivery. This ensures food quality and safety throughout the journey."
    } else if (messageText.toLowerCase().includes("partner")) {
      botResponse = "We welcome partners from all categories: donors, NGOs, animal shelters, logistics providers, and volunteers. Visit our Partner With Us page to apply!"
    } else {
      botResponse += "I can help you with food donations, tracking deliveries, understanding our IoT technology, or partnership opportunities. What would you like to know more about?"
    }

    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      sender: "bot",
      timestamp: new Date()
    }
    
    setIsTyping(false)
    setMessages(prev => [...prev, botMessage])
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              variant="default"
              size="icon"
              className="w-16 h-16 rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md"
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="flex flex-row items-center justify-between p-5 border-b border-border bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">SmartServe AI</div>
                    <div className="text-xs text-primary">● Online</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-0">
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-5 space-y-4 bg-background">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.sender === "bot"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}>
                        {message.sender === "bot" ? (
                          <Bot className="w-5 h-5 text-primary-foreground" />
                        ) : (
                          <User className="w-5 h-5 text-foreground" />
                        )}
                      </div>
                      <div
                        className={`max-w-[75%] p-4 rounded-lg ${
                          message.sender === "bot"
                            ? "bg-card border border-border"
                            : "bg-primary/10 border border-primary"
                        }`}
                      >
                        <p className="text-sm text-foreground">{message.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="p-4 rounded-lg bg-card border border-border">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-5 pb-4 bg-background">
                    <p className="text-xs text-muted-foreground mb-3">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSendMessage(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-5 border-t border-border bg-secondary">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="flex gap-3"
                  >
                    <Input
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1 bg-background border-border"
                    />
                    <Button
                      type="submit"
                      variant="default"
                      size="icon"
                      disabled={!inputValue.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}