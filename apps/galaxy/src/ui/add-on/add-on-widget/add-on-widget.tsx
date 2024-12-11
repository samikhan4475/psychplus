'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useAddOnWidgetForm } from './add-on-widget-form'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import {
  InjectionBlock,
  InteractiveComplexityBlock,
  TherapyPsychoAnalysisBlock,
} from './blocks'
import { transformOut } from './data'

interface AddOnWidgetProps {
  patientId: string
  initialValue: AddOnWidgetSchemaType
}

const AddOnWidget = ({ patientId, initialValue }: AddOnWidgetProps) => {
  const form = useAddOnWidgetForm(initialValue)
  const appointmentId = useSearchParams().get('id') as string

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.Addon}
        title="Add On"
        getData={transformOut(patientId, appointmentId)}
        headerRight={
          <>
            <WidgetSaveButton />
          </>
        }
      >
        <Flex direction="column" gap="2">
          <InjectionBlock />
          <TherapyPsychoAnalysisBlock />
          <InteractiveComplexityBlock />
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { AddOnWidget }
