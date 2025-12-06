'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { db } from '@/libs/instantdb'
import { toast } from 'sonner'
import { LessonEditorDialog } from './_components/lesson-editor-dialog'
import { LessonList } from './_components/lesson-list'
import type { AILesson } from '@/libs/lesson-schema'

type LessonCollection = 'ailessons' | 'aiadvancedlessons'

const COURSE_OPTIONS = [
  { value: 'ailessons' as LessonCollection, label: 'AI phục vụ công việc' },
  { value: 'aiadvancedlessons' as LessonCollection, label: 'AI nâng cao' },
]

export default function AdminLessonsPage() {
  const [selectedCollection, setSelectedCollection] = useState<LessonCollection>('ailessons')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<AILesson | undefined>(undefined)
  const [refreshKey, setRefreshKey] = useState(0)

  // Query lessons based on selected collection
  const query = { [selectedCollection]: {} }
  const { data, isLoading, error } = db.useQuery(query)

  useEffect(() => {
    if (error) {
      toast.error('Có lỗi xảy ra khi tải dữ liệu, vui lòng tải lại trang')
      console.error(error)
    }
  }, [error])

  const lessons = (data?.[selectedCollection] || []) as AILesson[]

  const handleAddNew = () => {
    setEditingLesson(undefined)
    setEditorOpen(true)
  }

  const handleEdit = (lesson: AILesson) => {
    setEditingLesson(lesson)
    setEditorOpen(true)
  }

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const selectedCourseLabel =
    COURSE_OPTIONS.find(opt => opt.value === selectedCollection)?.label || ''

  return (
    <div className="bg-background flex min-h-screen flex-col md:h-screen">
      <Header title="Quản lý bài học AI" />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-6">
        {/* Course Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Select
              value={selectedCollection}
              onValueChange={value => {
                setSelectedCollection(value as LessonCollection)
                setRefreshKey(prev => prev + 1)
              }}
            >
              <SelectTrigger id="course-select" className="w-48 shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COURSE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAddNew}
            className="bg-signature-blue/80 hover:bg-signature-blue/90 gap-2 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Lessons List */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Tổng số: {lessons.length}</p>
              </div>
              <LessonList
                lessons={lessons}
                collection={selectedCollection}
                onEdit={handleEdit}
                onRefresh={handleRefresh}
              />
            </div>
          )}
        </div>
      </main>

      {/* Editor Dialog */}
      <LessonEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        collection={selectedCollection}
        lesson={editingLesson}
        existingLessons={lessons}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
