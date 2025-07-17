import { Shield } from "lucide-react"

export default function AboutInfo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <Shield className="h-5 w-5 text-[#2973B2] mr-2" />
        <h3 className="font-semibold text-lg">About PoliceAdvisor</h3>
      </div>

      <p>
        PoliceAdvisor is an AI-powered system designed to match the right police officers to specific cases based on
        their skills, experience, and case requirements.
      </p>

      <p>
        Our mission is to optimize police resource allocation, ensuring that officers with the most relevant expertise
        are assigned to cases where their skills will be most effective.
      </p>

      <p>
        The system analyzes case descriptions and matches them with officer profiles using advanced algorithms to find
        the best possible matches.
      </p>

      <div className="pt-2 text-sm text-zinc-600 dark:text-zinc-400">
        <p>© 2025 PoliceAdvisor - All rights reserved</p>
      </div>
    </div>
  )
}
