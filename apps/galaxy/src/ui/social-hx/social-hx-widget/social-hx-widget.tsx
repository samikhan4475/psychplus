'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import {
  EducationBlock,
  EmployedBlock,
  LegalHistoryBlock,
  LivingBlock,
  RelationshipStatusBlock,
  TraumaHxBlock,
} from './blocks'
import { useSocialHxWidgetForm } from './social-hx-widget-form'

interface SocialHxWidgetProps {
  patientId: string
}

const SocialHxWidget = ({ patientId }: SocialHxWidgetProps) => {
  const form = useSocialHxWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="social-hx"
        title="Social Hx"
        getData={() => []}
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
        <RelationshipStatusBlock />
        <EducationBlock />
        <EmployedBlock />
        <LegalHistoryBlock />
        <LivingBlock />
        <TraumaHxBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SocialHxWidget }
