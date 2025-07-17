"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, AlertCircle, Sun, Moon, Loader } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import OfficerCard from "@/components/officer-card"
import CommandSuggestions from "@/components/command-suggestions"
import AboutInfo from "@/components/about-info"
import ContactInfo from "@/components/contact-info"
import { useTheme } from "next-themes"

type Officer = {
  name: string
  age: number
  short_description: string
  skills: string
  experience: number
  gender: string
  reason: string
}

type ChatMessage = {
  id: string
  role: "user" | "bot"
  content: string
  officers?: Officer[]
}

export default function FindPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Welcome to the Police Advisory System. Please describe your case to find matching officers.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const commands = [
    { command: "/about", description: "Show information about us" },
    { command: "/contact", description: "Show contact information" },
    { command: "/clear", description: "Clear chat history" },
    { command: "/help", description: "Show available commands" },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }

      if (showCommandSuggestions) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedCommandIndex((prev) => (prev < commands.length - 1 ? prev + 1 : prev))
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedCommandIndex((prev) => (prev > 0 ? prev - 1 : prev))
        } else if (e.key === "Tab" || e.key === "Enter") {
          e.preventDefault()
          selectCommand(commands[selectedCommandIndex].command)
        } else if (e.key === "Escape") {
          setShowCommandSuggestions(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showCommandSuggestions, selectedCommandIndex])

  useEffect(() => {
    if (input.startsWith("/")) {
      setShowCommandSuggestions(true)
      setSelectedCommandIndex(0)
    } else {
      setShowCommandSuggestions(false)
    }
  }, [input])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const selectCommand = (command: string) => {
    setInput(command)
    setShowCommandSuggestions(false)
    textareaRef.current?.focus()
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Handle commands
    if (input.startsWith("/")) {
      handleCommand(input)
      return
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: input }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response:", data)

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: `I've found ${data.requiredOfficers} officers that match your case requirements:`,
        officers: data.selectedOfficers,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Error details:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: `Sorry, there was an error processing your request. ${err instanceof Error ? err.message : "Please try again later."}`,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCommand = (command: string) => {
    switch (command) {
      case "/about":
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "user",
            content: command,
          },
          {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content: "<AboutInfo />",
          },
        ])
        break
      case "/contact":
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "user",
            content: command,
          },
          {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content: "<ContactInfo />",
          },
        ])
        break
      case "/clear":
        setMessages([
          {
            id: "welcome",
            role: "bot",
            content: "Chat history cleared. How can I help you today?",
          },
        ])
        break
      case "/help":
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "user",
            content: command,
          },
          {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content:
              "Available commands:\n/about - Show information about us\n/contact - Show contact information\n/clear - Clear chat history\n/help - Show available commands",
          },
        ])
        break
      default:
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "user",
            content: command,
          },
          {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content: `Unknown command: ${command}. Type /help to see available commands.`,
          },
        ])
    }
    setInput("")
  }

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  //     mediaRecorderRef.current = new MediaRecorder(stream)
  //     audioChunksRef.current = []

  //     mediaRecorderRef.current.ondataavailable = (event) => {
  //       audioChunksRef.current.push(event.data)
  //     }

  //     mediaRecorderRef.current.onstop = async () => {
  //       setIsLoading(true)

  //       try {
  //         await new Promise((resolve) => setTimeout(resolve, 1500))

  //         // Simulated text from audio
  //         const transcribedText = "Armed robbery at First National Bank on Main Street. Two suspects with handguns."

  //         setInput(transcribedText)
  //         setIsLoading(false)
  //       } catch (error) {
  //         console.error("Error processing audio:", error)
  //         setError("Failed to process audio. Please try again.")
  //         setIsLoading(false)
  //       }

  //       // Stop all audio tracks
  //       stream.getTracks().forEach((track) => track.stop())
  //     }

  //     mediaRecorderRef.current.start()
  //     setIsRecording(true)
  //   } catch (error) {
  //     console.error("Error accessing microphone:", error)
  //     setError("Could not access microphone. Please check permissions.")
  //   }
  // }

  // const stopRecording = () => {
  //   if (mediaRecorderRef.current && isRecording) {
  //     mediaRecorderRef.current.stop()
  //     setIsRecording(false)
  //   }
  // }

  // const toggleRecording = () => {
  //   if (isRecording) {
  //     stopRecording()
  //   } else {
  //     startRecording()
  //   }
  // }

  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-6 flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-[#9ACBD0] dark:border-[#48A6A7] flex-grow flex flex-col overflow-hidden"
        >
          <div className="p-4 bg-[#2973B2] text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Police Officer Matching System</h2>
              <p className="text-sm opacity-80">Describe your case in at least 30 characters to find the right officers</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-white/10"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`message-bubble ${message.role === "user" ? "user-message" : "bot-message"}`}>
                      {message.content === "<AboutInfo />" ? (
                        <AboutInfo />
                      ) : message.content === "<ContactInfo />" ? (
                        <ContactInfo />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}

                      {message.officers && (
                        <div className="mt-4 space-y-3">
                          {message.officers.map((officer, index) => (
                            <OfficerCard key={index} officer={officer} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bot-message">
                    <div className="flex items-center space-x-2">
                      <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-md flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-[#9ACBD0] dark:border-[#48A6A7] relative">
            {showCommandSuggestions && (
              <CommandSuggestions commands={commands} selectedIndex={selectedCommandIndex} onSelect={selectCommand} />
            )}

            <div className="flex items-end space-x-3">
              <Textarea
                ref={textareaRef}
                value={input}
                title="At least 30 characters required"
                onChange={handleInputChange}
                placeholder="Describe your case in at least 30 charcters"
                className="resize-none border-[#9ACBD0] dark:border-[#48A6A7] focus:ring-[#2973B2] min-h-[80px] rounded-lg shadow-sm"
                rows={5}
              />
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="rounded-full bg-[#2973B2] hover:bg-[#2973B2]/90 shadow-sm"
                  size="icon"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
