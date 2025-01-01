'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment, QuickNoteHistory, QuickNoteSectionItem } from '@/types'
import { Diagnosis } from '@/ui/diagnosis/diagnosis'
import { useStore } from '@/ui/questionnaires/store'
import { useStore as useDiagnosisStore } from '../../diagnosis/store'
import { ProcedureTabs, ProcedureTabsId } from '../constants'
import { transformIn, transformOut } from './data'
import { DischargePlanView } from './discharge-plan'
import MonitoringView from './monitoring/monitoring-view'
import { useTmsWidgetForm } from './tms-widget-form'
import { TreatmentSessionView } from './treatment-session'

interface TmsTabProps {
  patientId: string
  procedureTmsData: QuickNoteSectionItem[]
  questionnaireHistories: QuickNoteHistory[]
  appointmentData: Appointment | null
}

const TmsTab = ({
  patientId,
  procedureTmsData,
  questionnaireHistories,
  appointmentData,
}: TmsTabProps) => {
  const initialValue = transformIn([
    ...procedureTmsData,
    {
      sectionItem: 'tmdSessionNo',
      sectionItemValue: appointmentData?.encounterNumber?.split('-')[1] || '',
    } as QuickNoteSectionItem,
  ])
  const form = useTmsWidgetForm(initialValue)
  const { initializeQuestionnaires } = useStore((state) => ({
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))

  const { fetchWorkingDiagnosis, fetchFavouriteDiagnosis } = useDiagnosisStore()

  useEffect(() => {
    fetchWorkingDiagnosis(patientId)
    fetchFavouriteDiagnosis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])

  useEffect(() => {
    initializeQuestionnaires(patientId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={ProcedureTabsId.TMS_ID}
        title={ProcedureTabs.TMS}
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetSaveButton />
          </>
        }
      >
        <TreatmentSessionView questionnaireHistories={questionnaireHistories} />
        <MonitoringView />
        <DischargePlanView />
        <Flex className="mt-2" direction={'column'}>
          <Diagnosis />
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TmsTab }
