'use client'

import React, { useRef } from 'react'

import SimpleMarquee from '@/components/fancy/blocks/simple-marquee'
import { motion } from 'motion/react'
import { cn } from '@/libs/utils'
import { Inter, IBM_Plex_Serif } from 'next/font/google'
import { ArrowRight, MoveRight, Phone, MapPin, User } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const ibm_plex_serif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const exampleImages = [
  'https://cdn.cosmos.so/4b771c5c-d1eb-4948-b839-255dbeb931ba?format=jpeg',
  'https://cdn.cosmos.so/a8d82afd-2293-43ad-bac3-887683d85b44?format=jpeg',
  'https://cdn.cosmos.so/49206ba5-c174-4cd5-aee8-5b744842e6c2?format=jpeg',
  'https://cdn.cosmos.so/b29bd150-6477-420f-8efb-65ed99694421?format=jpeg',
  'https://cdn.cosmos.so/e1a0313e-7617-431d-b7f1-f1b169e6bcb4?format=jpeg',
  'https://cdn.cosmos.so/ad640c12-69fb-4186-bc3d-b1cc93986a37?format=jpeg',
  'https://cdn.cosmos.so/5cf0c3d2-e785-41a3-b0c8-a073ee2f2862?format=jpeg',
  'https://cdn.cosmos.so/938ab21c-a975-41b3-b303-418290343b09?format=jpeg',
  'https://cdn.cosmos.so/2e14a9bb-27e3-40fd-b940-cfb797a1224c?format=jpeg',
  'https://cdn.cosmos.so/81841d9f-e164-4770-aebc-cfc97d72f3ab?format=jpeg',
  'https://cdn.cosmos.so/49b81db0-37ea-4569-b0d6-04afa5115a10?format=jpeg',
  'https://cdn.cosmos.so/ade1834b-9317-44fb-8dc3-b43d29acd409?format=jpeg',
  'https://cdn.cosmos.so/621c250c-3833-45f9-862a-3f400aaf8f28?format=jpeg',
]

const initial = { opacity: 0, y: 20, filter: 'blur(10px)' }
const animate = { opacity: 1, y: 0, filter: 'blur(0px)' }
const transition = { duration: 0.75 }

const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-2 cursor-pointer duration-300 ease-in-out hover:scale-105 sm:mx-3 md:mx-4">
    {children}
  </div>
)

