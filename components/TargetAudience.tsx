'use client'
import { motion } from 'framer-motion'
import { Users, Cpu, Building2 } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

const icons = [Cpu, Users, Building2]

export default function TargetAudience({ dictionary }: BaseComponentProps) {
  return (
    <section className="py-16 px-6 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
            {dictionary.targetAudience.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {dictionary.targetAudience.items.map((item: { title: string; description: string }, index: number) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
