'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  FormFieldError,
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import {
  CardiovascularBlock,
  ConstitutionalBlock,
  EntMouthBlock,
  EyesBlock,
  GastrointestinalBlock,
  GenitourinaryBlock,
  MusculoskeletalBlock,
  NeuroBlock,
  RespiratoryBlock,
  SkinBlock,
} from './blocks'
import { CheckAllNoConcernCell } from './check-all-no-concern-cell'
import { ERROR_ID } from './constant'
import { transformOut } from './data'
import { useRosWidgetForm } from './ros-widget-form'
import { RosWidgetSchemaType } from './ros-widget-schema'
import { getInitialValues } from './utils'

interface HpiWidgetProps {
  patientId: string
  initialValue: RosWidgetSchemaType
}

const RosWidget = ({ patientId, initialValue }: HpiWidgetProps) => {
  const searchParams = useSearchParams()
  const visitType = searchParams.get('visitType') || ''
  const form = useRosWidgetForm(initialValue, visitType)
  const { isQuickNoteView } = useQuickNoteUpdate()
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionReviewOfSystem}
        tags={[QuickNoteSectionName.QuicknoteSectionReviewOfSystem]}
        title="ROS (Review of System)"
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetClearButton
              defaultInitialValues={getInitialValues}
              shouldCheckPermission
            />
            <WidgetSaveButton
              variant={isQuickNoteView ? 'outline' : 'filled'}
              shouldCheckPermission
            />
          </>
        }
        headerLeft={<CheckAllNoConcernCell form={form} />}
        formResetValues={getInitialValues()}
      >
        <ConstitutionalBlock />
        <EntMouthBlock />
        <EyesBlock />
        <CardiovascularBlock />
        <RespiratoryBlock />
        <GastrointestinalBlock />
        <GenitourinaryBlock />
        <SkinBlock />
        <MusculoskeletalBlock />
        <NeuroBlock />
        <FormFieldError name={ERROR_ID} />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { RosWidget }
