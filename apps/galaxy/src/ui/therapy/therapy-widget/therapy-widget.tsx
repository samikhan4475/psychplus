'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetHxButton } from '@/components'
import { AdditionalTherapyDetailBlock } from './blocks/additional-therapy-detail'
import { SaveButton } from './blocks/save-button'
import { TherapySessionParticipantsBlock } from './blocks/session-participants'
import { TherapyTableBlock } from './blocks/therapy-table-block'
import { TherapyTimeSpentBlock } from './blocks/time-spent'
import { useTherapyForm } from './therapy-form'

interface TherapyWidgetProps {
  patientId: string
}

const TherapyWidget = ({ patientId }: TherapyWidgetProps) => {
  const form = useTherapyForm()
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="therapy-details"
        title="Therapy"
        getData={() => []}
        className='h-[400px]'
        headerRight={
          <>
            <WidgetHxButton />
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
