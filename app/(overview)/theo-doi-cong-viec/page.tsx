'use client'

import { TodayWork, ThisWeekWork, NextWeekWork } from './_components'
import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'
import { toast } from 'sonner'
import { Header } from '@/components/header'
import { motion } from 'motion/react'
import { db } from '@/libs/instantdb'
import { initial, animate, transition } from '@/libs/motion'
import { useSyncData } from '@/hooks/use-sync-data'

const query = { sheets: {} }
const SYNC_COOLDOWN = Number(process.env.NEXT_PUBLIC_SYNC_COOLDOWN || 30000)

export default function Page() {
  const { handleSync, isSyncing } = useSyncData(SYNC_COOLDOWN)
  const { data, isLoading, error } = db.useQuery(query)

  if (error) {
    toast.error('Lỗi khi tải dữ liệu, vui lòng tải lại trang')
    throw new Error('Lỗi khi tải dữ liệu: ' + error.message)
  }

  const SyncButton = (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSync}
      disabled={isSyncing}
      className="hover:bg-ring/20 size-7"
      aria-label="Đồng bộ dữ liệu"
    >
      <RotateCw className={isSyncing ? 'animate-spin' : ''} />
    </Button>
  )

  return (
    <div>
      <Header title="Theo dõi công việc" extraButtons={SyncButton} />
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <motion.div initial={initial} animate={animate} transition={transition}>
          <TodayWork
            data={data?.sheets?.find(sheet => sheet.sheetName === 'cvhomnay')?.data ?? []}
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div initial={initial} animate={animate} transition={transition}>
          <ThisWeekWork
            data={data?.sheets?.find(sheet => sheet.sheetName === 'cvtuannay')?.data ?? []}
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div initial={initial} animate={animate} transition={transition}>
          <NextWeekWork
            data={data?.sheets?.find(sheet => sheet.sheetName === 'cvtuantoi')?.data ?? []}
            isLoading={isLoading}
          />
        </motion.div>
      </main>
    </div>
  )
}
