'use client'

import { LoginForm } from '@/components/login/login-form'
import { motion } from 'motion/react'
import { initial, animate, transition } from '@/libs/motion'
import { Beams } from '@/components/background/beam'

export default function LoginPage() {
  return (
    <div className="relative">
      <Beams className="absolute inset-0" />
      <div className="bg-background relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 p-2 md:bg-transparent md:p-8">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="w-full max-w-sm"
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  )
}
