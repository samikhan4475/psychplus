'use client'

import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { dequal } from 'dequal'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { useStore as useQuestionnaireStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { transformIn as substanceTransformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { CodesWidget } from './codes-widget'
import { transformIn } from './data'
import { countQuestionnaireSections } from './utils'

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
  const { tcmData, codesData, substanceHxData } = useStore(
    (state) => ({
      codesData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionCodes
        ] ?? data,
      tcmData:
        state.actualNotewidgetsData?.[QuickNoteSectionName.QuicknoteSectionTcm],
      substanceHxData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuickNoteSectionSubstanceUseHx
        ],
    }),
    dequal,
  )
  const { addedToNotes, histories } = useQuestionnaireStore((state) => ({
    addedToNotes: state.addedToNotes,
    histories: state.histories,
  }))

  const questionnairesCount = useMemo(
    () =>
      countQuestionnaireSections({
        addedToNotes: addedToNotes,
        ...(substanceHxData && {
          substanceData: substanceTransformIn(substanceHxData),
        }),
        histories,
      }),
    [addedToNotes, substanceHxData, histories],
  )

  const initialValues = transformIn(codesData)
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          initialValues={initialValues}
          questionairesCount={questionnairesCount}
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
