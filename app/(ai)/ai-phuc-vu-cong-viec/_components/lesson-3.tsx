'use client'

import { Card, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Lesson3 = () => {
  return (
    <Card className="bg-card flex-1 rounded-lg border px-6 shadow-none">
      <CardTitle className="items-center text-lg">Trích xuất dữ liệu</CardTitle>
      <div className="flex h-full flex-1 flex-col gap-6 md:flex-row">
        <div className="flex basis-2/5 flex-col">
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Trích xuất dữ liệu theo cách thủ công ?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Upload tài liệu lên Google Drive và mở bằng Google Docs ? Thay vào đó, với sự hỗ
                  trợ của AI, việc trích xuất dữ liệu từ các nguồn khác nhau như tài liệu, hình ảnh,
                  PDF, bảng biểu, email hoặc website và chuyển đổi thành định dạng có thể sử dụng
                  được (như Excel, CSV, JSON) trở nên nhanh chóng và chính xác hơn, giúp tiết kiệm
                  thời gian so với việc nhập liệu thủ công.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-md leading-none font-semibold">
                Một số ví dụ về trích xuất dữ liệu
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>
                      Trích xuất từ hình ảnh: Chụp ảnh bảng, biểu mẫu và yêu cầu AI trích xuất
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>
                      Trích xuất từ PDF: Tải file PDF lên và yêu cầu AI lấy dữ liệu cần thiết
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>
                      Trích xuất từ email: Copy nội dung email và yêu cầu AI tổng hợp thông tin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>
                      Trích xuất từ website: Copy nội dung trang web và yêu cầu AI lọc dữ liệu
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-signature-blue/80">•</span>
                    <span>
                      Trích xuất từ tài liệu Word: Tải file và yêu cầu AI tìm kiếm thông tin cụ thể
                    </span>
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
                  Trích xuất dữ liệu với AI đặc biệt hữu ích trong việc số hóa tài liệu cũ, số hoá
                  các bảng dữ liệu phức tạp, chuyển đổi dữ liệu từ định dạng này sang định dạng
                  khác. Giúp tiết kiệm thời gian, đơn giản hoá quy trình nhập liệu và giảm sai sót
                  trong công tác thống kê báo cáo.
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

export { Lesson3 }
