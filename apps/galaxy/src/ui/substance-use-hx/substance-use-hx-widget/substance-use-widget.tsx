'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { useStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AlcoholDrugsBlock, TobaccoBlock } from './blocks'
import { transformOut } from './data'
import { useSubstanceHxWidgetForm } from './substance-use-hx-form'
import { SubstanceUseHxHxHeader } from './substance-use-hx-header'
import { SubstanceUseHxWidgetSchemaType } from './substance-use-hx-schema'
import { getInitialValues } from './utils'

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
  const { initializeQuestionnaires } = useStore((state) => ({
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))

  const appointmentId = useSearchParams().get('id') as string
  const form = useSubstanceHxWidgetForm(initialValue)

  useEffect(() => {
    if (isHistoryHeader) {
      initializeQuestionnaires(patientId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const defaultInitialValues = {
    ...getInitialValues(),
    widgetContainerCheckboxField: form.watch('widgetContainerCheckboxField'),
  }

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionSubstanceUseHx}
        title={!isHistoryHeader ? 'Substance Use History' : undefined}
        widgetContainerCheckboxFieldInitialValue={
          initialValue.widgetContainerCheckboxField
        }
        tags={
          isHistoryHeader
            ? [QuickNoteSectionName.QuickNoteSectionSubstanceUseHx]
            : []
        }
        getData={transformOut(patientId, appointmentId)}
        toggleable={!isHistoryHeader}
        headerRight={
          <>
            <WidgetClearButton defaultInitialValues={defaultInitialValues} />
            {!isHistoryHeader && <WidgetSaveButton />}
          </>
        }
        formResetValues={defaultInitialValues}
        topHeader={isHistoryHeader && <SubstanceUseHxHxHeader />}
      >
        {form.watch('widgetContainerCheckboxField') === 'show' && (
          <>
            <TobaccoBlock />
            <AlcoholDrugsBlock />
          </>
        )}
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxWidget }
