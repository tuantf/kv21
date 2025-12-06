'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  SortableDataTable,
  ExtendedColumnDef,
  createDragHandleColumn,
} from '@/components/ui/sortable-data-table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteLesson } from '@/app/actions'
import { db } from '@/libs/instantdb'
import type { AILesson } from '@/libs/lesson-schema'

type LessonCollection = 'ailessons' | 'aiadvancedlessons'

type LessonListProps = {
  lessons: AILesson[]
  collection: LessonCollection
  onEdit: (lesson: AILesson) => void
  onRefresh: () => void
}

export function LessonList({ lessons, collection, onEdit, onRefresh }: LessonListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<AILesson | null>(null)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  // Sort lessons by order
  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => a.order - b.order)
  }, [lessons])

  const handleDeleteClick = (lesson: AILesson) => {
    setLessonToDelete(lesson)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return

    setActionInProgress(`delete-${lessonToDelete.id}`)
    try {
      const result = await deleteLesson(collection, lessonToDelete.id)

      if (result.success) {
        toast.success(result.message)
        onRefresh()
      } else {
        toast.error(result.message)
      }
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra khi xóa bài học')
    } finally {
      setActionInProgress(null)
      setDeleteDialogOpen(false)
      setLessonToDelete(null)
    }
  }

  const handleReorder = async (reorderedItems: AILesson[]) => {
    try {
      const updates = reorderedItems.map((item, index) =>
        db.tx[collection][item.id].update({ order: index }),
      )
      await db.transact(updates)
    } catch (error) {
      console.error('Error reordering:', error)
      toast.error('Có lỗi xảy ra khi sắp xếp lại bài học')
    }
  }

  // Create columns definition
  const columns: ExtendedColumnDef<AILesson, unknown>[] = useMemo(
    () => [
      createDragHandleColumn<AILesson>(),
      {
        accessorKey: 'title',
        header: 'Tiêu đề',
        highlight: true,
        size: 250,
        cell: ({ row }) => {
          return <span className="font-medium">{row.original.title}</span>
        },
      },
      {
        accessorKey: 'videoUrl',
        header: 'Video',
        highlight: false,
        align: 'center',
        cell: ({ row }) => {
          const url = row.original.videoUrl
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signature-blue truncate text-sm hover:underline"
            >
              Link
            </a>
          )
        },
      },
      {
        id: 'edit',
        header: 'Chỉnh sửa',
        highlight: false,
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(row.original)}
              disabled={actionInProgress !== null}
              className="h-8 w-8"
              title="Chỉnh sửa"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
        size: 60,
        align: 'center',
      },
      {
        id: 'delete',
        header: 'Xóa',
        highlight: false,
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(row.original)}
              disabled={actionInProgress !== null}
              className="h-8 w-8"
              title="Xóa"
            >
              <Trash2 className="text-signature-orange h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
        size: 60,
        align: 'center',
      },
    ],
    [actionInProgress, onEdit],
  )

  if (sortedLessons.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-lg font-medium">Chưa có bài học nào</p>
        <p className="text-sm">Nhấn "Thêm bài học mới" để bắt đầu</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <SortableDataTable columns={columns} data={sortedLessons} onReorder={handleReorder} />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bài học</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài học "{lessonToDelete?.title}"? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionInProgress !== null}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={actionInProgress !== null}
              className="bg-destructive hover:bg-destructive/90"
            >
              {actionInProgress ? 'Đang xóa...' : 'Xóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
