'use client'

import { Card, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Lesson4 = () => {
  return (
    <Card className="bg-card flex-1 rounded-lg border px-6 shadow-none">
      <CardTitle className="items-center text-lg">
        Kiểm tra lỗi chính tả, ngữ pháp, logic trong văn bản
      </CardTitle>
      <div className="flex h-full flex-1 flex-col gap-6 md:flex-row">
        <div className="flex basis-2/5 flex-col">
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Kiểm tra lỗi chính tả, ngữ pháp, logic trong văn bản
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Với sự hỗ trợ của AI, việc kiểm tra và sửa lỗi chính tả, ngữ pháp, và logic trong
                  văn bản trở nên nhanh chóng và chính xác. AI có thể phát hiện các lỗi mà công cụ
                  kiểm tra thông thường có thể bỏ sót, đồng thời đề xuất cách sửa lỗi phù hợp với
                  ngữ cảnh và mục đích của văn bản.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Các loại lỗi AI có thể phát hiện
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Lỗi chính tả: Từ viết sai, từ không tồn tại, lỗi đánh máy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Lỗi ngữ pháp: Cấu trúc câu sai, dấu câu không đúng.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Lỗi logic: Mâu thuẫn trong nội dung, thông tin không nhất quán</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>Lỗi định dạng: Cấu trúc văn bản, số liệu, ngày tháng không đúng</span>
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
                  Kiểm tra lỗi với AI đặc biệt hữu ích trong việc rà soát báo cáo, phương án và các
                  văn bản hành chính. Giúp đảm bảo chất lượng văn bản, giảm thiểu các sai sót, tránh
                  việc phải sửa đi sửa lại nhiều lần.
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

export { Lesson4 }
