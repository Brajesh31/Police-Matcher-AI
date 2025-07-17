"use client"

import { motion } from "framer-motion"

type CommandSuggestionsProps = {
  commands: { command: string; description: string }[]
  selectedIndex: number
  onSelect: (command: string) => void
}

export default function CommandSuggestions({ commands, selectedIndex, onSelect }: CommandSuggestionsProps) {
  const filteredCommands = commands

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full left-4 mb-2 chat-command-suggestion w-64"
    >
      <div className="text-sm font-medium mb-1 text-[#2973B2]">Commands</div>
      <div className="max-h-48 overflow-y-auto">
        {filteredCommands.map((cmd, index) => (
          <div
            key={cmd.command}
            className={`chat-command-suggestion-item ${index === selectedIndex ? "active" : ""}`}
            onClick={() => onSelect(cmd.command)}
          >
            <div className="font-medium text-[#2973B2]">{cmd.command}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">{cmd.description}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
