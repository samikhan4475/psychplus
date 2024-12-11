'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  EducationBlock,
  EmployedBlock,
  LegalHistoryBlock,
  LivingBlock,
  RelationshipStatusBlock,
  TraumaHxBlock,
} from './blocks'
import { OtherBlock } from './blocks/other-block'
import { transformOut } from './data'
import { SocialHxHeader } from './social-hx-header'
import { useSocialHxWidgetForm } from './social-hx-widget-form'
import { SocialHxWidgetSchemaType } from './social-hx-widget-schema'
import { getInitialValues } from './utils'

interface SocialHxWidgetProps {
  patientId: string
  initialValue: SocialHxWidgetSchemaType
  isHistoryHeader?: boolean
}

const SocialHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
}: SocialHxWidgetProps) => {
  const form = useSocialHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      {isHistoryHeader && <SocialHxHeader />}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionSocialHx}
        title={!isHistoryHeader ? 'Social History' : undefined}
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
      >
        <RelationshipStatusBlock />
        <EducationBlock />
        <EmployedBlock />
        <LegalHistoryBlock />
        <LivingBlock />
        <TraumaHxBlock />
        <OtherBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SocialHxWidget }
