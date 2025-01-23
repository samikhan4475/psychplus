'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AdditionalTherapyDetailBlock } from '../blocks/additional-therapy-detail'
import { SaveButton } from '../blocks/save-button'
import { TherapyTableBlock } from '../blocks/therapy-table-block'
import { ClearButton } from './blocks/clear-button'
import { TherapySessionParticipantsBlock } from './blocks/session-participants'
import { TherapyTimeSpentBlock } from './blocks/time-spent'
import { transformOut } from './data'
import { useTherapyForm } from './therapy-form'
import { TherapySchemaType } from './therapy-schema'
import { getInitialValues } from './blocks/utils'

interface TherapyWidgetProps {
  patientId: string
  initialValue: TherapySchemaType
}

const IndividualTherapyView = ({
  patientId,
  initialValue,
}: TherapyWidgetProps) => {
  const form = useTherapyForm(initialValue)
  const appointmentId = useSearchParams().get('id') as string
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const vistiType = useSearchParams().get('visitType') || ''
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        tags={[
          QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
          QuickNoteSectionName.QuicknoteSectionCodes,
        ]}
        widgetId={QuickNoteSectionName.QuickNoteSectionIndividualTherapy}
        title="Therapy"
        getData={transformOut(
          patientId,
          appointmentId,
          vistiType,
          visitSequence,
        )}
        headerRight={
          <>
            <ClearButton />
            <SaveButton />
          </>
        }
        formResetValues={getInitialValues()}
      >
        <TherapyTimeSpentBlock />
        <TherapySessionParticipantsBlock />
        <TherapyTableBlock />
        <AdditionalTherapyDetailBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { IndividualTherapyView }
