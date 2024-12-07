'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import { copyMyPreviousAction } from './actions'

const QuickNotesCopyMyPreviousButton = () => {
  const router = useRouter()

  const handleCopyMyPrevious = () => {
    copyMyPreviousAction().then(() => router.refresh())
  }

  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={handleCopyMyPrevious}
    >
      <CopyIcon height={14} width={14} strokeWidth={1.5} />
      Copy My Previous
    </Button>
  )
}

export { QuickNotesCopyMyPreviousButton }