export default function SimpleMarqueeDemo() {
  const firstThird = exampleImages.slice(0, Math.floor(exampleImages.length / 3))
  const secondThird = exampleImages.slice(
    Math.floor(exampleImages.length / 3),
    Math.floor((2 * exampleImages.length) / 3),
  )
  const lastThird = exampleImages.slice(Math.floor((2 * exampleImages.length) / 3))

  const container = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-screen w-dvw flex-col items-center justify-center overflow-x-hidden overflow-y-auto bg-white"
      ref={container}
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={cn(
          ibm_plex_serif.className,
          'md:text-md ht absolute top-0 z-10 mt-8 flex items-center justify-center text-center text-sm',
        )}
      >
        <img src="/pccc.avif" alt="logo" className="mr-2 h-10" />
        <div>
          <p>PHÒNG CẢNH SÁT PCCC&CNCH</p>
          <p className="text-md leading-tight font-bold tracking-tight md:text-lg">
            ĐỘI CC&CNCH KHU VỰC SỐ 21
          </p>
        </div>
      </motion.div>
      <motion.h1
        initial={initial}
        animate={animate}
        transition={transition}
        className={cn(
          inter.className,
          'absolute top-1/6 z-10 px-2 text-center text-3xl leading-tight font-bold tracking-tight sm:text-5xl md:-mt-4 md:text-6xl',
        )}
      >
        Chương trình tuyên truyền, <br /> trải nghiệm, thực hành <br />
        <span className={cn(ibm_plex_serif.className, 'font-medium italic')}>
          <span className="text-signature-orange/80">chữa cháy</span> và{' '}
          <span className="text-signature-blue/80">cứu nạn cứu hộ</span>
        </span>
      </motion.h1>
      <motion.p
        initial={initial}
        animate={animate}
        transition={transition}
        className={cn(
          ibm_plex_serif.className,
          'z-10 -mt-16 max-w-2xl px-2 text-center text-sm italic md:mt-4 md:text-lg',
        )}
      >
        "Chương trình trải nghiệm thực tế mang đến kiến thức, kỹ năng bổ ích về phòng cháy, chữa
        cháy, cứu nạn, cứu hộ cùng nhiều hoạt động thú vị"
      </motion.p>

      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="absolute top-0 z-0 flex h-[170%] w-full flex-col items-center justify-center space-y-2 sm:h-[200%] sm:space-y-3 md:space-y-4"
      >
        <SimpleMarquee
          className="w-full"
          baseVelocity={4}
          repeat={4}
          draggable={false}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          slowDownFactor={0.1}
          slowdownOnHover
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          scrollAwareDirection={true}
          scrollContainer={container}
          useScrollVelocity={true}
          direction="left"
        >
          {firstThird.map((src, i) => (
            <MarqueeItem key={i}>
              <img
                src={src}
                alt={`Image ${i + 1}`}
                className="h-27 w-48 rounded-lg object-cover sm:h-27 sm:w-48 md:h-45 md:w-80"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>

        <SimpleMarquee
          className="w-full"
          baseVelocity={4}
          repeat={4}
          scrollAwareDirection={true}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          slowdownOnHover
          slowDownFactor={0.1}
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          useScrollVelocity={true}
          scrollContainer={container}
          draggable={false}
          direction="right"
        >
          {secondThird.map((src, i) => (
            <MarqueeItem key={i}>
              <img
                src={src}
                alt={`Image ${i + firstThird.length}`}
                className="h-27 w-48 rounded-lg object-cover sm:h-27 sm:w-48 md:h-45 md:w-80"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>

        <SimpleMarquee
          className="w-full"
          baseVelocity={4}
          repeat={4}
          draggable={false}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          slowDownFactor={0.1}
          slowdownOnHover
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          scrollAwareDirection={true}
          scrollContainer={container}
          useScrollVelocity={true}
          direction="left"
        >
          {lastThird.map((src, i) => (
            <MarqueeItem key={i}>
              <img
                src={src}
                alt={`Image ${i + firstThird.length + secondThird.length}`}
                className="h-27 w-48 rounded-lg object-cover sm:h-27 sm:w-48 md:h-45 md:w-80"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>
      </motion.div>

      <motion.div
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.2 }}
        className="absolute bottom-0 z-10 mt-300 flex flex-col items-center gap-4 px-4 md:top-[55%] md:gap-6"
      >
        {/* CTA Button */}
        <a
          href="#"
          className={cn(
            inter.className,
            'group bg-signature-orange hover:bg-signature-orange/90 flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:px-8 md:py-4 md:text-lg',
          )}
        >
          Đăng ký tham gia
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        {/* Contact Info */}
        <div
          className={cn(
            ibm_plex_serif.className,
            'flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/80 px-6 py-5 shadow-md backdrop-blur-sm md:flex-row md:gap-8 md:px-8',
          )}
        >
          <div className="flex items-center gap-2 text-sm md:text-base">
            <User className="text-signature-blue h-4 w-4" />
            <span className="text-gray-600">Liên hệ:</span>
            <span className={cn(inter.className, 'font-medium text-gray-900')}>[Họ và tên]</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Phone className="text-signature-blue h-4 w-4" />
            <span className="text-gray-600">SĐT:</span>
            <span className={cn(inter.className, 'font-medium text-gray-900')}>
              [Số điện thoại]
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <MapPin className="text-signature-blue h-4 w-4" />
            <span className="text-gray-600">Địa chỉ:</span>
            <span className={cn(inter.className, 'font-medium text-gray-900')}>
              [Địa chỉ liên hệ]
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
