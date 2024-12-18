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
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionTherapy}
        title="Therapy"
        getData={transformOut(patientId, appointmentId)}
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
