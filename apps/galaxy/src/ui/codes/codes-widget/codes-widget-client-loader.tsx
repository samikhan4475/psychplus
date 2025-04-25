'use client'

import { Flex } from '@radix-ui/themes'
import { dequal } from 'dequal'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { useStore as useQuestionnaireStore } from '@/ui/questionnaires/store'
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
    (state) => ({
      codesData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionCodes
        ] ?? data,
      tcmData:
        state.actualNotewidgetsData?.[QuickNoteSectionName.QuicknoteSectionTcm],
    }),
    dequal,
  )
  const questionnaires = useQuestionnaireStore((state) => state.histories)

  const initialValues = transformIn(codesData)
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          initialValues={initialValues}
          questionairesCount={Object.keys(questionnaires)?.length}
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
