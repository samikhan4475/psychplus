'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  DcPlanBlock,
  LiabilitiesBlock,
  NeedForLevelOfCareBlock,
  PrecautionsBlock,
  ShortTermGoalsBlock,
  StrengthsBlock,
} from '../blocks'
import { transformIn, transformOut } from '../data'
import { useHospitalInitialWidgetForm } from '../hospital-initial-widget-form'
import { useStore } from './store'

interface HospitalInitialDetailsProps {
  patientId: string
}
const HospitalInitialDetails = ({ patientId }: HospitalInitialDetailsProps) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))

  const result = transformIn(selectedRow?.data ?? [])

  const form = useHospitalInitialWidgetForm(result)

  useEffect(() => {
    form.reset(result)
  }, [selectedRow])

  if (!selectedRow) {
    return (
      <Flex className="h-full w-full" justify="center" align="center">
        <Text size="2" weight="bold">
          No row selected
        </Text>
      </Flex>
    )
  }

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuickNoteSectionHospitalInitial}
        getData={transformOut(patientId)}
        title="Hospital Initial"
      >
        <StrengthsBlock editable={false} />
        <LiabilitiesBlock editable={false} />
        <NeedForLevelOfCareBlock editable={false} />
        <ShortTermGoalsBlock editable={false} />
        <PrecautionsBlock editable={false} />
        <DcPlanBlock editable={false} />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HospitalInitialDetails }
