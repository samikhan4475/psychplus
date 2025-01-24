'use client'

import { PropsWithChildren } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { useStore } from '../store'
import { LicenseHistoryTable } from './components'

interface LicenseHistoryProps {
  staffId: string
}

const LicenseHistory = ({
  staffId,
}: PropsWithChildren<LicenseHistoryProps>) => {
  const { activeTab, setHistoryRow, historyRow } = useStore()

  return (
    <Dialog.Root
      open={historyRow !== null}
      onOpenChange={(open) => {
        if (!open) setHistoryRow(null)
      }}
    >
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {activeTab} History for {historyRow?.stateName}
        </Dialog.Title>

        <LicenseHistoryTable staffId={staffId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LicenseHistory }
