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
import { useSubstanceHxWidgetForm } from './substance-use-hx-form'

interface SocialHxWidgetProps {
  patientId: string
}

const SubstanceUseHxWidget = ({ patientId }: SocialHxWidgetProps) => {
  const form = useSubstanceHxWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="substance-use-hx"
        title="Substance Use Hx"
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
        <TobaccoBlock />
        <AlcoholDrugsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxWidget }
