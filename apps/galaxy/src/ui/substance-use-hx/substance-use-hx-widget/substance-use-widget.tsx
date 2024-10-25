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
import { transformOut } from './data'
import { SubstanceUseHxWidgetSchemaType } from './substance-use-hx-schema'

interface SocialHxWidgetProps {
  patientId: string
  initialValue: SubstanceUseHxWidgetSchemaType
}

const SubstanceUseHxWidget = ({ patientId, initialValue }: SocialHxWidgetProps) => {
  const form = useSubstanceHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="substance-use-hx"
        title="Substance Use Hx"
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
        <TobaccoBlock />
        <AlcoholDrugsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxWidget }
