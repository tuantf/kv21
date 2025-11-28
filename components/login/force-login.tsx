'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { initial, animate, transition } from '@/libs/motion'
import { useRouter } from 'next/navigation'

const ForceLogin = () => {
  const router = useRouter()

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className="flex h-full flex-1 flex-col items-center justify-center gap-4 p-0 pt-0"
    >
      <div>Vui lòng đăng nhập để xem nội dung này</div>
      <Button
        variant="outline"
        className="bg-signature-blue/80 hover:bg-signature-blue/90 text-white hover:text-white"
        onClick={() => router.push('/dang-nhap')}
      >
        Đăng nhập
      </Button>
    </motion.div>
  )
}

export { ForceLogin }
