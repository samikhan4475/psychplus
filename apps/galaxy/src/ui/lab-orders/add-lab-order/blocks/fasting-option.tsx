import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, YesNoSelect } from '@/components'
import { LabOrderSchemaType } from '../lab-order-schema'

const FastingOption = () => {
  const form = useFormContext<LabOrderSchemaType>()

  const labTests = form.watch('testLabs')

  useEffect(() => {
    if (labTests?.length > 0) {
      const isFastingTestAdded = labTests?.some(
        (labTest) =>
          labTest?.labTestCode === '496' || labTest?.labTestCode === '7600',
      )
      form.setValue('isFasting', isFastingTestAdded ? 'yes' : 'no')
    }
  }, [labTests])

  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>Fasting</BlockLabel>
      <YesNoSelect
        field="isFasting"
        className="h-7 rounded-1 border border-gray-7"
        disabled
      />
      <FormFieldError name="isFasting" />
    </Flex>
  )
}

export { FastingOption }
