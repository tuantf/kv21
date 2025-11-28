'use client'

import { Card, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Lesson5 = () => {
  return (
    <Card className="bg-card flex-1 rounded-lg border px-6 shadow-none">
      <CardTitle className="items-center text-lg">Tạo ảnh, video phục vụ tuyên truyền</CardTitle>
      <div className="flex h-full flex-1 flex-col gap-6 md:flex-row">
        <div className="flex basis-2/5 flex-col">
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Tạo ảnh, video phục vụ tuyên truyền
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  AI hiện đã có khả năng tạo ảnh, video chính xác, nhanh chóng, không thể phân biệt
                  được với ảnh thực tế. Bạn không cần phải thiết kế một cách thủ công nữa.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Một số ứng dụng khi sử dụng AI tạo ảnh, video tuyên truyền
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Tạo ảnh thông báo về sự kiện, hoạt động của đơn vị</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Tạo ảnh, video hướng dẫn các kỹ năng khi có cháy, nổ xảy ra</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Tạo ảnh, video phục vụ triển khai phương án lớn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>...</span>
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
                  Chỉ cần 1 câu mô tả, AI sẽ tạo ra ảnh, video chỉ trong 1 phút với chất lượng cao
                  phục vụ các yêu cầu công tác, tiết kiệm thời gian và công sức.
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

export { Lesson5 }
