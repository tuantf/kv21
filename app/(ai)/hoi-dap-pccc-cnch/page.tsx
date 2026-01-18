'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

import { updateHoiDapLinks } from '@/app/actions'
import { db } from '@/libs/instantdb'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect, useMemo } from 'react'
import { Ask } from './_components/ask'

const query = { hoidap: {} }

export default function Page() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [TCQCUrlInput, setTCQCUrlInput] = useState('')
  const [quyTrinhUrlInput, setQuyTrinhUrlInput] = useState('')
  const [TCQCUrlError, setTCQCUrlError] = useState('')
  const [quyTrinhUrlError, setQuyTrinhUrlError] = useState('')
  const [tuyenTruyenUrlInput, setTuyenTruyenUrlInput] = useState('')
  const [baoCaoUrlInput, setBaoCaoUrlInput] = useState('')
  const [tuyenTruyenUrlError, setTuyenTruyenUrlError] = useState('')
  const [baoCaoUrlError, setBaoCaoUrlError] = useState('')

  const { data, isLoading, error } = db.useQuery(query)

  // Optimized: Single pass through array instead of 4 separate finds
  const urls = useMemo(() => {
    const map = new Map(data?.hoidap?.map(item => [item.name, item.link]) || [])
    return {
      tcqc: map.get('tcqc') || '',
      quytrinh: map.get('quytrinh') || '',
      tuyentruyen: map.get('tuyentruyen') || '',
      baocao: map.get('baocao') || '',
    }
  }, [data])

  useEffect(() => {
    if (error) {
      toast.error('Có lỗi xảy ra khi tải dữ liệu, vui lòng tải lại trang')
      console.error(error)
    }
  }, [error])

  const validateUrl = (url: string): string => {
    if (!url.trim()) {
      return 'URL không được để trống'
    }
    try {
      new URL(url)
      return ''
    } catch {
      return 'Định dạng URL không hợp lệ'
    }
  }

  const handleOpenDialog = () => {
    setTCQCUrlInput(urls.tcqc)
    setQuyTrinhUrlInput(urls.quytrinh)
    setTCQCUrlError('')
    setQuyTrinhUrlError('')
    setTuyenTruyenUrlInput(urls.tuyentruyen)
    setBaoCaoUrlInput(urls.baocao)
    setTuyenTruyenUrlError('')
    setBaoCaoUrlError('')
    setDialogOpen(true)
  }

  const handleSave = async () => {
    const tcqcError = validateUrl(TCQCUrlInput)
    const quyTrinhError = validateUrl(quyTrinhUrlInput)
    const tuyenTruyenError = validateUrl(tuyenTruyenUrlInput)
    const baoCaoError = validateUrl(baoCaoUrlInput)

    setTCQCUrlError(tcqcError)
    setQuyTrinhUrlError(quyTrinhError)
    setTuyenTruyenUrlError(tuyenTruyenError)
    setBaoCaoUrlError(baoCaoError)

    if (tcqcError || quyTrinhError || tuyenTruyenError || baoCaoError) {
      return
    }

    try {
      toast.loading('Đang lưu URL...')
      const result = await updateHoiDapLinks(
        TCQCUrlInput.trim(),
        quyTrinhUrlInput.trim(),
        tuyenTruyenUrlInput.trim(),
        baoCaoUrlInput.trim(),
      )

      if (result.success) {
        toast.dismiss()
        toast.success(result.message)
        setDialogOpen(false)
        setTCQCUrlInput('')
        setQuyTrinhUrlInput('')
        setTuyenTruyenUrlInput('')
        setBaoCaoUrlInput('')
      } else {
        toast.dismiss()
        toast.error(result.message)
      }
    } catch (error: any) {
      toast.dismiss()
      toast.error(error.message || 'Thêm URL thất bại')
    }
  }

  const settingsButton = (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOpenDialog}
      className="hover:bg-ring/20 size-7"
      aria-label="Cài đặt URL NotebookLM"
    >
      <Settings className="h-4 w-4" />
    </Button>
  )

  return (
    <div className="bg-background flex min-h-screen flex-col md:h-screen">
      <Header title="Hỏi đáp PCCC&CNCH" extraButtons={settingsButton} />
      <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:h-[calc(100vh-var(--spacing)*20)]">
              <Ask
                title={
                  <>
                    Hỏi đáp{' '}
                    <span className="text-signature-orange/80">
                      quy chuẩn, tiêu chuẩn PCCC&CNCH
                    </span>
                  </>
                }
                description="Sử dụng NotebookLM"
                sampleQuestion="Nhà xưởng sản xuất hạng C của Công ty A, cao 1 tầng, chiều cao 10m, diện tích 10000m2, có 100 người làm việc cần đảm bảo những yêu cầu gì về PCCC ?"
                referenceQuestions={[
                  'Nhà xưởng sản xuất, gia công cơ khí, cao 1 tầng, chiều cao 7m, diện tích 12000m2 cần phải trang bị bao nhiêu bình chữa cháy ?',
                  'Nhà xưởng sản xuất bao bì carton, diện tích 980m2 có phải trang bị hệ thống chữa cháy tự động không, quy định chi tiết như thế nào ?',
                ]}
                buttonText="Đi đến NotebookLM"
                buttonColorClass="bg-signature-orange/80! hover:bg-signature-orange/95!"
                url={urls.tcqc}
                imageSrc="/ai/ai_screen_1.avif"
                imageAlt="Giao diện hỏi đáp quy chuẩn PCCC"
              />
              <Ask
                title={
                  <>
                    Hỏi đáp <span className="text-signature-blue/80">quy trình công tác</span>
                  </>
                }
                description="Sử dụng NotebookLM"
                sampleQuestion="Nhiệm vụ của đồng chí cán bộ, chiến sỹ trực thông tin trong ca trực được quy định như thế nào ?"
                referenceQuestions={[
                  'Nhiệm vụ của đồng chí chỉ huy trong ca trực được quy định như thế nào ?',
                  'Quy trình xác minh, giải quyết vụ cháy khi có cháy xảy ra ?',
                ]}
                buttonText="Đi đến NotebookLM"
                buttonColorClass="bg-signature-blue/80! hover:bg-signature-blue/95!"
                url={urls.quytrinh}
                imageSrc="/ai/ai_screen_2.avif"
                imageAlt="Giao diện hỏi đáp quy trình công tác"
              />
            </div>
            <div className="flex flex-col gap-4 lg:h-[calc(100vh-var(--spacing)*20)]">
              <Ask
                title={<> Tạo tin bài tuyên truyền PCCC&CNCH </>}
                description="Sử dụng NotebookLM"
                sampleQuestion="Tạo tin bài tuyên truyền về nội dung: Tổ chức tuyên truyền, trải nghiệm PCCC đối với 200 học sinh và giáo viên Trường Tiểu học A"
                referenceQuestions={[
                  'Tạo tin bài tuyên truyền về nội dung: Tăng cường công tác PCCC&CNCH cho các nhà trọ, nhà cho thuê trọ trên địa bàn xã A ...',
                  'Tạo tin bài tuyên truyền về nội dung: Thực tập phương án chữa cháy tại khu dân cư thôn A ...',
                ]}
                buttonText="Đi đến NotebookLM"
                buttonColorClass="bg-signature-orange/80! hover:bg-signature-orange/95!"
                url={urls.tuyentruyen}
                preview={false}
              />
              <Ask
                title={<> Tạo nội dung báo cáo chung </>}
                description="Sử dụng NotebookLM"
                sampleQuestion="Khó khăn, vướng mắc trong việc thực hiện nhiệm vụ PCCC của UBND cấp xã"
                referenceQuestions={[
                  'Đánh giá nguyên nhân khách quan, chủ quan trong việc ...',
                  'Đề xuất các giải pháp để khắc phục khó khăn, vướng mắc ...',
                ]}
                buttonText="Đi đến NotebookLM"
                buttonColorClass="bg-signature-blue/80! hover:bg-signature-blue/95!"
                url={urls.baocao}
                preview={false}
              />
            </div>
          </div>
        )}
      </main>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cài đặt URL NotebookLM</DialogTitle>
            <DialogDescription>Nhập URL dẫn đến trang NotebookLM</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tcqc-url">Hỏi đáp TC&QC PCCC&CNCH</Label>
              <Input
                id="tcqc-url"
                type="url"
                placeholder="https://notebooklm.google.com/..."
                value={TCQCUrlInput}
                onChange={e => setTCQCUrlInput(e.target.value)}
              />
              {TCQCUrlError && <p className="text-destructive text-sm">{TCQCUrlError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quytrinh-url">Hỏi đáp quy trình công tác</Label>
              <Input
                id="quytrinh-url"
                type="url"
                placeholder="https://notebooklm.google.com/..."
                value={quyTrinhUrlInput}
                onChange={e => setQuyTrinhUrlInput(e.target.value)}
              />
              {quyTrinhUrlError && <p className="text-destructive text-sm">{quyTrinhUrlError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tuyentruyen-url">Tạo tin bài tuyên truyền PCCC&CNCH</Label>
              <Input
                id="tuyentruyen-url"
                type="url"
                placeholder="https://notebooklm.google.com/..."
                value={tuyenTruyenUrlInput}
                onChange={e => setTuyenTruyenUrlInput(e.target.value)}
              />
              {tuyenTruyenUrlError && (
                <p className="text-destructive text-sm">{tuyenTruyenUrlError}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="baocao-url">Tạo nội dung báo cáo chung</Label>
              <Input
                id="baocao-url"
                type="url"
                placeholder="https://notebooklm.google.com/..."
                value={baoCaoUrlInput}
                onChange={e => setBaoCaoUrlInput(e.target.value)}
              />
              {baoCaoUrlError && <p className="text-destructive text-sm">{baoCaoUrlError}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="hover:bg-sidebar shadow-none"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              variant="outline"
              className="border-signature-blue/80 bg-signature-blue/80 hover:bg-signature-blue/90 text-white shadow-none transition-colors hover:text-white"
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
