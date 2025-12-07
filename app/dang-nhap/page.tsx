'use client'

import { motion } from 'motion/react'
import { initial, animate, transition } from '@/libs/motion'
import { Beams } from '@/components/background/beam'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { db } from '@/libs/instantdb'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { setAuthTokenCookie } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Card, CardContent } from '@/components/ui/card'
import { NavCustomLogo } from '@/components/sidebar/nav-logo'
import { Spinner } from '@/components/ui/spinner'

export default function LoginPage() {
  const [sentEmail, setSentEmail] = useState('')
  return (
    <div className="relative">
      <Beams className="absolute inset-0" />
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent p-4 md:bg-transparent md:p-8">
        <motion.div initial={initial} animate={animate} transition={transition}>
          <div className="bg-card/50 mb-6 flex w-full max-w-sm flex-col items-center justify-center gap-6 backdrop-blur-sm">
            <Card className="items-center justify-center bg-transparent shadow-none">
              <div className="scale-110">
                <NavCustomLogo text="CÔNG TY NƯỚC" />
              </div>
              <CardContent>
                {!sentEmail ? (
                  <EmailStep onSendEmail={setSentEmail} />
                ) : (
                  <CodeStep sentEmail={sentEmail} />
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const EMAIL_STEP_COOLDOWN = 10000
const CODE_STEP_COOLDOWN = 10000

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const lastSendTimeRef = useRef<number | null>(null)
  const router = useRouter()

  const checkRateLimit = (): boolean => {
    if (lastSendTimeRef.current !== null) {
      const now = Date.now()
      const timeSinceLastSend = now - lastSendTimeRef.current
      if (timeSinceLastSend < EMAIL_STEP_COOLDOWN) {
        const remainingSeconds = Math.ceil((EMAIL_STEP_COOLDOWN - timeSinceLastSend) / 1000)
        toast.warning(`Vui lòng đợi ${remainingSeconds} giây trước khi thử lại`)
        return false
      }
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!checkRateLimit()) return

    setIsLoading(true)

    db.auth
      .sendMagicCode({ email })
      .then(() => {
        lastSendTimeRef.current = Date.now()
        onSendEmail(email)
      })
      .catch(err => {
        lastSendTimeRef.current = Date.now()
        toast.error('Email không tồn tại, vui lòng liên hệ người quản lý phần mềm để được hỗ trợ')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form key="email" onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
      <p className="text-lg font-semibold">Đăng nhập</p>
      <p className="text-muted-foreground text-center text-sm">
        Nhập email vào ô dưới đây, và mã xác thực sẽ được gửi đến email của bạn
      </p>
      <Input
        type="email"
        className="w-full rounded-md border border-gray-300 px-3 py-1"
        placeholder="email@kv21.io.vn"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        className="bg-signature-blue/80 hover:bg-signature-blue/90 w-full text-white"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Gửi mã xác thực'}
      </Button>
      <div
        className="text-muted-foreground cursor-pointer text-center text-sm hover:underline"
        onClick={() => router.push('/')}
      >
        Trở về trang chủ
      </div>
    </form>
  )
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const lastSubmitTimeRef = useRef<number | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check rate limit only if there was a previous error
    if (lastSubmitTimeRef.current !== null) {
      const now = Date.now()
      const timeSinceLastSubmit = now - lastSubmitTimeRef.current
      if (timeSinceLastSubmit < CODE_STEP_COOLDOWN) {
        const remainingSeconds = Math.ceil((CODE_STEP_COOLDOWN - timeSinceLastSubmit) / 1000)
        toast.warning(`Vui lòng đợi ${remainingSeconds} giây trước khi thử lại`)
        return
      }
    }

    setIsLoading(true)

    db.auth
      .signInWithMagicCode({ email: sentEmail, code })
      .then(async result => {
        // Clear rate limit on success
        lastSubmitTimeRef.current = null
        await setAuthTokenCookie(result.user.refresh_token)
        router.push('/')
      })
      .catch(err => {
        // Set rate limit on error to prevent rapid retries
        lastSubmitTimeRef.current = Date.now()
        toast.error('Mã xác thực không đúng, vui lòng thử lại')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form key="code" onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
      <p className="text-lg font-semibold">Nhập mã xác thực</p>
      <p className="text-muted-foreground text-center text-sm">
        Mã xác thực đã được gửi đến email <strong>{sentEmail}</strong>. Kiểm tra email của bạn và
        nhập mã xác thực vào ô dưới đây.
      </p>
      <InputOTP
        type="text"
        pattern={REGEXP_ONLY_DIGITS}
        required
        value={code}
        onChange={value => setCode(value)}
        maxLength={6}
        disabled={isLoading}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} className="text-lg font-medium" />
          <InputOTPSlot index={1} className="text-lg font-medium" />
          <InputOTPSlot index={2} className="text-lg font-medium" />
          <InputOTPSlot index={3} className="text-lg font-medium" />
          <InputOTPSlot index={4} className="text-lg font-medium" />
          <InputOTPSlot index={5} className="text-lg font-medium" />
        </InputOTPGroup>
      </InputOTP>
      <Button
        type="submit"
        className="bg-signature-blue/80 hover:bg-signature-blue/90 w-full text-white"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Đăng nhập'}
      </Button>
      <div
        className="text-muted-foreground cursor-pointer text-center text-sm hover:underline"
        onClick={() => router.push('/')}
      >
        Trở về trang chủ
      </div>
    </form>
  )
}
