'use client'

import { Button } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { useStore } from '../store'

const HistoryButton = () => {
  const openPatientHistory = useStore((state) => state.openPatientHistory)

  return (
    <Button
      size="1"
      color="gray"
      variant="surface"
      highContrast
      onClick={openPatientHistory}
      className="h-auto px-1 py-1 text-[11px] font-[300]"
    >
      <HistoryIcon width={15} height={15} strokeWidth={1.75} />
      History
    </Button>
  )
}

export { HistoryButton }
