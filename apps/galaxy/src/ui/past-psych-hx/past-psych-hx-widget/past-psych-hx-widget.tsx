'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  ConditionsBlock,
  PsychHospitalizationsBlock,
  SuicideAttemptsBlock,
} from './blocks'
import { transformOut } from './data'
import { PastPsychHeader } from './past-psych-header'
import { usePastPsychHxWidgetForm } from './past-psych-hx-widget-form'
import { PastPsychHxWidgetSchemaType } from './past-psych-hx-widget-schema'
import { getInitialValues } from './utils'

interface PastPsychHxWidgetProps {
  patientId: string
  initialValue: PastPsychHxWidgetSchemaType
  isHistoryHeader?: boolean
}

const PastPsychHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
}: PastPsychHxWidgetProps) => {
  const form = usePastPsychHxWidgetForm(initialValue)

  const { watch } = form

  const defaultInitialValues = {
    ...getInitialValues(),
    widgetContainerCheckboxField: watch('widgetContainerCheckboxField'),
  }
  const isShow =
    watch('widgetContainerCheckboxField') === 'show' || isHistoryHeader

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionPastPsychHx}
        tags={
          isHistoryHeader
            ? [QuickNoteSectionName.QuickNoteSectionPastPsychHx]
            : []
        }
        title={!isHistoryHeader ? 'Past Psych History' : undefined}
        widgetContainerCheckboxFieldInitialValue={
          initialValue.widgetContainerCheckboxField
        }
        getData={transformOut(patientId)}
        toggleable={!isHistoryHeader}
        headerRight={
          !isHistoryHeader ? (
            <>
              <WidgetClearButton defaultInitialValues={defaultInitialValues} />
              <WidgetSaveButton />
            </>
          ) : (
            <WidgetClearButton defaultInitialValues={defaultInitialValues} />
          )
        }
        formResetValues={defaultInitialValues}
        topHeader={isHistoryHeader && <PastPsychHeader />}
      >
        {isShow && (
          <>
            <Flex align="center" gap="2">
              <PsychHospitalizationsBlock />
              <SuicideAttemptsBlock />
            </Flex>
            <ConditionsBlock />
          </>
        )}
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PastPsychHxWidget }
