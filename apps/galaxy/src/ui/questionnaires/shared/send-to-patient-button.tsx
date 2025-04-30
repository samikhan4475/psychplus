'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SendHorizonalIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sendToPatient } from '../utils'

const SendToPatientButton = ({
  sectionName,
}: {
  sectionName: QuickNoteSectionName
}) => {
  const { id } = useParams<{ id: string }>()
  return (
    <Button
      size="1"
      color="gray"
      variant="surface"
      highContrast
      className="h-auto px-1 py-1 text-[11px] font-[300]"
      onClick={(e) => {
        e.preventDefault()
        sendToPatient(id, sectionName)
      }}
    >
      <SendHorizonalIcon width={15} height={15} strokeWidth={1.75} />
      Send to Patient
    </Button>
  )
}

export { SendToPatientButton }
