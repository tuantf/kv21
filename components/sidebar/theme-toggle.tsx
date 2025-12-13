'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        <span className="text-sm">Chế độ tối</span>
      </div>
      <Switch checked={isDark} onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')} />
    </div>
  )
}
