'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { ProcedureTabs, ProcedureTabsId } from '../constants'
import { transformIn, transformOut } from './data'
import { DischargePlanView } from './discharge-plan'
import MonitoringView from './monitoring/monitoring-view'
import { useTmsWidgetForm } from './tms-widget-form'
import { TreatmentSessionView } from './treatment-session'

interface TmsTabProps {
  patientId: string
  procedureTmsData: QuickNoteSectionItem[]
}

const TmsTab = ({ patientId, procedureTmsData }: TmsTabProps) => {
  const initialValue = transformIn(procedureTmsData)
  const form = useTmsWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={ProcedureTabsId.TMS_ID}
        title={ProcedureTabs.TMS}
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetHxButton />
            <WidgetSaveButton />
          </>
        }
      >
        <TreatmentSessionView />
        <MonitoringView />
        <DischargePlanView />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TmsTab }
