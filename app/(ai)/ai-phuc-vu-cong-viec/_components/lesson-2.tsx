'use client'

import { Card, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Lesson2 = () => {
  return (
    <Card className="bg-card flex-1 rounded-lg border px-6 shadow-none">
      <CardTitle className="items-center text-lg">Tạo công thức Excel/Google Sheets</CardTitle>
      <div className="flex h-full flex-1 flex-col gap-6 md:flex-row">
        <div className="flex basis-2/5 flex-col">
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Bạn không cần phải biết tất cả các công thức
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bạn không cần phải biết tất cả các công thức trong Excel/Google Sheets, chỉ cần mô
                  tả kết quả, dữ liệu bạn cần và AI sẽ tạo công thức cho bạn.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Tạo công thức Excel/Google Sheets
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Bước 1: Chụp ảnh màn hình Excel/Google Sheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Bước 2: Tải ảnh chụp màn hình lên AI (ChatGPT, Gemini, Claude, ...)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Bước 3: Mô tả chính xác kết quả, dữ liệu bạn cần</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Bước 4: Nhận công thức từ AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Bước 5: Copy công thức vào Excel/Google Sheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Bước 6: Kiểm tra kết quả và chỉnh sửa nếu cần</span>
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
                  Sử dụng AI tạo công thức Excel/Google Sheets giúp tạo các công thức phức tạp mà
                  bạn không biết cách tạo, không nắm hoặc không hiểu được cú pháp, giúp tiết kiệm
                  thời gian và tăng độ chính xác trong công tác thống kê báo cáo.
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

export { Lesson2 }
