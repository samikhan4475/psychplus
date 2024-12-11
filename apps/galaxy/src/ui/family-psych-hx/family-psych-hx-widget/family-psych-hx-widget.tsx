'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ConditionsBlock, OtherBlock } from './blocks'
import { transformOut } from './data'
import { PastFamilyHeader } from './family-psych-header'
import { useFamilyPsychHxWidgetForm } from './family-psych-hx-widget-form'
import { FamilyPsychHxWidgetSchemaType } from './family-psych-hx-widget-schema'
import { getInitialValues } from './utils'

interface FamilyPsychHxWidgetProps {
  patientId: string
  initialValue: FamilyPsychHxWidgetSchemaType
  isHistoryHeader?: boolean
}

const FamilyPsychHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
}: FamilyPsychHxWidgetProps) => {
  const form = useFamilyPsychHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      {isHistoryHeader && <PastFamilyHeader />}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionFamilyPsychHx}
        title={!isHistoryHeader ? 'Family Psych History' : undefined}
        getData={transformOut(patientId)}
        toggleable={!isHistoryHeader}
        headerRight={
          <>
            <WidgetClearButton defaultInitialValues={getInitialValues} />
            {!isHistoryHeader && <WidgetSaveButton />}
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
