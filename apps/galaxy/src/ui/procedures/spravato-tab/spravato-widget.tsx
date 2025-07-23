'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ProcedureTabs } from '../constants'
import { AdverseEventQuestionView } from './adverse-event-question'
import { AdverseReactionView } from './adverse-reaction'
import { transformIn, transformOut } from './data'
import { DischargePlan } from './discharge-plan'
import { MonitoringView } from './monitoring'
import { PostTreatmentTransportation } from './post-treatment'
import { ProcurementMethod } from './procurement-method'
import { DosingSection, PrecautionsAndWarningSection } from './sections'
import { useSpravatoWidgetForm } from './spravato-widget-form'
import { VitalSignsView } from './vital-signs'

interface SpravatoTabProps {
  procedureSpravatoData: QuickNoteSectionItem[]
  appointmentData: Appointment | null
}

const SpravatoWidget = ({
  procedureSpravatoData,
  appointmentData,
}: SpravatoTabProps) => {
  const { id } = useParams<{ id: string }>()
  const initialValues = transformIn([
    ...procedureSpravatoData,
    {
      sectionItem: 'treatmentNumber',
      sectionItemValue: appointmentData?.encounterNumber?.split('-')[1] || '',
    } as QuickNoteSectionItem,
  ])
  const form = useSpravatoWidgetForm(initialValues)
  const appointmentId = useSearchParams().get('id') as string

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={id}
        widgetId={QuickNoteSectionName.QuicknoteSectionProcedureSpravato}
        tags={[QuickNoteSectionName.QuicknoteSectionProcedureSpravato]}
        title={ProcedureTabs.SPRAVATO}
        getData={transformOut(id, appointmentId, appointmentData)}
        headerRight={<WidgetSaveButton variant="filled" />}
      >
        <DosingSection />
        <PrecautionsAndWarningSection />

        <MonitoringView appointmentData={appointmentData} />
        <VitalSignsView />
        <AdverseReactionView />
        <AdverseEventQuestionView />
        <DischargePlan />
        <PostTreatmentTransportation />
        <ProcurementMethod />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SpravatoWidget }
