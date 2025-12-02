'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Lesson1 = () => {
  return (
    <Card className="bg-card flex-1 rounded-lg border px-6 shadow-none">
      <CardTitle className="items-center text-lg">Sử dụng NotebookLM</CardTitle>
      <div className="flex h-full flex-1 flex-col gap-6 md:flex-row">
        <div className="flex basis-2/5 flex-col">
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md leading-none font-semibold">
                NotebookLM là gì ?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  NotebookLM là một công cụ AI được phát triển bởi Google, giúp bạn tương tác với
                  tài liệu và tìm kiếm thông tin một cách hiệu quả. Công cụ này cho phép bạn tải lên
                  các tài liệu và đặt câu hỏi để AI phân tích và trả lời dựa trên nội dung của các
                  tài liệu đó. Điểm khác biệt lớn nhất của NotebookLM so với các chatbot khác (như
                  ChatGPT hay Gemini) là khả năng bám sát dữ liệu, nó chỉ trả lời và xử lý thông tin
                  dựa trên chính xác những tài liệu bạn tải lên, không dựa trên những thông tin
                  khác.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Tính năng chính
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Phân tích và tóm tắt tài liệu tự động</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Trả lời câu hỏi dựa trên nội dung tài liệu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Tạo ghi chú và tóm tắt dữ liệu thông minh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Tạo sơ đồ tư duy từ tài liệu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Tạo slide thuyết trình ngay lập tức từ tài liệu</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Ứng dụng trong công việc
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  NotebookLM đặc biệt hữu ích trong việc nghiên cứu, phân tích quy chuẩn, tiêu chuẩn
                  kỹ thuật, và các tài liệu chuyên ngành. Bạn có thể nhanh chóng tra cứu, tìm kiếm
                  thông tin cần thiết từ rất nhiều nguồn tài liệu cùng lúc mà không cần phải đọc
                  toàn bộ tài liệu.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="basis-3/5">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Plb2d9i4V2w?si=example"
            title="YouTube video player"
            className="h-full w-full items-center justify-center border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </Card>
  )
}

export { Lesson1 }
