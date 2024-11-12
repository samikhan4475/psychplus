'use client'

import { useParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { ProcedureTabs, ProcedureTabsId } from '../constants'
import { AdverseEventQuestionView } from './adverse-event-question'
import { AdverseReactionView } from './adverse-reaction'
import { transformIn, transformOut } from './data'
import { DischargePlan } from './discharge-plan'
import { MonitoringView } from './monitoring'
import { PostTreatmentTransportation } from './post-treatment'
import { DosingSection, PrecautionsAndWarningSection } from './sections'
import { useSpravatoWidgetForm } from './spravato-widget-form'
import { VitalSignsView } from './vital-signs'

interface SpravatoTabProps {
  procedureSpravatoData: QuickNoteSectionItem[]
}

const SpravatoTab = ({ procedureSpravatoData }: SpravatoTabProps) => {
  const { id } = useParams<{ id: string }>()
  const initialValues = transformIn(procedureSpravatoData)
  const form = useSpravatoWidgetForm(initialValues)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={id}
        widgetId={ProcedureTabsId.SPRAVATO_ID}
        title={ProcedureTabs.SPRAVATO}
        getData={transformOut(id)}
        headerRight={
          <>
            <WidgetHxButton />
            <WidgetSaveButton />
          </>
        }
      >
        <DosingSection />
        <PrecautionsAndWarningSection />

        <MonitoringView />
        <VitalSignsView />
        <AdverseReactionView />
        <AdverseEventQuestionView />
        <DischargePlan />
        <PostTreatmentTransportation />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SpravatoTab }
