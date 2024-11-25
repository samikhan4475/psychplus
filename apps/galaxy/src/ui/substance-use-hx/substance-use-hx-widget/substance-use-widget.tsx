'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
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
  const form = useSubstanceHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      {isHistoryHeader && (
        <SubstanceUseHxHxHeader
          patientId={patientId}
          getData={transformOut(patientId)}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId="substance-use-hx"
        title={!isHistoryHeader ? 'Substance Use History' : undefined}
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
        <TobaccoBlock />
        <AlcoholDrugsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxWidget }
