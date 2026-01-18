'use client'

import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'
import { motion } from 'motion/react'
import { Header } from '@/components/header'
import { ActiveCoordinatorTable } from './_components/active-coordinator-table'
import { CompletedCoordinatorTable } from './_components/completed-coordinator-table'
import { toast } from 'sonner'
import { db } from '@/libs/instantdb'
import { initial, animate, transition } from '@/libs/motion'
import { useSyncData } from '@/hooks/use-sync-data'

const SYNC_COOLDOWN = Number(process.env.NEXT_PUBLIC_SYNC_COOLDOWN || 30000)

export default function Page() {
  const { handleSync, isSyncing } = useSyncData(SYNC_COOLDOWN)
  const query = { tonghop: {}, tonghopketthuc: {} }
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
    <>
      <Header title="Công tác tổng hợp" extraButtons={SyncButton} />
      <main className="flex flex-col gap-4 p-4 pt-0">
        <motion.div initial={initial} animate={animate} transition={transition}>
          <ActiveCoordinatorTable data={data ?? {}} isLoading={isLoading} />
        </motion.div>
        <motion.div initial={initial} animate={animate} transition={transition}>
          <CompletedCoordinatorTable data={data ?? {}} isLoading={isLoading} />
        </motion.div>
      </main>
    </>
  )
}
