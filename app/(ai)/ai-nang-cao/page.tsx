'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react'
import { Header } from '@/components/header'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { LessonViewer } from '../_components/lesson-viewer'
import { useCourseLessons } from '../_hooks/use-lessons'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data, isLoading, error } = useCourseLessons('ai-nang-cao')

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen flex-col md:h-screen">
        <Header title="AI nâng cao" />
        <main className="flex flex-1 items-center justify-center">
          <Spinner />
        </main>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-background flex min-h-screen flex-col md:h-screen">
        <Header title="AI nâng cao" />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">
            Có lỗi xảy ra khi tải dữ liệu, vui lòng tải lại trang
          </p>
        </main>
      </div>
    )
  }

  const { course, lessons } = data

  const manageButton = useMemo(
    () => (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-ring/20 size-7"
        onClick={() => router.push(`/quan-ly-bai-hoc`)}
        aria-label="Quản lý bài học"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    ),
    [router],
  )
  if (lessons.length === 0) {
    return (
      <div className="bg-background flex min-h-screen flex-col md:h-screen">
        <Header title={course.title} extraButtons={manageButton} />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Không có dữ liệu</p>
        </main>
      </div>
    )
  }

  const currentLesson = lessons[currentIndex]

  return (
    <div className="bg-background flex min-h-screen flex-col md:h-screen">
      <Header title={course.title} extraButtons={manageButton} />
      <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0 md:overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 gap-2">
            <ButtonGroup className="w-full md:w-fit">
              <Button
                variant="outline"
                size="sm"
                className="hover:text-signature-orange/80"
                onClick={() => setCurrentIndex(i => i - 1)}
                disabled={currentIndex === 0}
                aria-label="Bài học trước"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:text-signature-gray/80 grow md:w-16"
                disabled
              >
                {currentIndex + 1}/{lessons.length}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:text-signature-blue/80"
                onClick={() => setCurrentIndex(i => i + 1)}
                disabled={currentIndex === lessons.length - 1}
                aria-label="Bài học tiếp theo"
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <LessonViewer
          title={currentLesson.title}
          sections={currentLesson.sections}
          videoUrl={currentLesson.videoUrl}
        />
      </main>
    </div>
  )
}
