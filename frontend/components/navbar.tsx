"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#F2EFE7] dark:bg-zinc-900 border-b border-[#9ACBD0] dark:border-[#48A6A7]"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-[#2973B2]" />
          <span className="font-bold text-xl text-[#2973B2]">Police Advisor</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/find">
            <Button variant="outline" className="text-[#2973B2] border-[#48A6A7] hover:text-black hover:bg-[#9ACBD0]/90">
              Find Officers
            </Button>
          </Link>
          <Link href="/credits">
            <Button variant="outline" className="text-[#2973B2] border-[#48A6A7] hover:text-black hover:bg-[#9ACBD0]/90">
              Credits
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:text-black hover:bg-[#9ACBD0]/90"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 hover:text-black text-[#F2EFE7]" />
            ) : (
              <Moon className="h-5 w-5 hover:text-black text-[#2973B2]" />
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
