'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { PermissionAlert } from '@/ui/schedule/shared'
import { useStore } from '../store'

interface SaveButtonProps {
  icon?: boolean
  isGhost?: boolean
}

const SaveButton = ({ icon = true }: SaveButtonProps) => {
  const patientId = useParams().id as string
  const [isOpen, setOpen] = useState(false)
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
    QuickNoteSectionName.QuickNoteSectionCssrs,
    QuickNoteSectionName.QuickNoteSectionPsc17,
    QuickNoteSectionName.QuickNoteSectionCopsR,
    QuickNoteSectionName.QuickNoteSectionAdultAsrs,
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

    return () => {
      window.removeEventListener('message', handleEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const className = 'h-auto px-1 py-1 text-[11px] font-[300]'

  const hasPermission = useHasPermission('saveButtonQuickNotePage')

  return (
    <>
      <Button
        type={hasPermission ? 'submit' : 'button'}
        size="1"
        highContrast
        onClick={() => {
          if (!hasPermission) {
            setOpen(true)
          }
        }}
        className={className}
      >
        {icon && <SaveIcon width={15} height={15} strokeWidth={1.75} />}
        Save
      </Button>
      <PermissionAlert
        message="You do not have permission to save. Please contact your supervisor if you need any further assistance"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export { SaveButton }
