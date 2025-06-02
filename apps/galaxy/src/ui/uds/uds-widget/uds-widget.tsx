'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { genericEventBus } from '@/lib/generic-event-bus'
import { LabOrderResponseList, QuickNoteSectionItem } from '@/types'
import { shouldDisableDiagnosisActions } from '@/ui/diagnosis/diagnosis/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  ConfirmatoryTestingBlock,
  InterpretationBlock,
  MedicalNecessityBlock,
  PurposeOfVisit,
} from './blocks'
import { transformIn, transformOut } from './data'
import { createEmptyFormValues } from './uds-defaults'
import { UdsHeader } from './uds-header'
import { useUdsWidgetForm } from './uds-widget-form'
import { containsUrineTest } from './utils'

interface UdsWidgetProps {
  patientId: string
  data?: QuickNoteSectionItem[]
  diagnosisData?: QuickNoteSectionItem[]
  isUdsTab?: boolean
  labOrdersData?: LabOrderResponseList
}

const UdsWidget = ({
  patientId,
  data,
  isUdsTab = false,
  diagnosisData,
  labOrdersData,
}: UdsWidgetProps) => {
  const isContainsUrineTest = containsUrineTest(labOrdersData)
  const initialValue = transformIn(data, isContainsUrineTest, isUdsTab)
  const form = useUdsWidgetForm(initialValue)
  const searchParams = useSearchParams()
  const visitType = searchParams.get('visitType') ?? ''
  const visitSequence = searchParams.get('visitSequence') ?? ''

  const appointmentId = searchParams.get('id') ?? '0'
  const handleFormSuccess = () => {
    if (!isUdsTab) {
      genericEventBus.emit(`${appointmentId}`, {
        type: 'lab-order',
        message: 'Lab order saved',
        timestamp: new Date().toISOString(),
      })
    }
  }

  const isHospitalDischargeView = useMemo(
    () => shouldDisableDiagnosisActions(visitType, visitSequence),
    [visitType, visitSequence],
  )

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        title={!isUdsTab ? 'Urine Drug Screen' : undefined}
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionUds}
        getData={transformOut(
          patientId,
          appointmentId,
          diagnosisData,
          isHospitalDischargeView,
          isUdsTab,
        )}
        topHeader={isUdsTab && <UdsHeader />}
        headerRight={!isUdsTab && <WidgetSaveButton />}
        tags={isUdsTab ? [QuickNoteSectionName.QuicknoteSectionUds] : []}
        formResetValues={createEmptyFormValues()}
        onSuccess={handleFormSuccess}
      >
        <Flex direction="column" gapY="3">
          <PurposeOfVisit />
          <MedicalNecessityBlock />
          <ConfirmatoryTestingBlock />
          <InterpretationBlock />
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { UdsWidget }
