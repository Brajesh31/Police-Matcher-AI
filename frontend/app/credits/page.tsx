"use client"

import { motion } from "framer-motion"
import { Users, Heart, Code } from "lucide-react"

export default function CreditsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[80vw] mx-auto"
      >
        <div className="flex items-center mb-8">
          <Heart className="h-8 w-8 text-[#2973B2] mr-3" />
          <h1 className="text-3xl font-bold text-[#2973B2]">Credits & Acknowledgements</h1>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8 border border-[#9ACBD0] dark:border-[#48A6A7]">
          <p className="mb-8 text-lg">
            PoliceAdvisor was made possible by the contributions and support of many individuals and organizations. We&apos;d
            like to express our gratitude to everyone involved.
          </p>

          <div className="space-y-10">
            <section>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-[#2973B2] mr-2" />
                <h2 className="text-2xl font-semibold text-[#2973B2]">Core Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#9ACBD0]/10 dark:bg-[#48A6A7]/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Development Team</h3>
                  <ul className="space-y-2">
                    <li>Megh Deb</li>
                    <li>Sayambar Roychowdhury</li>
                    <li>Subham Mani</li>
                    <li>Ronit Bose</li>
                  </ul>
                </div>
                <div className="bg-[#9ACBD0]/10 dark:bg-[#48A6A7]/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Advisory Board</h3>
                  <ul className="space-y-2">
                    <li>Prof. (Dr.) Santanu Roy</li>
                    <li>Prof. (Dr.) Soumya Sen</li>
                    <li>Sreedatri Das</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-[#2973B2] mr-2" />
                <h2 className="text-2xl font-semibold text-[#2973B2]">Technologies Used</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#9ACBD0]/10 dark:bg-[#48A6A7]/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>Lucide Icons</li>
                  </ul>
                </div>
                <div className="bg-[#9ACBD0]/10 dark:bg-[#48A6A7]/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Backend</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>Gemini 2.0 Flash</li>
                  </ul>
                </div>
                <div className="bg-[#9ACBD0]/10 dark:bg-[#48A6A7]/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Tools</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Git & GitHub</li>
                    <li>Figma</li>
                    <li>Vercel</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
