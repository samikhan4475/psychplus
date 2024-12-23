'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AdditionalTherapyDetailBlock } from './blocks/additional-therapy-detail'
import { ClearButton } from './blocks/clear-button'
import { SaveButton } from './blocks/save-button'
import { TherapySessionParticipantsBlock } from './blocks/session-participants'
import { TherapyTableBlock } from './blocks/therapy-table-block'
import { TherapyTimeSpentBlock } from './blocks/time-spent'
import { transformOut } from './data'
import { useTherapyForm } from './therapy-form'
import { TherapySchemaType } from './therapy-schema'

interface TherapyWidgetProps {
  patientId: string
  initialValue: TherapySchemaType
}

const TherapyWidget = ({ patientId, initialValue }: TherapyWidgetProps) => {
  const form = useTherapyForm(initialValue)
  const appointmentId = useSearchParams().get('id') as string
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const vistiType = useSearchParams().get('visitType') || ''
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        tags={[
          QuickNoteSectionName.QuickNoteSectionTherapy,
          QuickNoteSectionName.QuicknoteSectionCodes,
        ]}
        widgetId={QuickNoteSectionName.QuickNoteSectionTherapy}
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
      >
        <TherapyTimeSpentBlock />
        <TherapySessionParticipantsBlock />
        <TherapyTableBlock />
        <AdditionalTherapyDetailBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TherapyWidget }
