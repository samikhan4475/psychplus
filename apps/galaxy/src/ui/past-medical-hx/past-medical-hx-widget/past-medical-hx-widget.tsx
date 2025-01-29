'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ConditionsBlock } from './blocks'
import { transformOut } from './data'
import { PastMedicalHeader } from './past-medical-header'
import { usePastMedicalHxWidgetForm } from './past-medical-hx-widget-form'
import { PastMedicalHxWidgetSchemaType } from './past-medical-hx-widget-schema'
import { getInitialValues } from './utils'

interface PastMedicalHxWidgetProps {
  patientId: string
  initialValue: PastMedicalHxWidgetSchemaType
  isHistoryHeader?: boolean
}

const PastMedicalHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
}: PastMedicalHxWidgetProps) => {
  const form = usePastMedicalHxWidgetForm(initialValue)
  const defaultInitialValues = {
    ...getInitialValues(),
    widgetContainerCheckboxField: form.watch('widgetContainerCheckboxField'),
  }
  return (
    <Flex direction="column" width="100%" gap="2">
      <FormProvider {...form}>
        <WidgetFormContainer
          patientId={patientId}
          tags={
            isHistoryHeader
              ? [QuickNoteSectionName.QuickNoteSectionPastMedicalHx]
              : []
          }
          widgetId={QuickNoteSectionName.QuickNoteSectionPastMedicalHx}
          widgetContainerCheckboxFieldInitialValue={
            initialValue.widgetContainerCheckboxField
          }
          title={!isHistoryHeader ? 'Past Medical History' : undefined}
          getData={transformOut(patientId)}
          toggleable={!isHistoryHeader}
          headerRight={
            <>
              <WidgetClearButton defaultInitialValues={defaultInitialValues} />
              {!isHistoryHeader && <WidgetSaveButton />}
            </>
          }
          formResetValues={defaultInitialValues}
          topHeader={isHistoryHeader && <PastMedicalHeader />}
        >
          {form.watch('widgetContainerCheckboxField') === 'show' && (
            <>
              <ConditionsBlock />
            </>
          )}
        </WidgetFormContainer>
      </FormProvider>
    </Flex>
  )
}

export { PastMedicalHxWidget }
