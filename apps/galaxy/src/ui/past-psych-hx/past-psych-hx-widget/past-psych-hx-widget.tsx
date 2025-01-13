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
        getData={transformOut(patientId)}
        toggleable={!isHistoryHeader}
        headerRight={
          !isHistoryHeader ? (
            <>
              <WidgetClearButton defaultInitialValues={getInitialValues} />
              <WidgetSaveButton />
            </>
          ) : (
            <>
              <WidgetClearButton defaultInitialValues={getInitialValues} />
            </>
          )
        }
        topHeader={isHistoryHeader && <PastPsychHeader />}
      >
        {form.watch('widgetContainerCheckboxField') === "show" && (
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
