'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/header'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { Lesson1, Lesson2, Lesson3, Lesson4, Lesson5 } from './_components'

const lessons = [
  { id: 1, component: Lesson1, title: 'NotebookLM' },
  { id: 2, component: Lesson2, title: 'Tạo công thức Excel/Google Sheets' },
  { id: 3, component: Lesson3, title: 'Trích xuất dữ liệu' },
  { id: 4, component: Lesson4, title: 'Kiểm tra lỗi chính tả, ngữ pháp và logic trong văn bản' },
  { id: 5, component: Lesson5, title: 'Tạo ảnh, video phục vụ tuyên truyền' },
]

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const CurrentLesson = lessons[currentIndex].component

  return (
    <div className="bg-background flex min-h-screen flex-col md:h-screen">
      <Header title="AI phục vụ công việc" />
      <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0 md:overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                className="hover:text-signature-orange/80"
                onClick={() => setCurrentIndex(i => i - 1)}
                disabled={currentIndex === 0}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:text-signature-gray/80 w-16"
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
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <CurrentLesson />
      </main>
    </div>
  )
}
