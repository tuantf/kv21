'use client'

import { TodayWork, TargetChart, RescueChartBar, IncidentChartBar } from './_components'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'
import { toast } from 'sonner'
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
    <div className="flex h-auto flex-col md:h-screen">
      <Header title="Trang chủ" extraButtons={SyncButton} />
      <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0 md:overflow-hidden">
        <motion.section
          initial={initial}
          animate={animate}
          transition={transition}
          className="min-h-0 flex-none md:flex-1 md:basis-2/5"
        >
          <div className="flex h-full flex-1 flex-col gap-4 md:flex-row">
            <div className="min-h-[300px] flex-1 md:min-h-min md:basis-1/3">
              <IncidentChartBar
                data={data?.sheets?.find(sheet => sheet.sheetName === 'chay')?.data ?? []}
                isLoading={isLoading}
              />
            </div>
            <div className="min-h-[300px] flex-1 md:min-h-min md:basis-1/3">
              <RescueChartBar
                data={data?.sheets?.find(sheet => sheet.sheetName === 'cnch')?.data ?? []}
                isLoading={isLoading}
              />
            </div>
            <div className="min-h-[300px] flex-1 md:min-h-min md:basis-1/3">
              <TargetChart
                data={data?.sheets?.find(sheet => sheet.sheetName === 'chitieu')?.data ?? []}
                isLoading={isLoading}
              />
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex-none md:min-h-0 md:flex-1 md:basis-3/5"
        >
          <TodayWork
            data={data?.sheets?.find(sheet => sheet.sheetName === 'cvhomnay')?.data ?? []}
            isLoading={isLoading}
          />
        </motion.section>
      </main>
    </div>
  )
}
