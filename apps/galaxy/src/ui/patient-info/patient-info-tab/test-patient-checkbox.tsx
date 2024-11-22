'use client'

import { Checkbox, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'

const TestPatientCheckbox = () => {
  const { watch, setValue } = useFormContext()

  const isTestPatient = watch('isTest')

  const handleCheckboxChange = (checked: boolean) => {
    setValue('isTest', checked)
  }

  return (
    <Flex align="center" gap="2">
      <Checkbox
        checked={isTestPatient}
        onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
        highContrast
        className="cursor-pointer"
      />
      <FormFieldLabel className="text-pp-black-3 !text-1">
        Test Patient
      </FormFieldLabel>
    </Flex>
  )
}

export { TestPatientCheckbox }
