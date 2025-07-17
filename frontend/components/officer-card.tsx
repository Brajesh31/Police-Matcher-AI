"use client"

import { motion } from "framer-motion"
import { Star, Clock } from "lucide-react"

type OfficerProps = {
  officer: {
    name: string
    age: number
    short_description: string
    skills: string
    experience: number
    gender: string
    reason: string
  }
}

export default function OfficerCard({ officer }: OfficerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="officer-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-[#9ACBD0]/30 dark:bg-[#48A6A7]/30 rounded-full flex items-center justify-center">
          <span className="text-2xl" aria-label={officer.gender === "male" ? "Male officer" : "Female officer"}>
            {officer.gender === "male" ? "👮‍♂️" : "👮🏻‍♀️"}
          </span>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="font-semibold text-lg text-[#2973B2]">{officer.name}</h3>
            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mr-3">{officer.age} years old</span>
              <span>{officer.gender}</span>
            </div>
          </div>

          <p className="mt-1 text-zinc-700 dark:text-zinc-300">{officer.short_description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center bg-[#9ACBD0]/20 dark:bg-[#48A6A7]/20 px-2 py-1 rounded text-sm">
              <Star className="h-4 w-4 mr-1 text-[#2973B2]" />
              <span>{officer.skills}</span>
            </div>
            <div className="flex items-center bg-[#9ACBD0]/20 dark:bg-[#48A6A7]/20 px-2 py-1 rounded text-sm">
              <Clock className="h-4 w-4 mr-1 text-[#2973B2]" />
              <span>{officer.experience} years experience</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#9ACBD0]/30 dark:border-[#48A6A7]/30">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong className="text-[#2973B2]">Match reason:</strong> {officer.reason}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
