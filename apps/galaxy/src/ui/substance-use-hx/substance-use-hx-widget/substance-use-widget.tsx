'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AlcoholDrugsBlock, TobaccoBlock } from './blocks'
import { transformOut } from './data'
import { useSubstanceHxWidgetForm } from './substance-use-hx-form'
import { SubstanceUseHxHxHeader } from './substance-use-hx-header'
import { SubstanceUseHxWidgetSchemaType } from './substance-use-hx-schema'

interface SocialHxWidgetProps {
  patientId: string
  initialValue: SubstanceUseHxWidgetSchemaType
  isHistoryHeader?: boolean
}

const SubstanceUseHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
}: SocialHxWidgetProps) => {
  const appointmentId = useSearchParams().get('id') as string
  const form = useSubstanceHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      {isHistoryHeader && <SubstanceUseHxHxHeader />}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionCodes}
        title={!isHistoryHeader ? 'Substance Use History' : undefined}
        getData={transformOut(patientId, appointmentId)}
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
        <TobaccoBlock />
        <AlcoholDrugsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxWidget }
