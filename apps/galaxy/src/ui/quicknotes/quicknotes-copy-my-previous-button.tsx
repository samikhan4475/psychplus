'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { copyMyPreviousAction } from './actions'

interface QuickNotesCopyPreviousButtonProps {
  appointment: Appointment
}
const QuickNotesCopyMyPreviousButton = ({
  appointment,
}: QuickNotesCopyPreviousButtonProps) => {
  const { isNoteSignedByProviderInLastYear } = appointment

  const router = useRouter()

  const handleCopyMyPrevious = () => {
    copyMyPreviousAction().then(() => router.refresh())
  }

  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      disabled={!isNoteSignedByProviderInLastYear}
      className={`${
        !isNoteSignedByProviderInLastYear
          ? 'bg-[#ebebef] text-[#0005119e]'
          : 'text-black'
      }`}
      onClick={handleCopyMyPrevious}
    >
      <CopyIcon height={14} width={14} strokeWidth={1.5} />
      Copy My Previous
    </Button>
  )
}

export { QuickNotesCopyMyPreviousButton }
