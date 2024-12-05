'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { getPatientProfileAction } from '@/actions'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { PatientProfile, QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
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
  responseData: QuickNoteSectionItem[]
}

const SubstanceUseHxWidget = ({
  patientId,
  initialValue,
  isHistoryHeader = false,
  responseData,
}: SocialHxWidgetProps) => {
  const { initializeQuestionnaires } = useStore((state) => ({
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))
  const appointmentId = useSearchParams().get('id') as string
  const form = useSubstanceHxWidgetForm(initialValue)
  const [patientInfo, setPatientInfo] = useState<PatientProfile | null>(null)
  useEffect(() => {
    const fetchPatientProfile = async () => {
      const patientResponse = await getPatientProfileAction(patientId)
      if (patientResponse.state === 'error') {
        return
      }
      setPatientInfo(patientResponse.data)
    }
    initializeQuestionnaires(patientId)

    fetchPatientProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...form}>
      {isHistoryHeader && <SubstanceUseHxHxHeader />}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionSubstanceUseHx}
        title={!isHistoryHeader ? 'Substance Use History' : undefined}
        getData={transformOut(patientId, appointmentId, responseData)}
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
        {patientInfo && <AlcoholDrugsBlock patientInfo={patientInfo} />}
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SubstanceUseHxWidget }
