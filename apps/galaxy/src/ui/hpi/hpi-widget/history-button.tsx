'use client'

import { Appointment } from '@/types'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { useState } from 'react'
import { useHpiWidget } from '../hooks'
import { HpiHistoryDialog } from '../hpi-history-dialog/hpi-history-dialog'

const HistoryButton = ({ patientId, appointment }: { patientId: string, appointment: Appointment }) => {
  const { resetToLatestHistory } = useHpiWidget()
  const [open, setOpen] = useState(false)
  
  return (
    <Button
      type="button"
      size="1"
      color="gray"
      variant="surface"
      className="flex items-center p-1"
    >
      <Dialog.Root
        onOpenChange={(open) => {
          setOpen(open)
          if (!open) {
            resetToLatestHistory()
          }
        }}
        open={open}
      >
        <Dialog.Trigger onClick={() => setOpen(true)}>
          <Flex gap="1">
            <HistoryIcon width={15} height={15} strokeWidth={1.75} />
            History
          </Flex>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="80vw" className="relative overflow-hidden">
          <HpiHistoryDialog patientId={patientId} appointment={appointment} />
        </Dialog.Content>
      </Dialog.Root>
    </Button>
  )
}

export { HistoryButton }
