'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalHeader } from '../hospital-header'
import { AntiPsychoticBlock } from './blocks/anti-psychotic-block'
import { DischargeTypeBlock } from './blocks/discharge-block'
import { DischargeTimeSpentBlock } from './blocks/discharge-spent-time-block'
import { DispositionBlock } from './blocks/disposition-block'
import { FollowUpBlock } from './blocks/follow-up-block'
import { HospitalCourseBlock } from './blocks/hospital-course-block'
import { LiabilitiesBlock } from './blocks/liabilities-block'
import { StrengthsBlock } from './blocks/strengths-block'
import { transformIn, transformOut } from './data'
import FunctionalStatusView from './functional-status-view/function-status-view'
import { useHospitalDischargeWidgetForm } from './hospital-discharge-widget-form'

interface HospitalDischargeWidget {
  patientId: string
  isHospitalDischargeTab: boolean
  hospitalDischargeData: QuickNoteSectionItem[]
}

const HospitalDischargeTab = ({
  patientId,
  isHospitalDischargeTab,
  hospitalDischargeData,
}: HospitalDischargeWidget) => {
  const initialValue = transformIn(hospitalDischargeData)
  const form = useHospitalDischargeWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionHospitalDischarge}
        tags={
          isHospitalDischargeTab
            ? [QuickNoteSectionName.QuicknoteSectionHospitalDischarge]
            : []
        }
        getData={transformOut(patientId)}
        title={!isHospitalDischargeTab ? 'Hospital Discharge' : undefined}
        headerRight={<>{!isHospitalDischargeTab && <WidgetSaveButton />}</>}
      >
        {isHospitalDischargeTab && <HospitalHeader title="Discharge" />}
        <AntiPsychoticBlock />
        <StrengthsBlock />
        <LiabilitiesBlock />
        <HospitalCourseBlock />
        <FunctionalStatusView />
        <DischargeTypeBlock />
        <DispositionBlock />
        <FollowUpBlock />
        <DischargeTimeSpentBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HospitalDischargeTab }
