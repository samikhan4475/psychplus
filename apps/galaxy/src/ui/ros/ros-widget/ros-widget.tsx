'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
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
import { useRosWidgetForm } from './ros-widget-form'

interface HpiWidgetProps {
  patientId: string
}

const RosWidget = ({ patientId }: HpiWidgetProps) => {
  const form = useRosWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="ros"
        title="ROS (Review of System)"
        getData={() => []}
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <ConstitutionalBlock />
        <EntMouthBlock />
        <EyesBlock />
        <CardiovascularBlock />
        <RespiratoryBlock />
        <GastrointestinalBlock />
        <GenitourinaryBlock />
        <MusculoskeletalBlock />
        <SkinBlock />
        <NeuroBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { RosWidget }
