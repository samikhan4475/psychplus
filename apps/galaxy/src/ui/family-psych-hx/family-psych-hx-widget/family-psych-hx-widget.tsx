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
import { ConditionsBlock, OtherBlock } from './blocks'
import { transformOut } from './data'
import { useFamilyPsychHxWidgetForm } from './family-psych-hx-widget-form'
import { FamilyPsychHxWidgetSchemaType } from './family-psych-hx-widget-schema'

interface FamilyPsychHxWidgetProps {
  patientId: string
  initialValue: FamilyPsychHxWidgetSchemaType
}

const FamilyPsychHxWidget = ({
  patientId,
  initialValue,
}: FamilyPsychHxWidgetProps) => {
  const form = useFamilyPsychHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionFamilyPsychHx}
        title="Family Psych Hx"
        getData={transformOut(patientId)}
        toggleable
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <ConditionsBlock />
        <OtherBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { FamilyPsychHxWidget }
