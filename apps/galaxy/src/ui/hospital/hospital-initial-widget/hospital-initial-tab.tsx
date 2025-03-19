'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalHeader } from '../hospital-header'
import {
  DcPlanBlock,
  LiabilitiesBlock,
  NeedForLevelOfCareBlock,
  PrecautionsBlock,
  ShortTermGoalsBlock,
  StrengthsBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { useHospitalInitialWidgetForm } from './hospital-initial-widget-form'
import { createEmptyFormValues } from './utils'

interface HospitalWidgetProps {
  patientId: string
  isHospitalInitialTab: boolean
  hospitalInitialData: QuickNoteSectionItem[]
}

const HospitalInitialTab = ({
  patientId,
  isHospitalInitialTab,
  hospitalInitialData,
}: HospitalWidgetProps) => {
  const initialValue = transformIn(hospitalInitialData)
  const form = useHospitalInitialWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionHospitalInitial}
        getData={transformOut(patientId)}
        tags={
          isHospitalInitialTab
            ? [QuickNoteSectionName.QuickNoteSectionHospitalInitial]
            : []
        }
        title={!isHospitalInitialTab ? 'Hospital Initial' : undefined}
        headerRight={
          <>
            {!isHospitalInitialTab && <WidgetClearButton defaultInitialValues={createEmptyFormValues()} />}
            {!isHospitalInitialTab && <WidgetSaveButton />}
          </>
        }
      >
        {isHospitalInitialTab && <HospitalHeader title="Initial" />}
        <StrengthsBlock />
        <LiabilitiesBlock />
        <NeedForLevelOfCareBlock />
        <ShortTermGoalsBlock />
        <PrecautionsBlock />
        <DcPlanBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HospitalInitialTab }
