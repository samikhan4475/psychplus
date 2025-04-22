'use client'

import React from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ProviderRecommendationsHistory } from './providers-recommendations-history'

interface HistoryDialogProps {
  appointmentId: string
}

const HistoryButton = ({ appointmentId }: HistoryDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          Hx
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[848px] rounded-1 p-6">
        <Dialog.Title size="4">Provider Recommendation Hx</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <ProviderRecommendationsHistory appointmentId={appointmentId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HistoryButton }
