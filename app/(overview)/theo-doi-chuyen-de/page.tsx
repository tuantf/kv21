'use client'

import { ActiveTopicTable } from './_components/active-topic-table'
import { CompletedTopicTable } from './_components/completed-topic-table'
import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'
import { toast } from 'sonner'
import { Header } from '@/components/header'
import { motion } from 'motion/react'
import { db } from '@/libs/instantdb'
import { initial, animate, transition } from '@/libs/motion'
import { useSyncData } from '@/hooks/use-sync-data'

const query = { chuyende: {}, chuyendeketthuc: {} }
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
    <>
      <Header title="Theo dõi chuyên đề" extraButtons={SyncButton} />
      <main className="flex flex-col gap-4 p-4 pt-0">
        <motion.div initial={initial} animate={animate} transition={transition}>
          <ActiveTopicTable data={data ?? {}} isLoading={isLoading} />
        </motion.div>
        <motion.div initial={initial} animate={animate} transition={transition}>
          <CompletedTopicTable data={data ?? {}} isLoading={isLoading} />
        </motion.div>
      </main>
    </>
  )
}
