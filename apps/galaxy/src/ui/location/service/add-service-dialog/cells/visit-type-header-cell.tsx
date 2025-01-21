'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { ServiceSchemaType } from '../service-form/schema'

const VisitTypeHeaderCell = () => {
  const form = useFormContext<ServiceSchemaType>()
  const selectedVisits = form.watch('serviceVisitTypes') ?? []

  return (
    <Flex align="center" height="100%" gap="1" px="1" py="0.5">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <Text size="1">({selectedVisits?.length ?? '0'})</Text>
      <FormFieldError name="serviceVisitTypes" />
    </Flex>
  )
}

export { VisitTypeHeaderCell }
