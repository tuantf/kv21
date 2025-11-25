'use client'

import { Header } from '@/components/header'
import { db } from '@/libs/instantdb'
import { ForceLogin } from '@/components/login/force-login'

export default function Page() {
  return (
    <>
      <Header title="Theo dõi chi tiêu" />
      <db.SignedIn>
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 p-0 pt-0">
          Coming soon...
        </div>
      </db.SignedIn>
      <db.SignedOut>
        <ForceLogin />
      </db.SignedOut>
    </>
  )
}
