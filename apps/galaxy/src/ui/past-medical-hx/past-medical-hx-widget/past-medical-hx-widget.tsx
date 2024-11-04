'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ConditionsBlock } from './blocks'
import { transformOut } from './data'
import { usePastMedicalHxWidgetForm } from './past-medical-hx-widget-form'
import { PastMedicalHxWidgetSchemaType } from './past-medical-hx-widget-schema'

interface PastMedicalHxWidgetProps {
  patientId: string
  initialValue: PastMedicalHxWidgetSchemaType
}

const PastMedicalHxWidget = ({
  patientId,
  initialValue,
}: PastMedicalHxWidgetProps) => {
  const form = usePastMedicalHxWidgetForm(initialValue)

  return (
    <Flex direction="column" width="100%">
      <FormProvider {...form}>
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionPastMedicalHx}
          title="Past Medical Hx"
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
        </WidgetFormContainer>
      </FormProvider>
    </Flex>
  )
}

export { PastMedicalHxWidget }
