"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Users, MessageSquare, Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2973B2] mb-6">
                AI-Powered Police Officer Matching System
              </h1>
              <p className="text-lg mb-8 text-zinc-700 dark:text-zinc-300">
                Our advanced AI system helps match the right officers to your case based on skills, experience, and case
                requirements.
              </p>
              <Link href="/find">
                <Button className="bg-[#2973B2] hover:bg-[#2973B2]/90 text-white px-6 py-6 rounded-md text-lg group">
                  Find Officers Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-[#9ACBD0] dark:bg-[#48A6A7] rounded-lg transform rotate-3"></div>
                <div className="relative bg-[#F2EFE7] dark:bg-zinc-800 p-8 rounded-lg shadow-xl border border-[#9ACBD0] dark:border-[#48A6A7]">
                  <div className="flex items-center mb-6">
                    <Shield className="h-10 w-10 text-[#2973B2] mr-3" />
                    <h2 className="text-2xl font-bold text-[#2973B2]">PoliceAdvisor</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="message-bubble bot-message">How can I help with your case today?</div>
                    <div className="message-bubble user-message">I need officers for a robbery case in downtown.</div>
                    <div className="message-bubble bot-message">
                      I've found 3 officers with robbery expertise. Would you like to see their profiles?
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="wave-animation">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#9ACBD0]/10 dark:bg-[#48A6A7]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#2973B2] mb-4">Key Features</h2>
            <p className="text-lg max-w-2xl mx-auto text-zinc-700 dark:text-zinc-300">
              Our system uses advanced algorithms to match the perfect officers for your case
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border-t-4 border-[#2973B2]"
            >
              <div className="bg-[#9ACBD0]/20 dark:bg-[#48A6A7]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-[#2973B2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2973B2]">Skill-Based Matching</h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                Our system analyzes officer skills and experience to find the perfect match for your case requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border-t-4 border-[#2973B2]"
            >
              <div className="bg-[#9ACBD0]/20 dark:bg-[#48A6A7]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageSquare className="h-7 w-7 text-[#2973B2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2973B2]">Text Input</h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                Describe your case using text of 30+ charcters for a seamless experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border-t-4 border-[#2973B2]"
            >
              <div className="bg-[#9ACBD0]/20 dark:bg-[#48A6A7]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Lock className="h-7 w-7 text-[#2973B2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2973B2]">Secure & Private</h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                Your case details are handled with the highest level of security and privacy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#2973B2] text-white rounded-xl p-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to find the right officers?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our AI-powered system is ready to help you match the perfect officers for your case.
            </p>
            <Link href="/find">
              <Button className="bg-white text-[#2973B2] hover:bg-white/90 px-6 py-6 rounded-md text-lg">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
