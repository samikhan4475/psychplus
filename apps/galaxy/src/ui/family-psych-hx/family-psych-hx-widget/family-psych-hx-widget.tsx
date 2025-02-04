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
  const { watch } = form

  const defaultInitialValues = {
    ...getInitialValues(),
    widgetContainerCheckboxField: watch('widgetContainerCheckboxField'),
  }

  const isShow =
    form.watch('widgetContainerCheckboxField') === 'show' || isHistoryHeader

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        tags={
          isHistoryHeader
            ? [QuickNoteSectionName.QuickNoteSectionFamilyPsychHx]
            : []
        }
        widgetId={QuickNoteSectionName.QuickNoteSectionFamilyPsychHx}
        title={!isHistoryHeader ? 'Family Psych History' : undefined}
        widgetContainerCheckboxFieldInitialValue={
          initialValue.widgetContainerCheckboxField
        }
        getData={transformOut(patientId)}
        toggleable={!isHistoryHeader}
        headerRight={
          <>
            <WidgetClearButton
              defaultInitialValues={defaultInitialValues}
              shouldCheckPermission
            />
            {!isHistoryHeader && <WidgetSaveButton shouldCheckPermission />}
          </>
        }
        formResetValues={defaultInitialValues}
        topHeader={isHistoryHeader && <PastFamilyHeader />}
      >
        {isShow && (
          <>
            <ConditionsBlock />
            <OtherBlock />
          </>
        )}
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { FamilyPsychHxWidget }
