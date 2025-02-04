'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AdditionalTherapyDetailBlock } from '../blocks/additional-therapy-detail'
import { TherapyTableBlock } from '../blocks/therapy-table-block'
import { ClearButton } from './blocks/clear-button'
import { TherapySessionParticipantsBlock } from './blocks/session-participants'
import { TherapyTimeSpentBlock } from './blocks/time-spent'
import { getFamilyInitialValues } from './blocks/utils'
import { transformOut } from './data'
import { useTherapyForm } from './therapy-form'
import { FamilyTherapySchemaType } from './therapy-schema'

interface TherapyWidgetProps {
  patientId: string
  initialValue: FamilyTherapySchemaType
}

const FamilyTherapyView = ({ patientId, initialValue }: TherapyWidgetProps) => {
  const form = useTherapyForm(initialValue)
  const appointmentId = useSearchParams().get('id') as string
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const vistiType = useSearchParams().get('visitType') || ''
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        tags={[
          QuickNoteSectionName.QuickNoteSectionFamilyTherapy,
          QuickNoteSectionName.QuicknoteSectionCodes,
        ]}
        widgetId={QuickNoteSectionName.QuickNoteSectionFamilyTherapy}
        title="Family/Couple Therapy"
        getData={transformOut(
          patientId,
          appointmentId,
          vistiType,
          visitSequence,
        )}
        headerRight={
          <>
            <ClearButton />
            <WidgetSaveButton shouldCheckPermission />
          </>
        }
        formResetValues={getFamilyInitialValues()}
      >
        <TherapyTimeSpentBlock />
        <TherapySessionParticipantsBlock />
        <TherapyTableBlock />
        <AdditionalTherapyDetailBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { FamilyTherapyView }
