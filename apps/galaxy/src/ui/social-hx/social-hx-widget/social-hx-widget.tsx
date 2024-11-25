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
        title={!isHistoryHeader ? 'Social Hx' : undefined}
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
