'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { initial, animate, transition } from '@/libs/motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { ArrowRight, Settings } from 'lucide-react'

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
import { useState } from 'react'
import { Ask } from './_components/ask'

const query = { hoidap: {} }

export default function Page() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [TCQCUrlInput, setTCQCUrlInput] = useState('')
  const [quyTrinhUrlInput, setQuyTrinhUrlInput] = useState('')
  const [TCQCUrlError, setTCQCUrlError] = useState('')
  const [quyTrinhUrlError, setQuyTrinhUrlError] = useState('')

  const { data, isLoading, error } = db.useQuery(query)

  const TCQCUrl = data?.hoidap?.find(item => item.name === 'tcqc')?.link
  const quyTrinhUrl = data?.hoidap?.find(item => item.name === 'quytrinh')?.link

  if (error) {
    toast.error('Có lỗi xảy ra khi tải dữ liệu, vui lòng tải lại trang')
    console.error(error)
  }

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
    setTCQCUrlInput(TCQCUrl || '')
    setQuyTrinhUrlInput(quyTrinhUrl || '')
    setTCQCUrlError('')
    setQuyTrinhUrlError('')
    setDialogOpen(true)
  }

  const handleSave = async () => {
    const tcqcError = validateUrl(TCQCUrlInput)
    const quyTrinhError = validateUrl(quyTrinhUrlInput)

    setTCQCUrlError(tcqcError)
    setQuyTrinhUrlError(quyTrinhError)

    if (tcqcError || quyTrinhError) {
      return
    }

    try {
      toast.loading('Đang lưu URL...')
      const result = await updateHoiDapLinks(TCQCUrlInput.trim(), quyTrinhUrlInput.trim())

      if (result.success) {
        toast.dismiss()
        toast.success(result.message)
        setDialogOpen(false)
        setTCQCUrlInput('')
        setQuyTrinhUrlInput('')
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
    >
      <Settings className="h-4 w-4" />
    </Button>
  )

  return (
    <div className="bg-background flex min-h-screen flex-col md:h-screen">
      <Header title="Hỏi đáp PCCC&CNCH" extraButtons={settingsButton} isAdmin={true} />
      <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0 md:overflow-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Ask
              title={
                <>
                  Hỏi đáp{' '}
                  <span className="text-signature-orange/80">quy chuẩn, tiêu chuẩn PCCC&CNCH</span>
                </>
              }
              description="Sử dụng NotebookLM AI"
              sampleQuestion="Nhà xưởng sản xuất hạng C của Công ty A, cao 1 tầng, chiều cao 10m, diện tích 10000m2, có 100 người làm việc cần đảm bảo những yêu cầu gì về PCCC ?"
              referenceQuestions={[
                'Nhà xưởng sản xuất, gia công cơ khí, cao 1 tầng, chiều cao 7m, diện tích 12000m2 cần phải trang bị bao nhiêu bình chữa cháy ?',
                'Nhà xưởng sản xuất bao bì carton, diện tích 980m2 có phải trang bị hệ thống chữa cháy tự động không, quy định chi tiết như thế nào ?',
              ]}
              buttonText="Đi đến NotebookLM"
              buttonColorClass="bg-signature-orange/80 hover:bg-signature-orange/95"
              url={TCQCUrl || ''}
              imageSrc="/ai/ai_screen_1.avif"
              imageAlt="Giao diện hỏi đáp quy chuẩn PCCC"
            />
            <Ask
              title={
                <>
                  Hỏi đáp <span className="text-signature-blue/80">quy trình công tác</span>
                </>
              }
              description="Sử dụng NotebookLM AI"
              sampleQuestion="Nhiệm vụ của đồng chí cán bộ, chiến sỹ trực thông tin trong ca trực được quy định như thế nào ?"
              referenceQuestions={[
                'Nhiệm vụ của đồng chí chỉ huy trong ca trực được quy định như thế nào ?',
                'Quy trình xác minh, giải quyết vụ cháy khi có cháy xảy ra ?',
              ]}
              buttonText="Đi đến NotebookLM"
              buttonColorClass="bg-signature-blue/80 hover:bg-signature-blue/95"
              url={quyTrinhUrl || ''}
              imageSrc="/ai/ai_screen_2.avif"
              imageAlt="Giao diện hỏi đáp quy trình công tác"
            />
          </>
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
