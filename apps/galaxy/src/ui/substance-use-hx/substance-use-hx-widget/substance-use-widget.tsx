'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { shouldDisableDiagnosisActions } from '@/ui/diagnosis/diagnosis/utils'
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
  diagnosisData?: QuickNoteSectionItem[]
  isHistoryHeader?: boolean
}

const SubstanceUseHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
  diagnosisData,
}: SocialHxWidgetProps) => {
  const { initializeQuestionnaires } = useStore((state) => ({
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id') as string
  const visitType = searchParams.get('visitType') ?? ''
  const visitSequence = searchParams.get('visitSequence') ?? ''
  const isHospitalDischargeView = useMemo(
    () => shouldDisableDiagnosisActions(visitType, visitSequence),
    [visitType, visitSequence],
  )
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

  const isShow =
    form.watch('widgetContainerCheckboxField') === 'show' || isHistoryHeader

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
        getData={transformOut(
          patientId,
          appointmentId,
          diagnosisData,
          isHospitalDischargeView,
        )}
        toggleable={!isHistoryHeader}
        headerRight={
          <>
            <WidgetClearButton
              defaultInitialValues={defaultInitialValues}
              shouldCheckPermission
            />
            {!isHistoryHeader && <WidgetSaveButton shouldCheckPermission />}
          </>
        }
        formResetValues={defaultInitialValues}
        topHeader={isHistoryHeader && <SubstanceUseHxHxHeader />}
      >
        {isShow && (
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
