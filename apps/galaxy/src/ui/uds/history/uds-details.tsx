'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  ConfirmatoryTestingBlock,
  InterpretationBlock,
  MedicalNecessityBlock,
  PurposeOfVisit,
} from '../uds-widget/blocks'
import { transformIn } from '../uds-widget/data'
import { useUdsWidgetForm } from '../uds-widget/uds-widget-form'
import { useStore } from './store'

interface UdsDetailsProps {
  patientId: string
}
const UdsDetails = ({ patientId }: UdsDetailsProps) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))

  const initialValue = transformIn(selectedRow?.data ?? [], false, true)

  const form = useUdsWidgetForm(initialValue)

  useEffect(() => {
    form.reset(initialValue)
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
      <Flex direction="column" gapY="3">
        <PurposeOfVisit editable={false} />
        <MedicalNecessityBlock editable={false} />
        <ConfirmatoryTestingBlock editable={false} />
        <InterpretationBlock editable={false} />
      </Flex>
    </FormProvider>
  )
}

export { UdsDetails }
