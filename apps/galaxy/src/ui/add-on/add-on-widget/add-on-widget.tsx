'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
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

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.Addon}
        title="Add On"
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetHxButton />
            <WidgetSaveButton />
          </>
        }
      >
        <Flex direction="column" gap="2">
          <InjectionBlock />
          <TherapyPsychoAnalysisBlock />
          {form.watch('therapyPsychoanalysis') !== 'neither' && (
            <InteractiveComplexityBlock />
          )}
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { AddOnWidget }
