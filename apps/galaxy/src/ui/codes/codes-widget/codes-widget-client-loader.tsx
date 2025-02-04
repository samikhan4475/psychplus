'use client'

import { Flex } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { CodesWidget } from './codes-widget'
import { transformIn } from './data'

interface CodesWidgetLoaderProps {
  patientId: string
  appointmentId?: string
  isCodesHeader?: boolean
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const CodesWidgetClientLoader = ({
  patientId,
  appointmentId,
  isCodesHeader,
  appointment,
  data = [],
}: CodesWidgetLoaderProps) => {
  const { tcmData, codesData } = useStore(
    useShallow((state) => ({
      codesData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionCodes
        ] ?? data,
      tcmData:
        state.actualNotewidgetsData?.[QuickNoteSectionName.QuicknoteSectionTcm],
    })),
  )

  const initialValues = transformIn(codesData)
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          initialValues={initialValues}
          appointmentId={appointmentId}
          appointment={appointment}
          isCodesHeader={isCodesHeader}
          tcmData={tcmData}
        />
      </Flex>
    </Flex>
  )
}

export { CodesWidgetClientLoader }
