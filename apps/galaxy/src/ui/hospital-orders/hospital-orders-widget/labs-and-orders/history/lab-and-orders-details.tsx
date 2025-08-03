'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { FormProvider, useForm } from 'react-hook-form'
import { TextAreaInput } from '@/components'
import { transformIn } from '../../data'
import { HospitalWidgetSchema, HospitalWidgetSchemaType } from '../schema'
import { useStore } from './store'

const LabAndOrdersDetails = () => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))

  const result = transformIn(selectedRow?.data ?? [])
  const form = useForm<HospitalWidgetSchemaType>({
    resolver: zodResolver(HospitalWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: result,
  })

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
      <Flex className="w-full" direction="column" gap="2">
        <Text className="text-[16px] font-[600] text-accent-12">
          Lab & Orders
        </Text>
        <TextAreaInput
          field="HospitalLabsOrders"
          className="h-36 w-full"
          disabled
        />
      </Flex>
    </FormProvider>
  )
}

export { LabAndOrdersDetails }
