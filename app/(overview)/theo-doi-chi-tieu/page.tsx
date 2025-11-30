'use client'

import { Header } from '@/components/header'
import { motion } from 'motion/react'
import { initial, animate, transition } from '@/libs/motion'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState, useRef, useMemo } from 'react'
import { db } from '@/libs/instantdb'
import { Sync } from '@/app/actions'
import { RotateCw } from 'lucide-react'
import { TargetChart } from './_components/target-chart'
import { parseValue } from '@/libs/parse-value'

const query = {
  sheets: {
    $: {
      where: {
        sheetName: 'chitieu',
      },
    },
  },
}

const SYNC_COOLDOWN = Number(process.env.NEXT_PUBLIC_SYNC_COOLDOWN || 30000)

export default function Page() {
  const [isSyncing, setIsSyncing] = useState(false)
  const lastSyncTimeRef = useRef<number | null>(null)

  const { data, isLoading, error } = db.useQuery(query)

  if (error) {
    toast.error('Lỗi khi tải dữ liệu, vui lòng tải lại trang')
    console.error('Lỗi khi tải dữ liệu:', error)
  }

  const handleSync = async () => {
    const now = Date.now()
    // Fetch API to save data from Google Sheets to InstantDB
    // Check rate limit
    if (lastSyncTimeRef.current !== null) {
      const timeSinceLastSync = now - lastSyncTimeRef.current
      if (timeSinceLastSync < SYNC_COOLDOWN) {
        const remainingSeconds = Math.ceil((SYNC_COOLDOWN - timeSinceLastSync) / 1000)
        toast.warning(`Vui lòng đợi ${remainingSeconds} giây trước khi đồng bộ lại`)
        return
      }
    }

    setIsSyncing(true)
    toast.loading('Đang đồng bộ dữ liệu...')

    try {
      const result = await Sync()

      if (result.success) {
        // Wait a moment for the database to be updated
        await new Promise(resolve => setTimeout(resolve, 500))

        toast.dismiss()
        toast.success(result.message)
        // Update last sync time on success
        lastSyncTimeRef.current = Date.now()
      } else {
        toast.dismiss()
        toast.error(result.message)
      }
    } catch (error) {
      console.error('Failed to sync:', error)
      toast.dismiss()
      toast.error('Đồng bộ thất bại')
    } finally {
      setIsSyncing(false)
    }
  }

  const SyncButton = (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSync}
      disabled={isSyncing}
      className="hover:bg-ring/20 size-7"
    >
      <RotateCw className={isSyncing ? 'animate-spin' : ''} />
    </Button>
  )

  // Simplified data transformation: group -> categories array
  const groupedData = useMemo(() => {
    const groups: Record<
      string,
      {
        groupLabel: string
        categories: Array<{ category: string; value: number }>
      }
    > = {}

    data?.sheets[0]?.data?.forEach((row: any) => {
      const group = row['Nhóm']
      const groupLabel = row['Nhóm Label'] || group
      const category = row['Danh mục']
      const value = row['Hoàn thành']

      // Filter out rows with missing essential data
      if (!group || !category || value == null) return

      const groupKey = String(group)
      if (!groups[groupKey]) {
        groups[groupKey] = {
          groupLabel: String(groupLabel),
          categories: [],
        }
      }
      groups[groupKey].categories.push({
        category: String(category),
        value: parseValue(value),
      })
    })

    return groups
  }, [data?.sheets[0]?.data])

  // Convert groupedData to array for rendering
  const groupsArray = useMemo(() => Object.values(groupedData), [groupedData])

  // Chart layout configuration: [sectionIndex, basisClass]
  const chartLayout = [
    { section: 0, basis: 'md:basis-1/3' }, // First section: 3 charts
    { section: 0, basis: 'md:basis-1/3' },
    { section: 0, basis: 'md:basis-1/3' },
    { section: 1, basis: 'md:basis-1/3' }, // Second section: 2 charts
    { section: 1, basis: 'md:basis-2/3' },
  ]

  return (
    <>
      <Header title="Theo dõi chi tiêu" extraButtons={SyncButton} />
      <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0 md:overflow-hidden">
        {[0, 1].map(sectionIndex => {
          const sectionCharts = chartLayout
            .map((layout, index) => ({ ...layout, groupIndex: index }))
            .filter(layout => layout.section === sectionIndex)
          return (
            <motion.section
              key={sectionIndex}
              initial={initial}
              animate={animate}
              transition={transition}
              className="min-h-0 flex-none md:flex-1 md:basis-1/2"
            >
              <div className="flex h-full flex-1 flex-col gap-4 md:flex-row">
                {sectionCharts.map(({ basis, groupIndex }) => {
                  const group = groupsArray[groupIndex]
                  return (
                    <div key={groupIndex} className={`min-h-[300px] flex-1 md:min-h-min ${basis}`}>
                      <TargetChart
                        label={group?.groupLabel}
                        data={group?.categories || []}
                        isLoading={isLoading}
                      />
                    </div>
                  )
                })}
              </div>
            </motion.section>
          )
        })}
      </main>
    </>
  )
}
