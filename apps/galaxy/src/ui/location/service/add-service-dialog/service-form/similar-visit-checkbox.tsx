'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'
import { ServiceSchemaType } from './schema'

const SimilarVisitCheck = () => {
  const form = useFormContext<ServiceSchemaType>()
  const isRequiresMedicalVisit = form.watch('isRequiresMedicalVisit')
  return (
    <Text as="label" size="1" className="text-pp-black-3 font-medium">
      <Flex gap="1" align="center">
        <CheckboxInput
          field="isRequiresMedicalVisit"
          checked={isRequiresMedicalVisit}
          size="1"
          highContrast
        />
        Create similar visit for medical provider
      </Flex>
    </Text>
  )
}

export { SimilarVisitCheck }
