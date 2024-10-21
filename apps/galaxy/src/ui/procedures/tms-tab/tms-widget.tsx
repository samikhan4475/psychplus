'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { ProcedureTabs, ProcedureTabsId } from '../constants'
import { DischargePlanView } from './discharge-plan'
import { useTmsWidgetForm } from './tms-widget-form'
import MonitoringView from './monitoring/monitoring-view'

interface TmsTabProps {
  patientId: string
}

const TmsTab = ({ patientId }: TmsTabProps) => {
  const form = useTmsWidgetForm()
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={ProcedureTabsId.TMS_ID}
        title={ProcedureTabs.TMS}
        getData={() => []}
        headerRight={
          <>
            <WidgetHxButton />
            <WidgetSaveButton />
          </>
        }
      >
        <MonitoringView />
        <DischargePlanView />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TmsTab }
