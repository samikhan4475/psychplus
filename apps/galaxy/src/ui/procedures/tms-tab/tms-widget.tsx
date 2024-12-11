'use client'

import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteHistory, QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
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
}

const TmsTab = ({
  patientId,
  procedureTmsData,
  questionnaireHistories,
}: TmsTabProps) => {
  const initialValue = transformIn(procedureTmsData)
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
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TmsTab }
