'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useStore } from '../store'

interface SaveButtonProps {
  icon?: boolean
  isGhost?: boolean
}

const SaveButton = ({ icon = true }: SaveButtonProps) => {
  const patientId = useParams().id as string
  const { initializeQuestionnaires } = useStore()
  const handleSubmit = () => {
    initializeQuestionnaires(patientId)
  }
  const className = 'h-auto px-1 py-1 text-[11px] font-[300]'
  return (
    <Button
      onClick={handleSubmit}
      type="submit"
      size="1"
      highContrast
      className={className}
    >
      {icon && <SaveIcon width={15} height={15} strokeWidth={1.75} />}
      Save
    </Button>
  )
}

export { SaveButton }
