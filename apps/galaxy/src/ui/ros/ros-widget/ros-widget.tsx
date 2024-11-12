'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
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
import { transformOut } from './data'
import { useRosWidgetForm } from './ros-widget-form'
import { RosWidgetSchemaType } from './ros-widget-schema'

interface HpiWidgetProps {
  patientId: string
  initialValue: RosWidgetSchemaType
}

const RosWidget = ({ patientId, initialValue }: HpiWidgetProps) => {
  const form = useRosWidgetForm(initialValue)
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionReviewOfSystem}
        title="ROS (Review of System)"
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
        headerLeft={<CheckAllNoConcernCell form={form} />}
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
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { RosWidget }
