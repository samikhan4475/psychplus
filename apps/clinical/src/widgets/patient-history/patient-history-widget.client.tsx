'use client'

import { useRef } from 'react'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { PATIENT_HISTORY_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import {
  useDialog,
  usePublishLoaded,
  usePublishSize,
} from '@psychplus/widgets/hooks'
import { PatientInfoHistory } from './components'
import { useRefetchHistory } from './hooks'

const PatientHistoryWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { open } = useDialog(PATIENT_HISTORY_WIDGET)
  const { publish } = usePubsub()
  usePublishLoaded(PATIENT_HISTORY_WIDGET)
  usePublishSize(PATIENT_HISTORY_WIDGET, ref)
  useRefetchHistory()

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${PATIENT_HISTORY_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="flex relative max-w-[1200px] h-[500px] overflow-visible">
        <PatientInfoHistory />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientHistoryWidgetClient }
