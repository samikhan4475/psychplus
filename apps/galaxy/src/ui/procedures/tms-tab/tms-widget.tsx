'use client'

import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment, QuickNoteHistory, QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ProcedureTabs } from '../constants'
import { transformIn, transformOut } from './data'
import { DischargePlanView } from './discharge-plan'
import MonitoringView from './monitoring/monitoring-view'
import { useTmsWidgetForm } from './tms-widget-form'
import { TreatmentSessionView } from './treatment-session'
import { getTMSSessionNumber } from './utils'

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
  const tmsSessionNo = getTMSSessionNumber(appointmentData)
  const initialValue = transformIn([
    ...procedureTmsData,
    {
      sectionItem: 'tmdSessionNo',
      sectionItemValue: `${tmsSessionNo}`,
    } as QuickNoteSectionItem,
  ])
  const form = useTmsWidgetForm(initialValue)
  const { initializeQuestionnaires } = useStore((state) => ({
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))

  useEffect(() => {
    initializeQuestionnaires(patientId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.ProcedureTMS}
        tags={[QuickNoteSectionName.ProcedureTMS]}
        title={ProcedureTabs.TMS}
        getData={transformOut(patientId)}
        headerRight={<WidgetSaveButton />}
      >
        <TreatmentSessionView questionnaireHistories={questionnaireHistories} />
        <MonitoringView />
        <DischargePlanView />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TmsTab }
