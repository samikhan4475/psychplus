'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '../store'

interface SaveButtonProps {
  icon?: boolean
  isGhost?: boolean
}

const SaveButton = ({ icon = true }: SaveButtonProps) => {
  const patientId = useParams().id as string
  const { initializeQuestionnaires } = useStore()

  const questionnaireWedgetIds: QuickNoteSectionName[] = [
    QuickNoteSectionName.QuickNoteSectionPhq9,
    QuickNoteSectionName.QuickNoteSectionGad7,
    QuickNoteSectionName.QuickNoteSectionSnapIV,
    QuickNoteSectionName.QuickNoteSectionPcl5,
    QuickNoteSectionName.QuickNoteSectionYbcos,
    QuickNoteSectionName.QuickNoteSectionAims,
    QuickNoteSectionName.QuickNoteSectionAudit,
    QuickNoteSectionName.QuickNoteSectionDast10,
    QuickNoteSectionName.QuickNoteSectionMoca,
    QuickNoteSectionName.QuickNoteSectionHamD,
  ]

  const handleEvent = (event: MessageEvent) => {
    const { widgetId, type, success } = event.data
    if (
      type === 'widget:save' &&
      success &&
      questionnaireWedgetIds.includes(widgetId)
    ) {
      initializeQuestionnaires(patientId)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const className = 'h-auto px-1 py-1 text-[11px] font-[300]'
  return (
    <Button type="submit" size="1" highContrast className={className}>
      {icon && <SaveIcon width={15} height={15} strokeWidth={1.75} />}
      Save
    </Button>
  )
}

export { SaveButton }
