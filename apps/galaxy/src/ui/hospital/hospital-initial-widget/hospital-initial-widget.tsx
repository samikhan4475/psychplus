'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  DcPlanBlock,
  LiabilitiesBlock,
  NeedForLevelOfCareBlock,
  PrecautionsBlock,
  ShortTermGoalsBlock,
  StrengthsBlock,
} from './blocks'
import { transformOut } from './data'
import { HistoryButton } from './history'
import { HospitalHeader } from './hospital-initial-header'
import { useHospitalInitialWidgetForm } from './hospital-initial-widget-form'
import { HospitalInitialWidgetSchemaType } from './hospital-initial-widget-schema'

interface HospitalWidgetProps {
  patientId: string
  initialValue: HospitalInitialWidgetSchemaType
  isHospitalInitialTab: boolean
}

const HospitalInitialWidget = ({
  patientId,
  initialValue,
  isHospitalInitialTab,
}: HospitalWidgetProps) => {
  const form = useHospitalInitialWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionHospitalInitial}
        getData={transformOut(patientId)}
        title={!isHospitalInitialTab ? 'Hospital Initial' : undefined}
        headerRight={
          <>
            {!isHospitalInitialTab && (
              // <HistoryButton
              //   patientId={patientId}
              //   sectionName={
              //     QuickNoteSectionName.QuickNoteSectionHospitalInitial
              //   }
              // />
              <WidgetHxButton />
            )}
            {!isHospitalInitialTab && <WidgetClearButton />}
            {!isHospitalInitialTab && <WidgetSaveButton />}
          </>
        }
      >
        {isHospitalInitialTab && (
          <HospitalHeader
            title="Initial"
            patientId={patientId}
            sectionName={QuickNoteSectionName.QuickNoteSectionHospitalInitial}
          />
        )}

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

export { HospitalInitialWidget }
