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
import { PastFamilyHeader } from './family-psych-header'
import { useFamilyPsychHxWidgetForm } from './family-psych-hx-widget-form'
import { FamilyPsychHxWidgetSchemaType } from './family-psych-hx-widget-schema'

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
      {isHistoryHeader && (
        <PastFamilyHeader
          patientId={patientId}
          getData={transformOut(patientId)}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionFamilyPsychHx}
        title={!isHistoryHeader ? 'Family Psych Hx' : undefined}
        getData={transformOut(patientId)}
        toggleable={!isHistoryHeader}
        headerRight={
          <>
            <WidgetTagButton />
            {!isHistoryHeader && <WidgetHxButton />}
            <WidgetClearButton />
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
